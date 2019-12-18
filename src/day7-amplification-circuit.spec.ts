import { expect } from 'chai';
import { chainAmplifierControllers, permutation, findMaxThrustSignal } from './day7-amplification-circuit';
import { InputData } from './day7-amplification-circuit.input-data';
import { calculateNextState } from './intcode-computer';

describe('0 - chain amplifiers step by step', () => {
    it('0.1 - chain the amplifiers using the data of the first example taken from the description of the exercize', () => {
        const phaseSettings = [4, 3, 2, 1, 0];
        const initialData = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];

        const outputStream: number[] = [];
        const outputFunction = (o: number) => {
            outputStream.push(o);
        };
        calculateNextState(initialData, [phaseSettings[0], 0], outputFunction);
        calculateNextState(initialData, [phaseSettings[1], outputStream[outputStream.length - 1]], outputFunction);
        calculateNextState(initialData, [phaseSettings[2], outputStream[outputStream.length - 1]], outputFunction);
        calculateNextState(initialData, [phaseSettings[3], outputStream[outputStream.length - 1]], outputFunction);
        calculateNextState(initialData, [phaseSettings[4], outputStream[outputStream.length - 1]], outputFunction);
        expect(outputStream[outputStream.length - 1]).to.equal(43210);
        console.log('Final result', outputStream[outputStream.length - 1]);
    });
});

describe('1 - chainAmplifierControllers - examples taken from the description of the exercize', () => {
    it('1.1 - should solve the first example', () => {
        const phaseSettings = [4, 3, 2, 1, 0];
        const initialData = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
        const thrusterSignal = chainAmplifierControllers(phaseSettings, initialData, 0);
        expect(thrusterSignal).to.equal(43210);
    });
    it('1.2 - should solve the second example', () => {
        const phaseSettings = [0, 1, 2, 3, 4];
        const initialData = [
            3,
            23,
            3,
            24,
            1002,
            24,
            10,
            24,
            1002,
            23,
            -1,
            23,
            101,
            5,
            23,
            23,
            1,
            24,
            23,
            23,
            4,
            23,
            99,
            0,
            0,
        ];
        const thrusterSignal = chainAmplifierControllers(phaseSettings, initialData, 0);
        expect(thrusterSignal).to.equal(54321);
    });
    it('1.3 - should solve the third example', () => {
        const phaseSettings = [1, 0, 4, 3, 2];
        const initialData = [
            3,
            31,
            3,
            32,
            1002,
            32,
            10,
            32,
            1001,
            31,
            -2,
            31,
            1007,
            31,
            0,
            33,
            1002,
            33,
            7,
            33,
            1,
            33,
            31,
            31,
            1,
            32,
            31,
            31,
            4,
            31,
            99,
            0,
            0,
            0,
        ];
        const thrusterSignal = chainAmplifierControllers(phaseSettings, initialData, 0);
        expect(thrusterSignal).to.equal(65210);
    });
});

describe('2 - permutations', () => {
    it('2.1 - permutations of and array of 1 numbers should be 1', () => {
        const _permuataions = permutation([0]);
        expect(_permuataions.length).to.equal(1);
    });
    it('2.2 - permutations of and array of 2 numbers should be 2', () => {
        const _permuataions = permutation([0, 1]);
        expect(_permuataions.length).to.equal(2);
    });
    it('2.3 - permutations of and array of 3 numbers should be 6', () => {
        const _permuataions = permutation([0, 1, 2]);
        expect(_permuataions.length).to.equal(6);
    });
    it('2.4 - permutations of and array of 4 numbers should be 24', () => {
        const _permuataions = permutation([0, 1, 2, 3]);
        expect(_permuataions.length).to.equal(24);
        const onePermutationAsString = [2, 0, 3, 1].toString();
        expect(_permuataions.find(p => p.toString() === onePermutationAsString)).to.be.not.undefined;
    });
});

describe('3 - findMaxThrustSignal - try every combination to find the max thruster signal', () => {
    it('3.1 - should solve the first example', () => {
        const phaseSettings = [4, 3, 2, 1, 0];
        const initialData = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
        const thrusterSignal = findMaxThrustSignal(phaseSettings, initialData, 0);
        expect(thrusterSignal.signal).to.equal(43210);
    });
    it('3.2 - should solve the second example', () => {
        const phaseSettings = [0, 1, 2, 3, 4];
        const initialData = [
            3,
            23,
            3,
            24,
            1002,
            24,
            10,
            24,
            1002,
            23,
            -1,
            23,
            101,
            5,
            23,
            23,
            1,
            24,
            23,
            23,
            4,
            23,
            99,
            0,
            0,
        ];
        const thrusterSignal = findMaxThrustSignal(phaseSettings, initialData, 0);
        expect(thrusterSignal.signal).to.equal(54321);
    });
    it('3.3 - should solve the third example', () => {
        const phaseSettings = [1, 0, 4, 3, 2];
        const initialData = [
            3,
            31,
            3,
            32,
            1002,
            32,
            10,
            32,
            1001,
            31,
            -2,
            31,
            1007,
            31,
            0,
            33,
            1002,
            33,
            7,
            33,
            1,
            33,
            31,
            31,
            1,
            32,
            31,
            31,
            4,
            31,
            99,
            0,
            0,
            0,
        ];
        const thrusterSignal = findMaxThrustSignal(phaseSettings, initialData, 0);
        expect(thrusterSignal.signal).to.equal(65210);
    });
});

