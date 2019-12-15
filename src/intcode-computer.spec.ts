import { expect } from 'chai';

import { initialState as initialStateForQuiz_day2_1022 } from './day2-1022-program-alarm.input-data';

import { buildInstruction, buildState, calculateNextState } from './intcode-computer';
import { solve_day2_1022_program_alarm_Quiz2 } from './day5-day-2-quiz-2.solution';
import { initialState as initialStateForQuiz1_day5_sunny } from './day5-sunny-with-a-chance.input-data';

describe('A - jump-if-true instruction', () => {
    it('A.1 - should jump to the next instruction with position mode', () => {
        const initialData = [5, 2, 5, 4, 99, 4];
        let output: number;
        const outputFunction = (o: number) => {
            output = o;
        };
        calculateNextState(initialData, null, outputFunction);
        expect(output).to.be.undefined;
    });
});

describe('B - checks if input is equal to 8 - from test examples in the description of the exercize', () => {
    it('B.1 - using postion mode finds that input is equal to 8', () => {
        // Start
        // |
        // 3,9,8,9,10,9,4,9,99,-1, 8
        //
        // 1) receives 8 as input
        //     |
        // 3,9,8,9,10,9,4,9,99, 8, 8

        // 2) opId=8  p1=state[9]=>8  p2=state[10]=>8
        //              |
        // 3,9,8,9,10,9,4,9,99, 1, 8

        // 3) opId=4  p1=state[9]=>1  output=>1
        //                   |
        // 3,9,8,9,10,9,4,9,99, 1, 8
        const initialData = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
        let output: number;
        const outputFunction = (o: number) => {
            output = o;
        };
        calculateNextState(initialData, [8], outputFunction);
        expect(output).to.equal(1);
        calculateNextState(initialData, [7], outputFunction);
        expect(output).to.equal(0);
        calculateNextState(initialData, [9], outputFunction);
        expect(output).to.equal(0);
    });
    it('B.2 - using postion mode finds that input is less than equal to 8', () => {
        const initialData = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
        let output: number;
        const outputFunction = (o: number) => {
            output = o;
        };
        calculateNextState(initialData, [8], outputFunction);
        expect(output).to.equal(0);
        calculateNextState(initialData, [7], outputFunction);
        expect(output).to.equal(1);
        calculateNextState(initialData, [9], outputFunction);
        expect(output).to.equal(0);
    });
    it('B.3 - using immediate mode finds that input is equal to 8', () => {
        const initialData = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
        let output: number;
        const outputFunction = (o: number) => {
            output = o;
        };
        calculateNextState(initialData, [8], outputFunction);
        expect(output).to.equal(1);
        calculateNextState(initialData, [7], outputFunction);
        expect(output).to.equal(0);
        calculateNextState(initialData, [9], outputFunction);
        expect(output).to.equal(0);
    });
    it('B.4 - using immediate mode finds that input is less than equal to 8', () => {
        const initialData = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
        let output: number;
        const outputFunction = (o: number) => {
            output = o;
        };
        calculateNextState(initialData, [8], outputFunction);
        expect(output).to.equal(0);
        calculateNextState(initialData, [7], outputFunction);
        expect(output).to.equal(1);
        calculateNextState(initialData, [9], outputFunction);
        expect(output).to.equal(0);
    });
});

describe('C - uses jump tests - from test examples in the description of the exercize', () => {
    it('C.1 - using postion mode finds that input is equal to 0 using jump tests', () => {
        //
        // Input = 0
        // |
        // 3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9
        //
        //      |
        // 3,12,6,12,15,1,13,14,13,4,13,99, 0,0,1,9
        //
        //                         |
        // 3,12,6,12,15,1,13,14,13,4,13,99, 0,0,1,9
        //
        //                               |
        // 3,12,6,12,15,1,13,14,13,4,13,99, 0,0,1,9

        const initialData = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
        let output: number;
        const outputFunction = (o: number) => {
            output = o;
        };
        calculateNextState(initialData, [0], outputFunction);
        expect(output).to.equal(0);
        calculateNextState(initialData, [1], outputFunction);
        expect(output).to.equal(1);
        calculateNextState(initialData, [9], outputFunction);
        expect(output).to.equal(1);
    });
    it('C.2 - using immediate mode finds that input is less than equal to 8', () => {
        const initialData = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
        let output: number;
        const outputFunction = (o: number) => {
            output = o;
        };
        calculateNextState(initialData, [0], outputFunction);
        expect(output).to.equal(0);
        calculateNextState(initialData, [1], outputFunction);
        expect(output).to.equal(1);
        calculateNextState(initialData, [9], outputFunction);
        expect(output).to.equal(1);
    });
});

