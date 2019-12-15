import { expect } from 'chai';
import { chainAmplifierControllers, permutation, findMaxThrustSignal } from './day7-amplification-circuit';
import { InputData } from './day7-amplification-circuit.input-data';

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
        expect(thrusterSignal).to.equal(43210);
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
        expect(thrusterSignal).to.equal(54321);
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
        expect(thrusterSignal).to.equal(65210);
    });
});

describe('f - solution to quizs', () => {
    it('f.1 - solution to quiz 1', () => {
        const maxSignal = findMaxThrustSignal([0, 1, 2, 3, 4], InputData, 0);
        expect(maxSignal).to.equal(929800);
    }).timeout(60000);
});