describe('f - solution to quizs', () => {
    it('f.1 - solution to quiz 1', () => {
        const maxSignal = findMaxThrustSignal([0, 1, 2, 3, 4], InputData, 0);
        expect(maxSignal.signal).to.equal(929800);
    }).timeout(60000);
});

//******************************************************************************************************************
//*****************************    PART 2           ****************************************************************
//******************************************************************************************************************

describe('A - chainAmplifierControllers - examples taken from the description of the exercize in part 2', () => {
    it('A.1 - should solve the first example of part 2', () => {
        const phaseSettings = [9, 8, 7, 6, 5];
        const initialData = [
            3,
            26,
            1001,
            26,
            -4,
            26,
            3,
            27,
            1002,
            27,
            2,
            27,
            1,
            27,
            26,
            27,
            4,
            27,
            1001,
            28,
            -1,
            28,
            1005,
            28,
            6,
            99,
            0,
            0,
            5,
        ];
        const thrusterSignal = findMaxThrustSignal(phaseSettings, initialData, 0);
        console.log('settings for max signal for example 1', thrusterSignal.phaseSettings);
        expect(thrusterSignal.signal).to.equal(139629729);
    });
    it('A.2 - should solve the second example of part 2', () => {
        const phaseSettings = [9, 7, 8, 5, 6];
        const initialData = [
            3,
            52,
            1001,
            52,
            -5,
            52,
            3,
            53,
            1,
            52,
            56,
            54,
            1007,
            54,
            5,
            55,
            1005,
            55,
            26,
            1001,
            54,
            -5,
            54,
            1105,
            1,
            12,
            1,
            53,
            54,
            53,
            1008,
            54,
            0,
            55,
            1001,
            55,
            1,
            55,
            2,
            53,
            55,
            53,
            4,
            53,
            1001,
            56,
            -1,
            56,
            1005,
            56,
            6,
            99,
            0,
            0,
            0,
            0,
            10,
        ];
        const thrusterSignal = findMaxThrustSignal(phaseSettings, initialData, 0);
        console.log('settings for max signal for example 2', thrusterSignal.phaseSettings);
        expect(thrusterSignal.signal).to.equal(18216);
    });
});

describe('X - chainAmplifierControllers - examples taken from the description of the exercize in part 2', () => {

    it('X.0 - first part of the execution with SW from the second example of part 2', () => {
        const outputLog: number[] = [];
        const outputFunctionGenerator = ((_outputLog: number[]) => {
            return (output: number[]) => {
                return (o: number) => {
                    output.push(o);
                    outputLog.push(o);
                    if (output.length > 1) {
                        console.log('output.length', output.length);
                    }
                };
            };
        })(outputLog);
        const phaseSettings = [5, 6, 7, 8, 9];
        const initialData = [
            3,
            52,
            1001,
            52,
            -5,
            52,
            3,
            53,
            1,
            52,
            56,
            54,
            1007,
            54,
            5,
            55,
            1005,
            55,
            26,
            1001,
            54,
            -5,
            54,
            1105,
            1,
            12,
            1,
            53,
            54,
            53,
            1008,
            54,
            0,
            55,
            1001,
            55,
            1,
            55,
            2,
            53,
            55,
            53,
            4,
            53,
            1001,
            56,
            -1,
            56,
            1005,
            56,
            6,
            99,
            0,
            0,
            0,
            0,
            10,
        ];
        let output = [];
        const s0 = calculateNextState(initialData, [phaseSettings[0]], outputFunctionGenerator(output));
        const s1 = calculateNextState(s0.state, [0], outputFunctionGenerator(output), s0.instructionPointer);
        console.log('state after 2 executions', s1);
    });
});

describe('g - solution to quizs', () => {
    it('g.1 - solution to quiz 2', () => {
        const maxSignal = findMaxThrustSignal([9, 8, 7, 6, 5], InputData, 0);
        expect(maxSignal.signal).to.equal(15432220);
    }).timeout(60000);
});