describe(`D - larger example - from test examples in the description of the exercize
"uses an input instruction to ask for a single number. The program will then output 999 if the input value is below 8, 
output 1000 if the input value is equal to 8, or output 1001 if the input value is greater than 8."`, () => {
    it('D.1 - tests with different inputs', () => {
        const initialData = [
            3,
            21,
            1008,
            21,
            8,
            20,
            1005,
            20,
            22,
            107,
            8,
            21,
            20,
            1006,
            20,
            31,
            1106,
            0,
            36,
            98,
            0,
            0,
            1002,
            21,
            125,
            20,
            4,
            20,
            1105,
            1,
            46,
            104,
            999,
            1105,
            1,
            46,
            1101,
            1000,
            1,
            20,
            4,
            20,
            1105,
            1,
            46,
            98,
            99,
        ];
        let output: number;
        const outputFunction = (o: number) => {
            output = o;
        };
        calculateNextState(initialData, [0], outputFunction);
        expect(output).to.equal(999);
        calculateNextState(initialData, [8], outputFunction);
        expect(output).to.equal(1000);
        calculateNextState(initialData, [9], outputFunction);
        expect(output).to.equal(1001);
    });
});

describe('f - solution to quizs', () => {
    it('f.1 - solution to quiz 2', () => {
        let outputArray: number[] = [];
        const outputFunction = (o: number) => {
            outputArray.push(o);
        };
        calculateNextState(initialStateForQuiz1_day5_sunny, [5], outputFunction);
        expect(outputArray[outputArray.length - 1]).to.equal(6959377);
    });
});

//*******************************************************************************************************
//*****************  tests from first part of the  exercize which have to pass         ******************
//*****************  since this version of the computer is compatible with the previous one *************
//*******************************************************************************************************

describe(`tests from first part of the  exercize`, () => {
    describe('x - buildInstruction', () => {
        it('x.1 - should build a SUM instruction with all 3 parameter modes set to 0', () => {
            const instructionData = buildState([1, 2, 3, 4]);
            const instruction = buildInstruction(instructionData);
            expect(instruction.id).to.equal('01');
            expect(instruction.parameters.length).to.equal(3);
            instruction.parameters.forEach(pm => expect(pm.mode).to.equal('0'));
            expect(instruction.parameters[0].value).to.equal(2);
            expect(instruction.parameters[1].value).to.equal(3);
            expect(instruction.parameters[2].value).to.equal(4);
        });
        it('x.2 - should build a MUL instruction with some parameter modes set to 0 and some set to 1', () => {
            const instructionData = buildState([102, 2, 3, 4]);
            const instruction = buildInstruction(instructionData);
            expect(instruction.id).to.equal('02');
            expect(instruction.parameters.length).to.equal(3);
            expect(instruction.parameters[0].mode).to.equal('1');
            expect(instruction.parameters[1].mode).to.equal('0');
            expect(instruction.parameters[2].mode).to.equal('0');
            expect(instruction.parameters[0].value).to.equal(2);
            expect(instruction.parameters[1].value).to.equal(3);
            expect(instruction.parameters[2].value).to.equal(4);
        });
        it('x.3 - should build a SUM instruction with all 3 parameter modes set to 1', () => {
            const instructionData = buildState([11102, 2, 3, 4]);
            const instruction = buildInstruction(instructionData);
            expect(instruction.id).to.equal('02');
            expect(instruction.parameters.length).to.equal(3);
            instruction.parameters.forEach(pm => expect(pm.mode).to.equal('1'));
        });
    });
    describe('y - input instruction', () => {
        it('y.1 - should save input in the position specified in the ipunt instruction', () => {
            const input = [100];
            const initialData = [3, 0, 99];
            const expectedNextState = [100, 0, 99];
            const result = calculateNextState(initialData, input);
            assertEquals(expectedNextState, result);
        });
    });

    describe('z - output instruction', () => {
        it('z.1 - should output the input received', () => {
            const input = [100];
            const initialData = [3, 0, 4, 0, 99];
            let output: number;
            const outputFunction = (o: number) => {
                output = o;
            };
            calculateNextState(initialData, input, outputFunction);
            expect(output.toString()).to.equal(input.toString());
        });
    });

    describe('w - instruction with immediate mode parameters', () => {
        it('w.1 - should exit after the exectution of the instruction - example from the quiz description', () => {
            const initialData = [1002, 4, 3, 4, 33];
            const expectedNextState = [1002, 4, 3, 4, 99];
            const result = calculateNextState(initialData);
            assertEquals(expectedNextState, result);
        });
    });

    describe('t - instruction with parameters with negative values', () => {
        it('t.1 - should exit after the exectution of the instruction - example from the quiz description', () => {
            const initialData = [1101, 100, -1, 4, 0];
            const expectedNextState = [1101, 100, -1, 4, 99];
            const result = calculateNextState(initialData);
            assertEquals(expectedNextState, result);
        });
    });

    describe('f - solution to quizs', () => {
        it('f.1 - solution to quiz 1', () => {
            let outputArray: number[] = [];
            const outputFunction = (o: number) => {
                outputArray.push(o);
            };
            calculateNextState(initialStateForQuiz1_day5_sunny, [1], outputFunction);
            expect(outputArray[outputArray.length - 1]).to.equal(16348437);
        });
    });

    describe('f - solution to quizs', () => {
        it('f.1 - solution to quiz 1', () => {
            let outputArray: number[] = [];
            const outputFunction = (o: number) => {
                outputArray.push(o);
            };
            calculateNextState(initialStateForQuiz1_day5_sunny, [1], outputFunction);
            expect(outputArray[outputArray.length - 1]).to.equal(16348437);
        });
    });
});

