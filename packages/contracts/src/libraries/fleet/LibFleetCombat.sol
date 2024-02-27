// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { EResource } from "src/Types.sol";

import { P_CapitalShipConfig, CooldownEnds, DefeatedPirate, PirateAsteroid, DestroyedUnit, DamageDealt, BattleEncryptionResult, BattleDamageDealtResult, BattleDamageTakenResult, BattleUnitResult, BattleUnitResultData, P_Transportables, IsFleet, MaxResourceCount, BattleResult, BattleResultData, P_EnumToPrototype, FleetStance, FleetStanceData, Position, FleetMovementData, FleetMovement, Spawned, GracePeriod, PirateAsteroid, DefeatedPirate, UnitCount, ReversePosition, PositionData, P_Unit, P_UnitData, UnitLevel, P_GameConfig, P_GameConfigData, ResourceCount, OwnedBy, P_UnitPrototypes } from "codegen/index.sol";

import { getSystemResourceId } from "src/utils.sol";
import { BuildSystem } from "systems/BuildSystem.sol";
import { MainBasePrototypeId, CapitalShipPrototypeId } from "codegen/Prototypes.sol";
import { SystemCall } from "@latticexyz/world/src/SystemCall.sol";
import { LibMath } from "libraries/LibMath.sol";
import { LibEncode } from "libraries/LibEncode.sol";
import { LibUnit } from "libraries/LibUnit.sol";
import { LibStorage } from "libraries/LibStorage.sol";
import { LibFleet } from "libraries/fleet/LibFleet.sol";
import { FleetsMap } from "libraries/fleet/FleetsMap.sol";
import { LibFleetDisband } from "libraries/fleet/LibFleetDisband.sol";
import { LibCombatAttributes } from "libraries/LibCombatAttributes.sol";
import { LibResource } from "libraries/LibResource.sol";
import { LibFleetStance } from "libraries/fleet/LibFleetStance.sol";
import { LibFleetMove } from "libraries/fleet/LibFleetMove.sol";
import { FleetsMap } from "libraries/fleet/FleetsMap.sol";
import { AsteroidOwnedByKey, FleetKey, FleetOwnedByKey, FleetIncomingKey, FleetStanceKey } from "src/Keys.sol";
import { ColoniesMap } from "libraries/ColoniesMap.sol";
import { WORLD_SPEED_SCALE, UNIT_SPEED_SCALE } from "src/constants.sol";
import { EResource, EFleetStance, EBuilding } from "src/Types.sol";
import { entityToAddress } from "src/utils.sol";

