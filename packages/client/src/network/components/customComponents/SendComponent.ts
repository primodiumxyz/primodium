import { EntityID, Metadata, World, Type } from "@latticexyz/recs";

import newComponent, { Options } from "./Component";
import { Coord } from "@latticexyz/utils";
import { Position, ReversePosition } from "../chainComponents";
import { encodeCoord } from "src/util/encode";
import { ActiveAsteroid } from "../clientComponents";

function newSendComponent<Overridable extends boolean, M extends Metadata>(
  world: World,
  options?: Options<Overridable, M>
) {
  const component = newComponent(
    world,
    {
      originX: Type.OptionalNumber,
      originY: Type.OptionalNumber,
      destinationX: Type.OptionalNumber,
      destinationY: Type.OptionalNumber,
      to: Type.OptionalEntity,
      units: Type.OptionalEntityArray,
      count: Type.OptionalNumberArray,
      sendType: Type.OptionalNumber,
      activeButton: Type.Number,
    },
    options
  );
  const emptyComponent = {
    originX: undefined,
    originY: undefined,
    destinationX: undefined,
    destinationY: undefined,
    to: undefined,
    units: undefined,
    count: undefined,
    sendType: undefined,
    activeButton: 0,
  };

  const getUnitCount = (entity: EntityID) => {
    const units = component.get()?.units;
    const count = component.get()?.count;

    if (!units || !count) return 0;

    const index = units.indexOf(entity);

    if (index === -1) return 0;

    if (index >= count.length) return 0;

    return count[index];
  };

  const reset = () => {
    const activeAsteroid = ActiveAsteroid.get()?.value;
    if (!activeAsteroid) return;
    const position = Position.get(activeAsteroid);
    component.set({
      originX: position?.x,
      originY: position?.y,
      destinationX: undefined,
      destinationY: undefined,
      activeButton: 0,
      units: undefined,
      count: undefined,
      to: undefined,
      sendType: undefined,
    });
  };

  const removeUnit = (entity: EntityID) => {
    let units = component.get()?.units;
    let count = component.get()?.count;

    if (!units) return;

    const index = units.indexOf(entity);

    if (index === -1) return;

    units.splice(index, 1);
    count!.splice(index, 1);

    component.update({ units, count });
  };

  const setOrigin = (position: Coord | undefined) => {
    if (!position)
      return component.update({
        originX: undefined,
        originY: undefined,
      });
    component.set({
      ...(component.get() || emptyComponent),
      originX: position.x,
      originY: position.y,
    });
  };

  const setDestination = (position: Coord | undefined) => {
    if (!position)
      return component.update({
        destinationX: undefined,
        destinationY: undefined,
      });
    component.set({
      ...(component.get() || emptyComponent),
      destinationX: position.x,
      destinationY: position.y,
    });
  };

  const getOrigin = () => {
    const componentValue = component.get();
    if (!componentValue || !componentValue.originX || !componentValue.originY)
      return undefined;
    const coord = { x: componentValue.originX, y: componentValue.originY };
    const entities = Position.getAllWith(coord);
    if (entities.length === 0) return;

    const entityId = entities[0];
    if (!entityId) return;

    const entity = ReversePosition.get(encodeCoord(coord))?.value;
    if (!entity) return undefined;
    return { ...coord, entity };
  };

  const getDestination = () => {
    const componentValue = component.get();
    if (
      !componentValue ||
      !componentValue.destinationX ||
      !componentValue.destinationY
    )
      return undefined;
    const coord = {
      x: componentValue.destinationX,
      y: componentValue.destinationY,
    };
    const entities = Position.getAllWith(coord);
    if (entities.length === 0) return;

    const entity = entities[0];
    if (!entity) return;

    return { ...coord, entity };
  };

  const setUnitCount = (entity: EntityID, count: number) => {
    let currentUnits = component.get()?.units;
    let currentCount = component.get()?.count;

    //initialize if null
    if (!currentUnits) {
      currentUnits = [entity];
      currentCount = [count];
      component.set({
        ...(component.get() || emptyComponent),
        units: currentUnits,
        count: currentCount,
      });
      return;
    }

    const index = currentUnits.indexOf(entity);

    //add new entity
    if (index === -1) {
      currentUnits.push(entity);
      currentCount!.push(count);
      component.update({ units: currentUnits, count: currentCount });
      return;
    }

    //update existing entity
    currentCount![index] = count;
    component.update({ units: currentUnits, count: currentCount });
  };

  return {
    ...component,
    getUnitCount,
    getOrigin,
    getDestination,
    setUnitCount,
    setOrigin,
    setDestination,
    removeUnit,
    reset,
  };
}

export default newSendComponent;
