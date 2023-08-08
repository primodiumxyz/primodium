// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { EActionType } from "../types.sol";

interface IOnBuildingSubsystem {
  function executeTyped(
    address playerAddress,
    uint256 buildingEntity,
    EActionType actionType
  ) external returns (bytes memory);
}