library LibFleetCombat {
  function attack(
    bytes32 entity,
    bytes32 targetEntity
  ) internal returns (bytes32 battleId, BattleResultData memory battleResult) {
    bool aggressorIsFleet = IsFleet.get(entity);

    // update grace period of rock and fleet on rock
    if (aggressorIsFleet) {
      bytes32 ownerEntity = OwnedBy.get(entity);
      if (GracePeriod.get(OwnedBy.get(entity)) > 0) GracePeriod.deleteRecord(ownerEntity);
      uint256 cooldownEnds = block.timestamp + 60 * 60 * 24;
      CooldownEnds.set(entity, cooldownEnds);
    }

    if (GracePeriod.get(entity) > 0) GracePeriod.deleteRecord(entity);

    bytes32 spaceRock = aggressorIsFleet ? FleetMovement.getDestination(entity) : entity;

    battleId = LibEncode.getTimedHash(spaceRock);
    (uint256 aggressorDamage, uint256[] memory aggressorDamages, uint256 totalAggressorDamage) = aggressorIsFleet
      ? LibCombatAttributes.getAttacksWithAllies(entity)
      : LibCombatAttributes.getDefensesWithAllies(entity);

    BattleDamageDealtResult.set(battleId, entity, aggressorDamage);

    bytes32[] memory aggressorAllies = LibFleetStance.getAllies(entity);
    for (uint256 i = 0; i < aggressorAllies.length; i++) {
      BattleDamageDealtResult.set(battleId, aggressorAllies[i], aggressorDamages[i]);
    }
    (uint256 targetDamage, uint256[] memory targetDamages, uint256 totalTargetDamage) = aggressorIsFleet
      ? LibCombatAttributes.getDefensesWithAllies(targetEntity)
      : LibCombatAttributes.getAttacksWithAllies(targetEntity);

    BattleDamageDealtResult.set(battleId, targetEntity, targetDamage);

    bytes32[] memory targetAllies = LibFleetStance.getAllies(targetEntity);
    for (uint256 i = 0; i < targetAllies.length; i++) {
      BattleDamageDealtResult.set(battleId, targetAllies[i], targetDamages[i]);
    }

    battleResult = BattleResultData({
      aggressorEntity: entity,
      aggressorDamage: totalAggressorDamage,
      targetEntity: targetEntity,
      targetDamage: totalTargetDamage,
      aggressorAllies: aggressorAllies,
      targetAllies: targetAllies,
      winner: totalAggressorDamage > totalTargetDamage ? entity : targetEntity,
      rock: spaceRock,
      timestamp: block.timestamp
    });

    BattleResult.set(battleId, battleResult);
  }

  function resolveBattleEncryption(
    bytes32 battleId,
    bytes32 targetSpaceRock,
    bytes32 aggressorEntity
  ) internal returns (uint256 encryptionAtEnd) {
    uint256 encryptionAtStart = ResourceCount.get(targetSpaceRock, uint8(EResource.R_Encryption));
    uint256 decryption = P_CapitalShipConfig.getDecryption();
    encryptionAtEnd = encryptionAtStart;
    if (encryptionAtStart != 0) {
      if (decryption > encryptionAtStart) {
        decryption = encryptionAtStart;
      }
      if (decryption != 0) {
        LibStorage.decreaseStoredResource(targetSpaceRock, uint8(EResource.R_Encryption), decryption);
        encryptionAtEnd = ResourceCount.get(targetSpaceRock, uint8(EResource.R_Encryption));
      }
    }
    if (encryptionAtEnd == 0) {
      LibFleet.decreaseFleetUnit(aggressorEntity, CapitalShipPrototypeId, 1, true);
    }
    BattleEncryptionResult.set(battleId, targetSpaceRock, encryptionAtStart, encryptionAtEnd);
  }

  function applyDamage(
    bytes32 battleId,
    bytes32 attackingPlayer,
    bytes32 defender,
    uint256 damage
  ) internal returns (uint256 damageDealt) {
    if (damage == 0) return 0;

    // get total hp of target and their allies as damage will be split between them
    (uint256 hp, uint256[] memory hps, uint256 totalHp) = LibCombatAttributes.getHpsWithAllies(defender);

    if (totalHp == 0) return 0;

    if (damage > totalHp) {
      damage = totalHp;
    }

    damageDealt = 0;
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    uint256[] memory totalUnitCasualties = new uint256[](unitPrototypes.length);
    if (IsFleet.get(defender)) {
      (damageDealt, totalUnitCasualties) = applyDamageToUnits(battleId, defender, totalHp, damage, totalUnitCasualties);
    } else {
      (damageDealt, totalUnitCasualties) = applyDamageToSpaceRock(
        battleId,
        defender,
        totalHp,
        damage,
        totalUnitCasualties
      );
    }

    BattleDamageTakenResult.set(battleId, defender, hp, damageDealt);

    if (damageDealt < damage) {
      bytes32[] memory allies = LibFleetStance.getAllies(defender);
      for (uint256 i = 0; i < allies.length; i++) {
        uint256 damageDealtToAlly = 0;
        (damageDealtToAlly, totalUnitCasualties) = applyDamageToUnits(
          battleId,
          allies[i],
          totalHp,
          damage,
          totalUnitCasualties
        );
        BattleDamageTakenResult.set(battleId, allies[i], hps[i], damageDealtToAlly);
        damageDealt += damageDealtToAlly;
        if (damageDealt >= damage) {
          break;
        }
      }
    }
    DamageDealt.set(attackingPlayer, DamageDealt.get(attackingPlayer) + damageDealt);
    for (uint256 i = 0; i < totalUnitCasualties.length; i++) {
      if (totalUnitCasualties[i] > 0) {
        DestroyedUnit.set(
          attackingPlayer,
          unitPrototypes[i],
          DestroyedUnit.get(attackingPlayer, unitPrototypes[i]) + totalUnitCasualties[i]
        );
      }
    }
    return damageDealt;
  }

  function applyDamageToSpaceRock(
    bytes32 battleId,
    bytes32 spaceRock,
    uint256 totalHp,
    uint256 damage,
    uint256[] memory totalUnitCasualties
  ) internal returns (uint256 damageDealt, uint256[] memory) {
    if (damage == 0 || totalHp == 0) return (0, totalUnitCasualties);
    uint256 currHp = ResourceCount.get(spaceRock, uint8(EResource.R_HP));
    damageDealt = 0;

    uint256 damagePortion = (currHp * damage) / totalHp;
    LibStorage.decreaseStoredResource(spaceRock, uint8(EResource.R_HP), damagePortion);
    damageDealt += damagePortion;

    if (damageDealt >= damage) return (damageDealt, totalUnitCasualties);
    uint256 damageToUnits = 0;
    (damageToUnits, totalUnitCasualties) = applyDamageToUnits(
      battleId,
      spaceRock,
      totalHp - currHp,
      damage - damageDealt,
      totalUnitCasualties
    );
    damageDealt += damageToUnits;
    return (damageDealt, totalUnitCasualties);
  }

  function applyDamageToUnits(
    bytes32 battleId,
    bytes32 targetEntity,
    uint256 totalHp,
    uint256 damage,
    uint256[] memory totalUnitCasualties
  ) internal returns (uint256 damageDealt, uint256[] memory) {
    if (damage == 0 || totalHp == 0) return (0, totalUnitCasualties);
    bytes32[] memory unitPrototypes = P_UnitPrototypes.get();
    BattleUnitResultData memory unitResult = BattleUnitResultData({
      unitsAtStart: new uint256[](unitPrototypes.length),
      unitLevels: new uint256[](unitPrototypes.length),
      casualties: new uint256[](unitPrototypes.length)
    });

    for (uint256 i = 0; i < unitPrototypes.length; i++) {
      unitResult.unitsAtStart[i] = UnitCount.get(targetEntity, unitPrototypes[i]);
      if (unitResult.unitsAtStart[i] == 0) continue;
      bytes32 spaceRock = IsFleet.get(targetEntity) ? OwnedBy.get(targetEntity) : targetEntity;
      unitResult.unitLevels[i] = UnitLevel.get(spaceRock, unitPrototypes[i]);
      uint256 unitHp = P_Unit.getHp(unitPrototypes[i], unitResult.unitLevels[i]);
      uint256 damagePortion = LibMath.divideRound((unitResult.unitsAtStart[i] * unitHp * damage), totalHp);
      unitResult.casualties[i] = LibMath.divideRound(damagePortion, unitHp);

      if (unitResult.casualties[i] > unitResult.unitsAtStart[i]) unitResult.casualties[i] = unitResult.unitsAtStart[i];
      applyUnitCasualty(targetEntity, unitPrototypes[i], unitResult.casualties[i]);
      totalUnitCasualties[i] += unitResult.casualties[i];
      damagePortion = unitResult.casualties[i] * unitHp;
      damageDealt += damagePortion;
      if (damageDealt >= damage) break;
    }

    BattleUnitResult.set(battleId, targetEntity, unitResult);

    if (IsFleet.get(targetEntity)) {
      applyLostCargo(targetEntity);
      LibFleet.resetFleetIfNoUnitsLeft(targetEntity);
    }

    return (damageDealt, totalUnitCasualties);
  }

  function applyUnitCasualty(bytes32 targetEntity, bytes32 unitPrototype, uint256 unitCount) internal {
    if (unitCount == 0) return;
    if (IsFleet.get(targetEntity)) {
      LibFleet.decreaseFleetUnit(targetEntity, unitPrototype, unitCount, true);
    } else {
      LibUnit.decreaseUnitCount(targetEntity, unitPrototype, unitCount, true);
    }
  }

  function applyLostCargo(bytes32 fleetId) internal {
    uint256 cargo = LibCombatAttributes.getCargoCapacity(fleetId);
    uint256 occupiedCargo = LibCombatAttributes.getCargo(fleetId);
    if (cargo >= occupiedCargo) return;

    uint256 cargoLost = occupiedCargo - cargo;
    uint256 cargoLossLeft = cargoLost;
    uint8[] memory transportables = P_Transportables.get();
    for (uint8 i = 0; i < transportables.length; i++) {
      if (cargoLossLeft == 0) break;
      uint256 resourceCount = ResourceCount.get(fleetId, i);
      if (resourceCount == 0) continue;

      uint256 resourcePortion = LibMath.divideCeil(resourceCount * cargoLost, occupiedCargo);
      if (resourcePortion > cargoLossLeft) {
        resourcePortion = cargoLossLeft;
      }
      LibFleet.decreaseFleetResource(fleetId, i, resourcePortion);
      cargoLossLeft -= resourcePortion;
    }
  }

  function resolvePirateAsteroid(bytes32 playerEntity, bytes32 pirateAsteroid) internal {
    PirateAsteroid.setIsDefeated(pirateAsteroid, true);
    DefeatedPirate.set(playerEntity, PirateAsteroid.getPrototype(pirateAsteroid), true);
    bytes32[] memory incomingFleets = FleetsMap.getFleetIds(pirateAsteroid, FleetIncomingKey);
    for (uint256 i = 0; i < incomingFleets.length; i++) {
      if (FleetMovement.getArrivalTime(incomingFleets[i]) <= block.timestamp) {
        LibFleetMove.sendFleet(incomingFleets[i], OwnedBy.get(incomingFleets[i]));
      } else {
        LibFleetMove.recallFleet(incomingFleets[i]);
      }
    }
  }
}
