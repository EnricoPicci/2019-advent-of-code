import { expect } from "chai";

import { calculateNextState } from "./day2-1022-program-alarm";

import { initialState as initialStateForQuiz } from "./day2-1022-program-alarm.input-data";
import { solveQuiz2 } from "./day2-1022-program-alarm-2.solution";

describe("1 - calculate next state", () => {
  it("1.1 - calculates the next state for the first example", () => {
    const initialState = [1, 0, 0, 0, 99];
    const expectedNextState = [2, 0, 0, 0, 99];
    const result = calculateNextState(initialState);
    assertEquals(expectedNextState, result);
  });

  it("1.2 - calculates the next state for the second example", () => {
    const initialState = [2, 3, 0, 3, 99];
    const expectedNextState = [2, 3, 0, 6, 99];
    const result = calculateNextState(initialState);
    assertEquals(expectedNextState, result);
  });

  it("1.3 - calculates the next state for the third example", () => {
    const initialState = [2, 4, 4, 5, 99, 0];
    const expectedNextState = [2, 4, 4, 5, 99, 9801];
    const result = calculateNextState(initialState);
    assertEquals(expectedNextState, result);
  });

  it("1.4 - calculates the next state for the fourth example", () => {
    const initialState = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    const expectedNextState = [30, 1, 1, 4, 2, 5, 6, 0, 99];
    const result = calculateNextState(initialState);
    assertEquals(expectedNextState, result);
  });

  it("1.5 - calculates the next state for the main example", () => {
    const initialState = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
    const expectedNextState = [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50];
    const result = calculateNextState(initialState);
    assertEquals(expectedNextState, result);
  });
});

describe("2 - solution to quizs", () => {
  it("2.1 - solution to quiz 1", () => {
    const result = calculateNextState(initialStateForQuiz);
    expect(result[0]).to.equal(466656);
  });
  it("2.2 - solution to quiz 2", () => {
    const solution = solveQuiz2();
    expect(solution.noun).to.equal(89);
    expect(solution.verb).to.equal(76);
  });
});

function assertEquals(expected: number[], actual: number[]) {
  actual.forEach((n, index) =>
    expect(n).to.equal(expected[index], `error at position ${index}`)
  );
}
