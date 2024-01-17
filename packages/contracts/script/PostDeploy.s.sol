// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import { Script } from "forge-std/Script.sol";
import { console } from "forge-std/console.sol";
import { StoreSwitch } from "@latticexyz/store/src/StoreSwitch.sol";
import { IWorld } from "codegen/world/IWorld.sol";
import { setupHooks } from "script/SetupHooks.sol";
import { createPrototypes } from "codegen/Prototypes.sol";
import { createTerrain } from "codegen/scripts/CreateTerrain.sol";
import { P_GameConfig, P_GameConfig2 } from "codegen/index.sol";

import { StandardDelegationsModule } from "@latticexyz/world-modules/src/modules/std-delegations/StandardDelegationsModule.sol";

contract PostDeploy is Script {
  function run(address worldAddress) external {
    // Load the private key from the `PRIVATE_KEY` environment variable (in .env)
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
    address admin = vm.addr(deployerPrivateKey);

    IWorld world = IWorld(worldAddress);
    world.creator();
    vm.startBroadcast(deployerPrivateKey);
    StoreSwitch.setStoreAddress(worldAddress);
    world.increment();

    world.installRootModule(new StandardDelegationsModule(), new bytes(0));

    createPrototypes(world);
    console.log("Prototypes created");
    createTerrain();
    console.log("Terrain created");
    setupHooks(world);

    // this must be set after the prototypes or else it will be overwritten

    vm.stopBroadcast();
  }
}
