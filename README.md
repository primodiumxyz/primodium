# Primodium MUD

Initialize with `yarn`. Afterwards, in separate terminal sessions, run the following commands in order:

```
yarn workspace contracts run devnode
yarn workspace contracts run dev
yarn workspace client run dev
```

The test page is located at `localhost:3000/increment?dev=true&worldAddress=<address>`.

# Testing and Deployment

For testing, set the `isDebug()` function to return true in `packages/contracts/src/libraries/LibDebug.sol`. Then, create an empty environment file at `packages/client/.env` and set the following:

```
VITE_DEV=true
```

Deploy the contracts on the local environment using the commands in the previous section. This enables debug buildings to be built, which are free. Additional unit tests is provided by the mud cli and can be accessed below from the `packages/contracts` directory.

```
mud test
```

For production deployment, Primodium is currently live on the 0xPARC/Lattice testnet. Set the `isDebug()` function to return false, then deploy the contracts with the following command in the `packages/contracts` directory.

```
npx mud deploy --chainSpec chainSpecSkyStrife.json --deployerPrivateKey <testnet key>
```

The client is automatically deployed on Vercel from the main branch. The live instance is located at `testnet2.primodium.com/?worldAddress=<world address>` with the rpc settings to the 0xPARC/Lattice testnet.

# Claiming/Crafting Design

Claiming from a MainBase stores items in the user's inventory, where the user's address is hashed for `ItemComponent`. Claiming from factories stores items in the factory, where the address representation of the building's entity ID is hashed for `ItemComponent`.

To craft from factory

- ClaimSystem: Claiming Resources from Mine.
  - Called from factories (mines -> factories), main base (mines -> main base)
- ClaimFactory: Claiming finished crafted items from factory.
  - Called from factories (factories -> factories), main base (factories -> main base)
- CraftSystem: Crafting Items (called from factories)
  - Called from factories (items already in factories, no resource flows)

# Component Structure

`OwnedByComponent` records building ownership while `ItemComponent` records mined and crafted item ownership.

## Core Compnents

`CounterComponent` is a debug component for testing purposes. `GameConfigComponent` is currently unused. It should be used in the future for randomizing the Perlin noise seed and initializing other game state.

```
  CounterComponent
  GameConfigComponent
  TileComponent
  OwnedByComponent
  PathComponent
  LastBuiltAtComponent
  LastClaimedAtComponent
  LastResearchedAtComponent
  HealthComponent
```

## Resource and Research

The keys of the following component is a hash of the uint256 representation of an item or research objective and an entity address, as defined in `hashKeyEntity()` in `packages/contracts/src/libraries/LibEncode.sol`. Entity addresses are either user wallets or entities generated by `BuildSystem` - such entity IDs are truncated from uint256 to uint160 upon creation to standardize hashing outputs.

```
  ItemComponent
  ResearchComponent
```

## Game metadata

The following components are used to store metadata that is read before a building is built by the user. `RequiredResourcesComponent` stores a list of resource IDs that are required by a building, after which the specific resource count is stored in `ItemComponent` as "owned" by the building ID (i.e. `hashKeyEntity(resourceId, buildingId)` as key with count as value). `RequiredResearchComponent` is a boolean that stores the required research objective. `BuildingLimitComponent` stores building limit requirements.

`TileComponent`: set for a building ID to only allow that building to be built on the set tile type

```
  RequiredResearchComponent
  RequiredResourcesComponent
  ItemComponent
  BuildingLimitComponent
```

## Game mechanics

`MainBaseInitializedComponent` stores the coordianates of the user's base, where the map is panned to by default. New users are provided 200 free iron in the tutorial, the status of which is recorded by the boolean `StarterPackInitializedComponent`.

```
  MainBaseInitializedComponent
  StarterPackInitializedComponent
```

# Item listing

All the items in the game is listed at https://tiles.primodium.com/.
