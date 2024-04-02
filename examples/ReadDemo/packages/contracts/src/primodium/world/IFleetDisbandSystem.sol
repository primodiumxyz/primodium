// SPDX-License-Identifier: MIT
pragma solidity >=0.8.24;

/* Autogenerated file. Do not edit manually. */

/**
 * @title IFleetDisbandSystem
 * @author MUD (https://mud.dev) by Lattice (https://lattice.xyz)
 * @dev This interface is automatically generated from the corresponding system contract. Do not edit manually.
 */
interface IFleetDisbandSystem {
  function Primodium__disbandFleet(bytes32 fleetEntity) external;

  function Primodium__disbandUnitsAndResourcesFromFleet(
    bytes32 fleetEntity,
    uint256[] calldata unitCounts,
    uint256[] calldata resourceCounts
  ) external;

  function Primodium__disbandUnits(bytes32 fleetEntity, uint256[] calldata unitCounts) external;

  function Primodium__disbandResources(bytes32 fleetEntity, uint256[] calldata resourceCounts) external;
}