//*******************************************************************************************************
//*****************  tests from day2 exercize which have to pass since this version    ******************
//*****************  of the computer is compatible with the previous one               ******************
//*******************************************************************************************************
describe(`tests from day2 exercize`, () => {
    describe('1 - calculate next state', () => {
        it('1.1 - calculates the next state for the first example', () => {
            const initialState = [1, 0, 0, 0, 99];
            const expectedNextState = [2, 0, 0, 0, 99];
            const result = calculateNextState(initialState);
            assertEquals(expectedNextState, result);
        });

        it('1.2 - calculates the next state for the second example', () => {
            const initialState = [2, 3, 0, 3, 99];
            const expectedNextState = [2, 3, 0, 6, 99];
            const result = calculateNextState(initialState);
            assertEquals(expectedNextState, result);
        });

        it('1.3 - calculates the next state for the third example', () => {
            const initialState = [2, 4, 4, 5, 99, 0];
            const expectedNextState = [2, 4, 4, 5, 99, 9801];
            const result = calculateNextState(initialState);
            assertEquals(expectedNextState, result);
        });

        it('1.4 - calculates the next state for the fourth example', () => {
            const initialState = [1, 1, 1, 4, 99, 5, 6, 0, 99];
            const expectedNextState = [30, 1, 1, 4, 2, 5, 6, 0, 99];
            const result = calculateNextState(initialState);
            assertEquals(expectedNextState, result);
        });

        it('1.5 - calculates the next state for the main example', () => {
            const initialState = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
            const expectedNextState = [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50];
            const result = calculateNextState(initialState);
            assertEquals(expectedNextState, result);
        });
    });

    describe('2 - solution to quizs', () => {
        it('2.1 - solution to quiz 1', () => {
            const result = calculateNextState(initialStateForQuiz_day2_1022);
            expect(result[0]).to.equal(466656);
        });
        it('2.2 - solution to quiz 2', () => {
            const solution = solve_day2_1022_program_alarm_Quiz2();
            expect(solution.noun).to.equal(89);
            expect(solution.verb).to.equal(76);
        });
    });
});

function assertEquals(expected: number[], actual: number[]) {
    actual.forEach((n, index) => expect(n).to.equal(expected[index], `error at position ${index}`));
}
