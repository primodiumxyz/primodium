import { World } from "@latticexyz/recs";
import {
  defineBoolComponent,
  defineNumberComponent,
  defineCoordComponent,
} from "@latticexyz/std-client";

export function defineComponents(world: World) {
  return {
    Counter: defineNumberComponent(world, {
      metadata: {
        contractId: "component.Counter",
      },
    }),
    Position: defineCoordComponent(world, {
      metadata: {
        contractId: "component.Position",
      },
    }),
    Tile: defineNumberComponent(world, {
      metadata: {
        contractId: "component.Tile",
      },
    }),
    Path: defineNumberComponent(world, {
      metadata: {
        contractId: "component.Path",
      },
    }),
    OwnedBy: defineNumberComponent(world, {
      metadata: {
        contractId: "component.OwnedBy",
      },
    }),
    LastBuiltAt: defineNumberComponent(world, {
      metadata: {
        contractId: "component.LastBuiltAt",
      },
    }),
    LastClaimedAt: defineNumberComponent(world, {
      metadata: {
        contractId: "component.LastClaimedAt",
      },
    }),
    Item: defineNumberComponent(world, {
      metadata: {
        contractId: "component.Item",
      },
    }),
    Research: defineBoolComponent(world, {
      metadata: {
        contractId: "component.Research",
      },
    }),
    // starter pack initialized
    StarterPackInitialized: defineBoolComponent(world, {
      metadata: {
        contractId: "component.StarterPackInitialized",
      },
    }),
  };
}

export function defineOffChainComponents(world: World) {
  return {
    DoubleCounter: defineNumberComponent(world, {
      metadata: {},
      id: "DoubleCounter",
    }),
  };
}
