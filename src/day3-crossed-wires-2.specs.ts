import { expect } from "chai";

import { wireMovements, calculatePositionsOfWirePath } from "./day3-crossed-wires";
import {
  calculateMinimalNumberOfStepsToReachAnIntersection,
  calculateNumberOfStepsToIntersection
} from "./day3-crossed-wires-2";

describe("0 - calculate the cross points for 2 wires", () => {
  it("0.1 - calculate the numbers of steps to reach an intersection", () => {
    const wire1 = ["R5", "U5"];
    const wire2 = ["U5", "R5"];
    const initialPosition = { x: 0, y: 0 };
    const intersection = { x: 5, y: 5 };
    const expectedNumberOfSteps = 20;
    const result = calculateNumberOfStepsToIntersection(
      calculatePositionsOfWirePath(wireMovements(wire1), initialPosition),
      calculatePositionsOfWirePath(wireMovements(wire2), initialPosition),
      intersection
    );
    expect(result).to.equal(expectedNumberOfSteps);
  });
});

describe("1 - calculate number of steps to reach first intersection", () => {
  it("1.1 - calculate number of steps to reach first intersection first example", () => {
    const wire1 = [
      "R75",
      "D30",
      "R83",
      "U83",
      "L12",
      "D49",
      "R71",
      "U7",
      "L72"
    ];
    const wire2 = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];
    const expectedNumberOfSteps = 610;
    const result = calculateMinimalNumberOfStepsToReachAnIntersection(
      wireMovements(wire1),
      wireMovements(wire2)
    );
    expect(result).to.equal(expectedNumberOfSteps);
  });
  it("1.2 - calculate number of steps to reach first intersection for the second example", () => {
    const wire1 = [
      "R98",
      "U47",
      "R26",
      "D63",
      "R33",
      "U87",
      "L62",
      "D20",
      "R33",
      "U53",
      "R51"
    ];
    const wire2 = [
      "U98",
      "R91",
      "D20",
      "R16",
      "D67",
      "R40",
      "U7",
      "R15",
      "U6",
      "R7"
    ];
    const expectedNumberOfSteps = 410;
    const result = calculateMinimalNumberOfStepsToReachAnIntersection(
      wireMovements(wire1),
      wireMovements(wire2)
    );
    expect(result).to.equal(expectedNumberOfSteps);
  });
});
