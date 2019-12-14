import { expect } from "chai";

import { initialState as initialStateForQuiz_day2_1022 } from "./day2-1022-program-alarm.input-data";

import {
  buildInstruction,
  buildState,
  calculateNextState
} from "./day5-sunny-with-a-chance";
import { solve_day2_1022_program_alarm_Quiz2 } from "./day5-day-2-quiz-2.solution";
import { initialState as initiatStateForQuiz1 } from "./day5-sunny-with-a-chance.input-data";

describe("x - buildInstruction", () => {
  it("x.1 - should build a SUM instruction with all 3 parameter modes set to 0", () => {
    const instructionData = buildState([1, 2, 3, 4]);
    const instruction = buildInstruction(instructionData);
    expect(instruction.id).to.equal("01");
    expect(instruction.parameters.length).to.equal(3);
    instruction.parameters.forEach(pm => expect(pm.mode).to.equal("0"));
    expect(instruction.parameters[0].value).to.equal(2);
    expect(instruction.parameters[1].value).to.equal(3);
    expect(instruction.parameters[2].value).to.equal(4);
  });
  it("x.2 - should build a MUL instruction with some parameter modes set to 0 and some set to 1", () => {
    const instructionData = buildState([102, 2, 3, 4]);
    const instruction = buildInstruction(instructionData);
    expect(instruction.id).to.equal("02");
    expect(instruction.parameters.length).to.equal(3);
    expect(instruction.parameters[0].mode).to.equal("1");
    expect(instruction.parameters[1].mode).to.equal("0");
    expect(instruction.parameters[2].mode).to.equal("0");
    expect(instruction.parameters[0].value).to.equal(2);
    expect(instruction.parameters[1].value).to.equal(3);
    expect(instruction.parameters[2].value).to.equal(4);
  });
  it("x.3 - should build a SUM instruction with all 3 parameter modes set to 1", () => {
    const instructionData = buildState([11102, 2, 3, 4]);
    const instruction = buildInstruction(instructionData);
    expect(instruction.id).to.equal("02");
    expect(instruction.parameters.length).to.equal(3);
    instruction.parameters.forEach(pm => expect(pm.mode).to.equal("1"));
  });
});
describe("y - input instruction", () => {
  it("y.1 - should save input in the position specified in the ipunt instruction", () => {
    const input = 100;
    const initialData = [3, 0, 99];
    const expectedNextState = [100, 0, 99];
    const result = calculateNextState(initialData, input);
    assertEquals(expectedNextState, result);
  });
});

describe("z - output instruction", () => {
  it("z.1 - should output the input received", () => {
    const input = 100;
    const initialData = [3, 0, 4, 0, 99];
    let output: number;
    const outputFunction = (o: number) => {
      output = o;
    };
    calculateNextState(initialData, input, outputFunction);
    expect(output).to.equal(input);
  });
});

describe("w - instruction with immediate mode parameters", () => {
  it("w.1 - should exit after the exectution of the instruction - example from the quiz description", () => {
    const initialData = [1002, 4, 3, 4, 33];
    const expectedNextState = [1002, 4, 3, 4, 99];
    const result = calculateNextState(initialData);
    assertEquals(expectedNextState, result);
  });
});

describe("t - instruction with parameters with negative values", () => {
  it("t.1 - should exit after the exectution of the instruction - example from the quiz description", () => {
    const initialData = [1101, 100, -1, 4, 0];
    const expectedNextState = [1101, 100, -1, 4, 99];
    const result = calculateNextState(initialData);
    assertEquals(expectedNextState, result);
  });
});

describe("f - solution to quizs", () => {
  it("f.1 - solution to quiz 1", () => {
    let outputArray: number[] = [];
    const outputFunction = (o: number) => {
      outputArray.push(o);
    };
    calculateNextState(initiatStateForQuiz1, 1, outputFunction);
    expect(outputArray[outputArray.length - 1]).to.equal(16348437);
  });
});

//*******************************************************************************************************
//*****************  tests from day2 exercize which have to pass since this version    ******************
//*****************  of the computer is compatible with the previous one               ******************
//*******************************************************************************************************
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
    const result = calculateNextState(initialStateForQuiz_day2_1022);
    expect(result[0]).to.equal(466656);
  });
  it("2.2 - solution to quiz 2", () => {
    const solution = solve_day2_1022_program_alarm_Quiz2();
    expect(solution.noun).to.equal(89);
    expect(solution.verb).to.equal(76);
  });
});

function assertEquals(expected: number[], actual: number[]) {
  actual.forEach((n, index) =>
    expect(n).to.equal(expected[index], `error at position ${index}`)
  );
}
