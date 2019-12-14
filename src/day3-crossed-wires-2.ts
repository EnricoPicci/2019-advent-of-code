import { Movement, calculatePositionsOfWirePath } from "./day3-crossed-wires";

export function calculateMinimalNumberOfStepsToReachAnIntersection(
  wire1: Movement[],
  wire2: Movement[],
  initialPosition = { x: 0, y: 0 }
) {
  const wirePath1 = calculatePositionsOfWirePath(wire1, initialPosition);
  const wirePath2 = calculatePositionsOfWirePath(wire2, initialPosition);
  const intersections = wirePath1.filter(
    point1 =>
      !(point1.x === 0 && point1.y === 0) &&
      wirePath2.find(point2 => point1.x === point2.x && point1.y === point2.y)
  );
  const firstIntersection = intersections[0];
  const iterator1 = buildWireStepsToIntersectionIterator(
    wirePath1,
    firstIntersection
  );
  let res1 = iterator1.next();
  while (!res1.done) {
    res1 = iterator1.next();
  }
  const iterator2 = buildWireStepsToIntersectionIterator(
    wirePath2,
    firstIntersection
  );
  let res2 = iterator2.next();
  while (!res2.done) {
    res2 = iterator2.next();
  }
  return res1.steps + res2.steps;
}

export function calculateNumberOfStepsToIntersection(
  wirePath1: {
    x: number;
    y: number;
  }[],
  wirePath2: {
    x: number;
    y: number;
  }[],
  intersection: { x: number; y: number }
) {
  const iterator1 = buildWireStepsToIntersectionIterator(
    wirePath1,
    intersection
  );
  let res1 = iterator1.next();
  while (!res1.done) {
    res1 = iterator1.next();
  }
  const iterator2 = buildWireStepsToIntersectionIterator(
    wirePath2,
    intersection
  );
  let res2 = iterator2.next();
  while (!res2.done) {
    res2 = iterator2.next();
  }
  return res1.steps + res2.steps;
}

function buildWireStepsToIntersectionIterator(
  wirePath: {
    x: number;
    y: number;
  }[],
  intersection: {
    x: number;
    y: number;
  }
) {
  let stepCount = 1;
  let _currentStep = wirePath[0];

  const wireStepsToIntersectionIterator = {
    next: () => {
      if (
        !(
          _currentStep.x === intersection.x && _currentStep.y === intersection.y
        )
      ) {
        const _result = {
          value: _currentStep,
          done: false,
          steps: stepCount
        };
        stepCount++;
        _currentStep = wirePath[stepCount - 1];
        return _result;
      }
      return { value: _currentStep, done: true, steps: stepCount };
    }
  };

  return wireStepsToIntersectionIterator;
}
