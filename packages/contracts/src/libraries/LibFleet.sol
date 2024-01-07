// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { ESendType, Arrival, ERock, EResource } from "src/Types.sol";
import { FleetStatusData, FleetStatus, Spawned, GracePeriod, PirateAsteroid, DefeatedPirate, UnitCount, ReversePosition, RockType, PositionData, P_Unit, UnitLevel, P_GameConfig, P_GameConfigData, ArrivalCount, ResourceCount, OwnedBy, P_UnitPrototypes } from "codegen/index.sol";
import { ArrivalsMap } from "libraries/ArrivalsMap.sol";
import { LibMath } from "libraries/LibMath.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { LibUnit } from "libraries/LibUnit.sol";
import { LibStorage } from "libraries/LibStorage.sol";
import { FleetsMap } from "libraries/FleetsMap.sol";
import { SendArgs } from "src/Types.sol";
import { FleetKey, FleetOwnedByKey, FleetIncomingKey } from "src/Keys.sol";
import { WORLD_SPEED_SCALE, NUM_UNITS, UNIT_SPEED_SCALE, NUM_RESOURCE } from "src/constants.sol";
import { EResource } from "src/Types.sol";

library LibFleet {
  /// @notice creates a fleet.
  function createFleet(
    bytes32 playerEntity,
    bytes32 spaceRock,
    uint256[NUM_UNITS] calldata unitCounts,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) internal returns (bytes32 fleetId) {
    require(OwnedBy.get(spaceRock) == playerEntity, "[Fleet] Can only create fleet on owned space rock");
    LibStorage.decreaseStoredResource(spaceRock, uint8(EResource.U_MaxMoves), 1);
    //require(ResourceCount.get(spaceRock, EResource.U_Cargo) > 0, "[Fleet] Space rock has no cargo capacity"))
    fleetId = LibEncode.getTimedHash(playerEntity, FleetKey);
    OwnedBy.set(fleetId, spaceRock);

    FleetStatus.set(
      fleetId,
      FleetStatusData({
        arrivalTime: block.timestamp,
        sendTime: block.timestamp,
        origin: spaceRock,
        destination: spaceRock,
        resourceStorage: 0,
        occupiedStorage: 0
      })
    );

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();

    for (uint8 i = 0; i < NUM_UNITS; i++) {
      uint256 rockUnitCount = UnitCount.get(spaceRock, unitPrototypes[i]);
      require(rockUnitCount >= unitCounts[i], "[Fleet] Not enough units to add to fleet");
      LibUnit.decreaseUnitCount(spaceRock, unitPrototypes[i], unitCounts[i]);
      increaseFleetUnit(fleetId, unitPrototypes[i], unitCounts[i]);
    }

    for (uint8 i = 0; i < NUM_RESOURCE; i++) {
      uint256 rockResourceCount = ResourceCount.get(spaceRock, i);
      require(rockResourceCount >= resourceCounts[i], "[Fleet] Not enough resources to add to fleet");
      LibStorage.decreaseStoredResource(spaceRock, i, resourceCounts[i]);
      increaseFleetResource(fleetId, i, resourceCounts[i]);
    }

    FleetsMap.add(spaceRock, FleetOwnedByKey, fleetId);
    FleetsMap.add(spaceRock, FleetIncomingKey, fleetId);
  }

  function transferUnitsFromFleetToFleet(
    bytes32 playerEntity,
    bytes32 fromFleetId,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts
  ) internal {
    require(OwnedBy.get(OwnedBy.get(fromFleetId)) == playerEntity, "[Fleet] Can only transfer units from owned fleet");

    bytes32 spaceRock = FleetStatus.getDestination(fromFleetId);
    require(
      FleetStatus.getArrivalTime(fromFleetId) <= block.timestamp,
      "[Fleet] From fleet has not reached space rock yet"
    );

    require(
      FleetStatus.getDestination(fleetId) == spaceRock,
      "[Fleet] To fleet is not on same space rock as from fleet"
    );
    require(FleetStatus.getArrivalTime(fleetId) <= block.timestamp, "[Fleet] to Fleet has not reached space rock yet");

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    bool sameOwner = OwnedBy.get(fleetId) == OwnedBy.get(fromFleetId);
    for (uint8 i = 0; i < NUM_UNITS; i++) {
      increaseFleetUnit(fleetId, unitPrototypes[i], unitCounts[i]);
      decreaseFleetUnit(fromFleetId, unitPrototypes[i], unitCounts[i]);
      if (!sameOwner) {
        LibUnit.updateStoredUtilities(OwnedBy.get(fleetId), unitPrototypes[i], unitCounts[i], true);
        LibUnit.updateStoredUtilities(OwnedBy.get(fromFleetId), unitPrototypes[i], unitCounts[i], false);
      }
    }
  }

  function transferResourcesFromFleetToFleet(
    bytes32 playerEntity,
    bytes32 fromFleetId,
    bytes32 fleetId,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) internal {
    require(OwnedBy.get(OwnedBy.get(fromFleetId)) == playerEntity, "[Fleet] Can only transfer units from owned fleet");

    bytes32 spaceRock = FleetStatus.getDestination(fromFleetId);
    require(
      FleetStatus.getDestination(fleetId) == spaceRock,
      "[Fleet] To fleet is not on same space rock as from fleet"
    );

    require(
      FleetStatus.getArrivalTime(fromFleetId) <= block.timestamp,
      "[Fleet] From fleet has not reached space rock yet"
    );
    require(FleetStatus.getArrivalTime(fleetId) <= block.timestamp, "[Fleet] to Fleet has not reached space rock yet");

    for (uint8 i = 0; i < NUM_RESOURCE; i++) {
      increaseFleetResource(fleetId, i, resourceCounts[i]);
      decreaseFleetResource(fromFleetId, i, resourceCounts[i]);
    }
  }

  function transferUnitsFromSpaceRockToFleet(
    bytes32 playerEntity,
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts
  ) internal {
    require(OwnedBy.get(spaceRock) == playerEntity, "[Fleet] Can only transfer units from owned space rock");
    require(FleetStatus.getDestination(fleetId) == spaceRock, "[Fleet] Fleet is not on space rock");
    require(FleetStatus.getArrivalTime(fleetId) <= block.timestamp, "[Fleet] Fleet has not reached space rock yet");

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    bool isOwner = OwnedBy.get(fleetId) == spaceRock;
    for (uint8 i = 0; i < NUM_UNITS; i++) {
      uint256 rockUnitCount = UnitCount.get(spaceRock, unitPrototypes[i]);
      require(rockUnitCount >= unitCounts[i], "[Fleet] Not enough units on space rock to add to fleet");
      LibUnit.decreaseUnitCount(spaceRock, unitPrototypes[i], unitCounts[i]);
      if (!isOwner) LibUnit.updateStoredUtilities(spaceRock, unitPrototypes[i], unitCounts[i], false);
      increaseFleetUnit(fleetId, unitPrototypes[i], unitCounts[i]);
    }
  }

  function transferUnitsFromFleetToSpaceRock(
    bytes32 playerEntity,
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts
  ) internal {
    require(OwnedBy.get(OwnedBy.get(fleetId)) == playerEntity, "[Fleet] Can only transfer units from owned fleet");
    require(FleetStatus.getDestination(fleetId) == spaceRock, "[Fleet] Fleet is not in space rock orbit");
    require(FleetStatus.getArrivalTime(fleetId) <= block.timestamp, "[Fleet] Fleet has not reached space rock yet");

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    bool isOwner = OwnedBy.get(fleetId) == spaceRock;
    for (uint8 i = 0; i < NUM_UNITS; i++) {
      uint256 fleetUnitCount = UnitCount.get(fleetId, unitPrototypes[i]);
      require(fleetUnitCount >= unitCounts[i], "[Fleet] Not enough units to remove from fleet");
      LibUnit.increaseUnitCount(spaceRock, unitPrototypes[i], unitCounts[i]);
      if (!isOwner) LibUnit.updateStoredUtilities(spaceRock, unitPrototypes[i], unitCounts[i], true);
      decreaseFleetUnit(fleetId, unitPrototypes[i], unitCounts[i]);
    }
  }

  function transferResourcesFromSpaceRockToFleet(
    bytes32 playerEntity,
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) internal {
    require(OwnedBy.get(spaceRock) == playerEntity, "[Fleet] Can only transfer resources from owned space rock");
    require(FleetStatus.getDestination(fleetId) == spaceRock, "[Fleet] Fleet is not on space rock");
    require(FleetStatus.getArrivalTime(fleetId) <= block.timestamp, "[Fleet] Fleet has not reached space rock yet");

    for (uint8 i = 0; i < NUM_RESOURCE; i++) {
      uint256 rockResourceCount = ResourceCount.get(spaceRock, i);
      require(rockResourceCount >= resourceCounts[i], "[Fleet] Not enough resources to add to fleet");
      LibStorage.decreaseStoredResource(spaceRock, i, resourceCounts[i]);
      increaseFleetResource(fleetId, i, resourceCounts[i]);
    }
  }

  function transferResourcesFromFleetToSpaceRock(
    bytes32 playerEntity,
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) internal {
    require(OwnedBy.get(OwnedBy.get(fleetId)) == playerEntity, "[Fleet] Can only transfer resources from owned fleet");
    require(FleetStatus.getDestination(fleetId) == spaceRock, "[Fleet] Fleet is not in space rock orbit");
    require(FleetStatus.getArrivalTime(fleetId) <= block.timestamp, "[Fleet] Fleet has not reached space rock yet");
    for (uint8 i = 0; i < NUM_RESOURCE; i++) {
      uint256 fleetResourceCount = ResourceCount.get(fleetId, i);
      require(fleetResourceCount >= resourceCounts[i], "[Fleet] Not enough resources to add to fleet");
      LibStorage.increaseStoredResource(spaceRock, i, resourceCounts[i]);
      decreaseFleetResource(fleetId, i, resourceCounts[i]);
    }
  }

  //this is required so unit cargo space can be updated correctly without loss of resources
  function transferUnitsAndResourcesFromFleetToSpaceRock(
    bytes32 playerEntity,
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) internal {
    require(OwnedBy.get(OwnedBy.get(fleetId)) == playerEntity, "[Fleet] Can only transfer units from owned fleet");
    require(FleetStatus.getDestination(fleetId) == spaceRock, "[Fleet] Fleet is not in space rock orbit");
    require(FleetStatus.getArrivalTime(fleetId) <= block.timestamp, "[Fleet] Fleet has not reached space rock yet");

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();

    bool isOwner = OwnedBy.get(fleetId) == spaceRock;
    for (uint8 i = 0; i < NUM_UNITS; i++) {
      LibUnit.increaseUnitCount(spaceRock, unitPrototypes[i], unitCounts[i]);
      if (!isOwner) LibUnit.updateStoredUtilities(spaceRock, unitPrototypes[i], unitCounts[i], true);
    }

    transferResourcesFromFleetToSpaceRock(playerEntity, spaceRock, fleetId, resourceCounts);

    for (uint8 i = 0; i < NUM_UNITS; i++) {
      uint256 fleetUnitCount = UnitCount.get(fleetId, unitPrototypes[i]);
      require(fleetUnitCount >= unitCounts[i], "[Fleet] Not enough units to remove from fleet");
      decreaseFleetUnit(fleetId, unitPrototypes[i], unitCounts[i]);
    }
  }

  function transferUnitsAndResourcesFromSpaceRockToFleet(
    bytes32 playerEntity,
    bytes32 spaceRock,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) internal {
    require(OwnedBy.get(spaceRock) == playerEntity, "[Fleet] Can only transfer units from owned space rock");
    require(FleetStatus.getDestination(fleetId) == spaceRock, "[Fleet] Fleet is not on space rock");
    require(FleetStatus.getArrivalTime(fleetId) <= block.timestamp, "[Fleet] Fleet has not reached space rock yet");

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();

    for (uint8 i = 0; i < NUM_UNITS; i++) {
      increaseFleetUnit(fleetId, unitPrototypes[i], unitCounts[i]);
    }

    transferResourcesFromSpaceRockToFleet(playerEntity, spaceRock, fleetId, resourceCounts);
    bool isOwner = OwnedBy.get(fleetId) == spaceRock;
    for (uint8 i = 0; i < NUM_UNITS; i++) {
      LibUnit.decreaseUnitCount(spaceRock, unitPrototypes[i], unitCounts[i]);
      if (!isOwner) LibUnit.updateStoredUtilities(spaceRock, unitPrototypes[i], unitCounts[i], false);
    }
  }

  function transferUnitsAndResourcesFromFleetToFleet(
    bytes32 playerEntity,
    bytes32 fromFleetId,
    bytes32 fleetId,
    uint256[NUM_UNITS] calldata unitCounts,
    uint256[NUM_RESOURCE] calldata resourceCounts
  ) internal {
    require(OwnedBy.get(OwnedBy.get(fromFleetId)) == playerEntity, "[Fleet] Can only transfer units from owned fleet");

    bytes32 spaceRock = FleetStatus.getDestination(fromFleetId);
    require(
      FleetStatus.getArrivalTime(fromFleetId) <= block.timestamp,
      "[Fleet] From fleet has not reached space rock yet"
    );

    require(
      FleetStatus.getDestination(fleetId) == spaceRock,
      "[Fleet] To fleet is not on same space rock as from fleet"
    );
    require(FleetStatus.getArrivalTime(fleetId) <= block.timestamp, "[Fleet] to Fleet has not reached space rock yet");

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    bool sameOwner = OwnedBy.get(fleetId) == OwnedBy.get(fromFleetId);
    for (uint8 i = 0; i < NUM_UNITS; i++) {
      increaseFleetUnit(fleetId, unitPrototypes[i], unitCounts[i]);
      if (!sameOwner) {
        LibUnit.updateStoredUtilities(OwnedBy.get(fleetId), unitPrototypes[i], unitCounts[i], true);
        LibUnit.updateStoredUtilities(OwnedBy.get(fromFleetId), unitPrototypes[i], unitCounts[i], false);
      }
    }

    transferResourcesFromFleetToFleet(playerEntity, fromFleetId, fleetId, resourceCounts);

    for (uint8 i = 0; i < NUM_UNITS; i++) {
      uint256 fleetUnitCount = UnitCount.get(fromFleetId, unitPrototypes[i]);
      decreaseFleetUnit(fromFleetId, unitPrototypes[i], fleetUnitCount);
    }
  }

  function increaseFleetUnit(
    bytes32 fleetId,
    bytes32 unitPrototype,
    uint256 unitCount
  ) internal {
    uint256 fleetUnitCount = UnitCount.get(fleetId, unitPrototype);
    UnitCount.set(fleetId, unitPrototype, fleetUnitCount + unitCount);
    uint256 cargo = P_Unit.get(unitPrototype, UnitLevel.get(OwnedBy.get(OwnedBy.get(fleetId)), unitPrototype)).cargo;
    FleetStatus.setResourceStorage(fleetId, FleetStatus.getResourceStorage(fleetId) + unitCount * cargo);
  }

  function decreaseFleetUnit(
    bytes32 fleetId,
    bytes32 unitPrototype,
    uint256 unitCount
  ) internal {
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();

    uint256 fleetUnitCount = UnitCount.get(fleetId, unitPrototype);
    require(fleetUnitCount >= unitCount, "[Fleet] Not enough units to remove from fleet");
    UnitCount.set(fleetId, unitPrototype, fleetUnitCount - unitCount);
    uint256 cargo = P_Unit.get(unitPrototype, UnitLevel.get(OwnedBy.get(OwnedBy.get(fleetId)), unitPrototype)).cargo;

    FleetStatus.setResourceStorage(fleetId, FleetStatus.getResourceStorage(fleetId) - unitCount * cargo);
    require(
      FleetStatus.getResourceStorage(fleetId) >= FleetStatus.getOccupiedStorage(fleetId),
      "[Fleet] Fleet doesn't have enough storage"
    );
  }

  function increaseFleetResource(
    bytes32 fleetId,
    uint8 resource,
    uint256 amount
  ) internal {
    if (amount == 0) return;
    uint256 currOccupiedStorage = FleetStatus.getOccupiedStorage(fleetId);
    require(
      currOccupiedStorage + amount <= FleetStatus.getResourceStorage(fleetId),
      "[Fleet] Not enough storage to add resource"
    );
    ResourceCount.set(fleetId, resource, ResourceCount.get(fleetId, resource) + amount);
    FleetStatus.setOccupiedStorage(fleetId, currOccupiedStorage + amount);
  }

  function decreaseFleetResource(
    bytes32 fleetId,
    uint8 resource,
    uint256 amount
  ) internal {
    if (amount == 0) return;
    uint256 currOccupiedStorage = FleetStatus.getOccupiedStorage(fleetId);
    uint256 currResourceCount = ResourceCount.get(fleetId, resource);
    require(
      currResourceCount >= amount && currOccupiedStorage >= amount,
      "[Fleet] Not enough stored resource to remove"
    );
    ResourceCount.set(fleetId, resource, currResourceCount - amount);
    FleetStatus.setOccupiedStorage(fleetId, currOccupiedStorage - amount);
  }

  function landFleet(
    bytes32 playerEntity,
    bytes32 fleetId,
    bytes32 spaceRock
  ) internal {
    bytes32 spaceRockOwner = OwnedBy.get(spaceRock);
    require(OwnedBy.get(spaceRockOwner) == playerEntity, "[Fleet] Can only transfer units from owned fleet");
    require(OwnedBy.get(spaceRock) == playerEntity, "[Fleet] Can only land fleet on owned space rock");

    require(FleetStatus.getDestination(fleetId) == spaceRock, "[Fleet] Fleet is not in space rock orbit");
    require(FleetStatus.getArrivalTime(fleetId) <= block.timestamp, "[Fleet] Fleet has not reached space rock yet");

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();

    bool isOwner = spaceRockOwner == spaceRock;
    for (uint8 i = 0; i < NUM_UNITS; i++) {
      uint256 fleetUnitCount = UnitCount.get(fleetId, unitPrototypes[i]);
      LibUnit.increaseUnitCount(spaceRock, unitPrototypes[i], fleetUnitCount);
      if (!isOwner) LibUnit.updateStoredUtilities(spaceRock, unitPrototypes[i], fleetUnitCount, true);
    }

    for (uint8 i = 0; i < NUM_RESOURCE; i++) {
      uint256 fleetResourceCount = ResourceCount.get(fleetId, i);
      LibStorage.increaseStoredResource(spaceRock, i, fleetResourceCount);
      decreaseFleetResource(fleetId, i, fleetResourceCount);
    }

    for (uint8 i = 0; i < NUM_UNITS; i++) {
      uint256 fleetUnitCount = UnitCount.get(fleetId, unitPrototypes[i]);
      decreaseFleetUnit(fleetId, unitPrototypes[i], fleetUnitCount);
    }

    LibStorage.increaseStoredResource(spaceRockOwner, uint8(EResource.U_MaxMoves), 1);
    FleetsMap.remove(spaceRockOwner, FleetOwnedByKey, fleetId);
    FleetsMap.remove(spaceRock, FleetIncomingKey, fleetId);
    OwnedBy.deleteRecord(fleetId);
  }

  function mergeFleets(bytes32[] calldata fleets) internal {
    require(fleets.length > 1, "[Fleet] Can only merge more than one fleet");
    bytes32 spaceRock = FleetStatus.getDestination(fleets[0]);
    require(FleetStatus.getArrivalTime(fleets[0]) <= block.timestamp, "[Fleet] Fleet has not reached space rock yet");

    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[NUM_UNITS] memory unitCounts;

    for (uint256 i = 1; i < fleets.length; i++) {
      require(FleetStatus.getDestination(fleets[i]) == spaceRock, "[Fleet] Fleets must be on same space rock");
      require(FleetStatus.getArrivalTime(fleets[i]) <= block.timestamp, "[Fleet] Fleet has not reached space rock yet");
      for (uint8 j = 0; j < NUM_UNITS; j++) {
        unitCounts[j] += UnitCount.get(fleets[i], unitPrototypes[j]);
      }
    }
    for (uint8 i = 0; i < NUM_UNITS; i++) {
      increaseFleetUnit(fleets[0], unitPrototypes[i], unitCounts[i]);
    }

    for (uint8 i = 0; i < NUM_RESOURCE; i++) {
      uint256 totalResourceCount = 0;
      for (uint256 j = 1; j < fleets.length; j++) {
        uint256 resourceCount = ResourceCount.get(fleets[j], i);
        decreaseFleetResource(fleets[j], i, resourceCount);

        totalResourceCount += resourceCount;
      }
      increaseFleetResource(fleets[0], i, totalResourceCount);
    }

    for (uint8 i = 0; i < NUM_UNITS; i++) {
      for (uint256 j = 1; j < fleets.length; j++) {
        uint256 fleetUnitCount = UnitCount.get(fleets[j], unitPrototypes[i]);
        decreaseFleetUnit(fleets[j], unitPrototypes[i], fleetUnitCount);
      }
    }

    for (uint256 i = 1; i < fleets.length; i++) {
      bytes32 spaceRockOwner = OwnedBy.get(fleets[i]);

      LibStorage.increaseStoredResource(spaceRockOwner, uint8(EResource.U_MaxMoves), 1);
      OwnedBy.deleteRecord(fleets[i]);

      FleetsMap.remove(spaceRockOwner, FleetOwnedByKey, fleets[i]);
      FleetsMap.remove(spaceRock, FleetIncomingKey, fleets[i]);
    }
  }
}
