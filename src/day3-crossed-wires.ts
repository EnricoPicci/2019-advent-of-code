export type Movement = { direction: "U" | "R" | "L" | "D"; length: number };

export function calculateClosestCross(wire1: Movement[], wire2: Movement[]) {
  const initialPosition = { x: 0, y: 0 };

  const crossPoints = calculateCrossPoints(wire1, wire2, initialPosition);
  return crossPoints.reduce(
    (min, val) => Math.min(min, Math.abs(val.x) + Math.abs(val.y)),
    Infinity
  );
}

export function calculateCrossPoints(
  wire1: Movement[],
  wire2: Movement[],
  initialPosition = { x: 0, y: 0 }
) {
  const wirePath1 = calculatePositionsOfWirePath(wire1, initialPosition);
  const wirePath2 = calculatePositionsOfWirePath(wire2, initialPosition);
  return wirePath1.filter(
    point1 =>
      !(point1.x === 0 && point1.y === 0) &&
      wirePath2.find(point2 => point1.x === point2.x && point1.y === point2.y)
  );
}

export function calculatePositionsOfWirePath(
  wire: Movement[],
  initialPosition: { x: number; y: number }
) {
  const ret: {
    value: {
      x: number;
      y: number;
    }[];
    done: boolean;
    iteration: number;
  }[] = [];
  const wirePositionsIterator = buildWirePositionsIterator(
    initialPosition,
    wire
  );
  let positionsWalkedByWire = wirePositionsIterator.next();
  while (!positionsWalkedByWire.done) {
    ret.push(positionsWalkedByWire);
    positionsWalkedByWire = wirePositionsIterator.next();
  }
  return ret.reduce(
    (acc, val) => acc.concat(val.value),
    [] as {
      x: number;
      y: number;
    }[]
  );
}

function buildWirePositionsIterator(
  initialPosition: { x: number; y: number },
  wire: Movement[]
) {
  let iterationCount = 0;
  let _initialPosition = initialPosition;

  const wirePositionsIterator = {
    next: () => {
      if (iterationCount < wire.length) {
        const positionsWalked = calculatePositionsWalkedPerMovement(
          _initialPosition,
          wire[iterationCount]
        );
        const _result = {
          value: positionsWalked,
          done: false,
          iteration: iterationCount
        };
        iterationCount++;
        _initialPosition = positionsWalked[positionsWalked.length - 1];
        return _result;
      }
      return { value: [], done: true, iteration: iterationCount };
    }
  };

  return wirePositionsIterator;
}

function calculatePositionsWalkedPerMovement(
  initialPosition: { x: number; y: number },
  wireMovement: Movement
) {
  let ret: { x: number; y: number }[] = [];
  let runningPosition = { ...initialPosition };
  const direction = wireMovement.direction;
  const length = wireMovement.length;
  if (direction === "R") {
    for (let i = 0; i < length; i++) {
      runningPosition = { ...runningPosition };
      runningPosition.x++;
      ret.push(runningPosition);
    }
  } else if (direction === "L") {
    for (let i = 0; i < length; i++) {
      runningPosition = { ...runningPosition };
      runningPosition.x--;
      ret.push(runningPosition);
    }
  } else if (direction === "U") {
    for (let i = 0; i < length; i++) {
      runningPosition = { ...runningPosition };
      runningPosition.y++;
      ret.push(runningPosition);
    }
  } else if (direction === "D") {
    for (let i = 0; i < length; i++) {
      runningPosition = { ...runningPosition };
      runningPosition.y--;
      ret.push(runningPosition);
    }
  }
  return ret;
}

export function wireMovements(wireRawMovements: string[]) {
  return wireRawMovements.map(
    wm =>
      ({ direction: wm.slice(0, 1), length: parseInt(wm.slice(1)) } as Movement)
  );
}
