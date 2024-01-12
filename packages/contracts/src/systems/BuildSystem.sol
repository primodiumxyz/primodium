// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

// external
import { PrimodiumSystem } from "systems/internal/PrimodiumSystem.sol";

// tables
import { P_EnumToPrototype, PositionData } from "codegen/index.sol";

// libraries
import { LibBuilding } from "libraries/LibBuilding.sol";

// types
import { BuildingKey } from "src/Keys.sol";
import { EBuilding } from "src/Types.sol";

contract BuildSystem is PrimodiumSystem {
  function build(EBuilding buildingType, PositionData memory coord)
    public
    claimResources(coord.parent)
    returns (bytes32 buildingEntity)
  {
    bytes32 buildingPrototype = P_EnumToPrototype.get(BuildingKey, uint8(buildingType));
    return LibBuilding.build(_player(false), buildingPrototype, coord);
  }
}
