import { expect } from "chai";

import {
  calculateClosestCross,
  calculatePositionsOfWirePath,
  calculateCrossPoints,
  wireMovements
} from "./day3-crossed-wires";

describe("0 - calculate wire path", () => {
  it("0.1 - calculates the path of a wire which has only 1 movement to the right", () => {
    const wire = ["R4"];
    const initialPosition = { x: 1, y: 1 };
    const wirePath = calculatePositionsOfWirePath(
      wireMovements(wire),
      initialPosition
    );
    const endPosition = wirePath[wirePath.length - 1];
    expect(endPosition.x).to.equal(initialPosition.x + 4);
    expect(endPosition.y).to.equal(initialPosition.y);
  });
  it("0.2 - calculates the path of a wire which has only 1 movement to the left", () => {
    const wire = ["L4"];
    const initialPosition = { x: 1, y: 1 };
    const wirePath = calculatePositionsOfWirePath(
      wireMovements(wire),
      initialPosition
    );
    const endPosition = wirePath[wirePath.length - 1];
    expect(endPosition.x).to.equal(initialPosition.x - 4);
    expect(endPosition.y).to.equal(initialPosition.y);
  });
  it("0.3 - calculates the path of a wire which has only 1 movement uopwards", () => {
    const wire = ["U4"];
    const initialPosition = { x: 1, y: 1 };
    const wirePath = calculatePositionsOfWirePath(
      wireMovements(wire),
      initialPosition
    );
    const endPosition = wirePath[wirePath.length - 1];
    expect(endPosition.x).to.equal(initialPosition.x);
    expect(endPosition.y).to.equal(initialPosition.y + 4);
  });
  it("0.4 - calculates the path of a wire which has only 1 movement downwards", () => {
    const wire = ["D4"];
    const initialPosition = { x: 1, y: 1 };
    const wirePath = calculatePositionsOfWirePath(
      wireMovements(wire),
      initialPosition
    );
    const endPosition = wirePath[wirePath.length - 1];
    expect(endPosition.x).to.equal(initialPosition.x);
    expect(endPosition.y).to.equal(initialPosition.y - 4);
  });
  it("0.5 - calculates the path of a wire which has 1 movement to the left and the same to the right", () => {
    const wire = ["L4", "R4"];
    const initialPosition = { x: 1, y: 1 };
    const wirePath = calculatePositionsOfWirePath(
      wireMovements(wire),
      initialPosition
    );
    const endPosition = wirePath[wirePath.length - 1];
    expect(endPosition.x).to.equal(initialPosition.x);
    expect(endPosition.y).to.equal(initialPosition.y);
  });
  it("0.6 - calculates the path of a wire which ends where it begins", () => {
    const wire = ["R4", "D4", "L4", "U4"];
    const initialPosition = { x: 1, y: 1 };
    const wirePath = calculatePositionsOfWirePath(
      wireMovements(wire),
      initialPosition
    );
    const endPosition = wirePath[wirePath.length - 1];
    expect(endPosition.x).to.equal(initialPosition.x);
    expect(endPosition.y).to.equal(initialPosition.y);
  });
  it("0.7 - calculates the path of a wire which ends almost where it begins", () => {
    const wire = ["R7", "D7", "L7", "U6"];
    const initialPosition = { x: 0, y: 0 };
    const wirePath = calculatePositionsOfWirePath(
      wireMovements(wire),
      initialPosition
    );
    const endPosition = wirePath[wirePath.length - 1];
    expect(endPosition.x).to.equal(0);
    expect(endPosition.y).to.equal(-1);
  });
});

describe("1 - calculate the cross points for 2 wires", () => {
  it("1.1 - calculate the cross points for 2 wires which have onle 1 cross point at the end", () => {
    const wire1 = ["R5", "U5"];
    const wire2 = ["U5", "R5"];
    const expectedCrossPoint = { x: 5, y: 5 };
    const result = calculateCrossPoints(
      wireMovements(wire1),
      wireMovements(wire2)
    );
    expect(result[0].x).to.equal(expectedCrossPoint.x);
    expect(result[0].y).to.equal(expectedCrossPoint.y);
  });
  it("1.2 - calculate the cross points for 2 wires which have the same path", () => {
    const wire1 = ["R5", "U5"];
    const wire2 = ["R5", "U5"];
    const expectedNumberOfCrossPoint = 10;
    const result = calculateCrossPoints(
      wireMovements(wire1),
      wireMovements(wire2)
    );
    expect(result.length).to.equal(expectedNumberOfCrossPoint);
  });
  it("1.3 - calculate the cross points for 2 wires which have 2 cross points", () => {
    const wire1 = ["R4", "U5", "L3"];
    const wire2 = ["U3", "R6", "U4", "L5", "D5"];
    const expectedNumberOfCrossPoint = 2;
    const expecteCrossPoint1 = { x: 4, y: 3 };
    const expecteCrossPoint2 = { x: 1, y: 5 };
    const result = calculateCrossPoints(
      wireMovements(wire1),
      wireMovements(wire2)
    );
    expect(result.length).to.equal(expectedNumberOfCrossPoint);
    const crossPoint1 = result.find(
      p => p.x === expecteCrossPoint1.x && p.y === expecteCrossPoint1.y
    );
    expect(crossPoint1).to.be.not.undefined;
    const crossPoint2 = result.find(
      p => p.x === expecteCrossPoint2.x && p.y === expecteCrossPoint2.y
    );
    expect(crossPoint2).to.be.not.undefined;
  });
  it("1.4 - calculate the cross points for 2 wires which have 4 cross points", () => {
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
    const expectedNumberOfCrossPoint = 4;
    const result = calculateCrossPoints(
      wireMovements(wire1),
      wireMovements(wire2)
    );
    expect(result.length).to.equal(expectedNumberOfCrossPoint);
  });
});

describe("2 - calculate closest cs point for 2 wires", () => {
  it("2.0 - calculates the closest cross point for 2 wires", () => {
    const wire1 = ["R4", "U5", "L3"];
    const wire2 = ["U3", "R6", "U4", "L5", "D5"];
    const expectedDistance = 6;
    const result = calculateClosestCross(
      wireMovements(wire1),
      wireMovements(wire2)
    );
    expect(result).to.equal(expectedDistance);
  });
  it("2.1 - calculates the closest cross point for 2 wires", () => {
    const wire1 = ["R4", "U5", "L3"];
    const wire2 = ["U3", "R6", "U4", "L5"];
    const expectedDistance = 7;
    const result = calculateClosestCross(
      wireMovements(wire1),
      wireMovements(wire2)
    );
    expect(result).to.equal(expectedDistance);
  });
  it("2.2 - calculates the closest cross point for 2 wires for the first example", () => {
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
    const expectedDistance = 159;
    const result = calculateClosestCross(
      wireMovements(wire1),
      wireMovements(wire2)
    );
    expect(result).to.equal(expectedDistance);
  });
  it("2.3 - calculates the closest cross point for 2 wires for the second example", () => {
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
    const expectedDistance = 135;
    const result = calculateClosestCross(
      wireMovements(wire1),
      wireMovements(wire2)
    );
    expect(result).to.equal(expectedDistance);
  });
});
