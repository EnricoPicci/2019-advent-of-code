import { expect } from 'chai';

import {
    buildRepeatingPattern,
    buildRepeatingPatternMatrix,
    calculateOutputDigit,
    transform,
    calculateOutputAfterPhases,
    digitsAfterOffset,
} from './day16-ftt';
import { FftInput } from './day16-fft.input-data';

describe('1 - buildRepeatingPattern', () => {
    const BASE_PATTERN = [0, 1, 0, -1];
    it('1.1 - calculates the repeating pattern for position 1', () => {
        const rp = buildRepeatingPattern(1, 8, BASE_PATTERN);
        expect(rp.length).to.equal(8);
        [1, 0, -1, 0, 1, 0, -1, 0].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.2 - calculates the repeating pattern for position 2', () => {
        const rp = buildRepeatingPattern(2, 8, BASE_PATTERN);
        expect(rp.length).to.equal(8);
        [0, 1, 1, 0, 0, -1, -1, 0].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.3 - calculates the repeating pattern for position 3', () => {
        const rp = buildRepeatingPattern(3, 8, BASE_PATTERN);
        expect(rp.length).to.equal(8);
        [0, 0, 1, 1, 1, 0, 0, 0].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.4 - calculates the repeating pattern for position 4', () => {
        const rp = buildRepeatingPattern(4, 8, BASE_PATTERN);
        expect(rp.length).to.equal(8);
        [0, 0, 0, 1, 1, 1, 1, 0].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.5 - calculates the repeating pattern for position 5', () => {
        const rp = buildRepeatingPattern(5, 8, BASE_PATTERN);
        expect(rp.length).to.equal(8);
        [0, 0, 0, 0, 1, 1, 1, 1].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.6 - calculates the repeating pattern for position 6', () => {
        const rp = buildRepeatingPattern(6, 8, BASE_PATTERN);
        expect(rp.length).to.equal(8);
        [0, 0, 0, 0, 0, 1, 1, 1].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.7 - calculates the repeating pattern for position 7', () => {
        const rp = buildRepeatingPattern(7, 8, BASE_PATTERN);
        expect(rp.length).to.equal(8);
        [0, 0, 0, 0, 0, 0, 1, 1].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.8 - calculates the repeating pattern for position 8', () => {
        const rp = buildRepeatingPattern(8, 8, BASE_PATTERN);
        expect(rp.length).to.equal(8);
        [0, 0, 0, 0, 0, 0, 0, 1].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
});

describe('2 - buildRepeatingPatternMatrix', () => {
    const BASE_PATTERN = [0, 1, 0, -1];
    it('2.1 - builds the repeating pattern matrix for an input of length 8', () => {
        const rpm = buildRepeatingPatternMatrix(8, BASE_PATTERN);
        expect(rpm.length).to.equal(8);
        const rp0 = rpm[0];
        [1, 0, -1, 0, 1, 0, -1, 0].forEach((e, i) => expect(rp0[i]).to.equal(e));
        const rp7 = rpm[7];
        [0, 0, 0, 0, 0, 0, 0, 1].forEach((e, i) => expect(rp7[i]).to.equal(e));
    });
});

describe('3 - calculateOutputDigit', () => {
    const BASE_PATTERN = [0, 1, 0, -1];
    it('3.1 - calculates the first output digit from the first text example', () => {
        const rpm = buildRepeatingPatternMatrix(8, BASE_PATTERN);
        const rp0 = rpm[0];
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const outputDigit = calculateOutputDigit(input, rp0);
        expect(outputDigit).to.equal(4);
    });
    it('3.2 - calculates the second output digit from the first text example', () => {
        const rpm = buildRepeatingPatternMatrix(8, BASE_PATTERN);
        const rp1 = rpm[1];
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const outputDigit = calculateOutputDigit(input, rp1);
        expect(outputDigit).to.equal(8);
    });
    it('3.3 - calculates the last output digit from the first text example', () => {
        const rpm = buildRepeatingPatternMatrix(8, BASE_PATTERN);
        const rp7 = rpm[7];
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const outputDigit = calculateOutputDigit(input, rp7);
        expect(outputDigit).to.equal(8);
    });
});

describe('4 - transform', () => {
    const BASE_PATTERN = [0, 1, 0, -1];
    it('4.1 - calculates the first phase transformation result from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const output = transform(input, BASE_PATTERN);
        [4, 8, 2, 2, 6, 1, 5, 8].forEach((e, i) => expect(output[i]).to.equal(e));
    });
});

describe('5 - calculateOutputAfterPhases', () => {
    const BASE_PATTERN = [0, 1, 0, -1];
    it('5.1 - calculates the output after 2 phases from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const output = calculateOutputAfterPhases(input, BASE_PATTERN, 2);
        buildArrayFromNumber(`34040438`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
    it('5.2 - calculates the output after 3 phases from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const output = calculateOutputAfterPhases(input, BASE_PATTERN, 3);
        buildArrayFromNumber(`03415518`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
    it('5.3 - calculates the output after 4 phases from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const output = calculateOutputAfterPhases(input, BASE_PATTERN, 4);
        buildArrayFromNumber(`01029498`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
});

describe('6 - calculateOutputAfterPhases - second set of examples', () => {
    const BASE_PATTERN = [0, 1, 0, -1];
    it('6.1 - calculates the output after 100 phases from the first example of the second set of examples from the text', () => {
        const input = buildArrayFromNumber(`80871224585914546619083218645595`);
        const output = calculateOutputAfterPhases(input, BASE_PATTERN, 100);
        buildArrayFromNumber(`24176176`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
    it('6.2 - calculates the output after 100 phases from the second example of the second set of examples from the text', () => {
        const input = buildArrayFromNumber(`19617804207202209144916044189917`);
        const output = calculateOutputAfterPhases(input, BASE_PATTERN, 100);
        buildArrayFromNumber(`73745418`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
    it('6.3 - calculates the output after 100 phases from the third example of the second set of examples from the text', () => {
        const input = buildArrayFromNumber(`69317163492948606335995924319873`);
        const output = calculateOutputAfterPhases(input, BASE_PATTERN, 100);
        buildArrayFromNumber(`52432133`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
});

describe('f - quizs', () => {
    const BASE_PATTERN = [0, 1, 0, -1];
    it('f.1 - first quiz', () => {
        const input = buildArrayFromNumber(FftInput);
        const output = calculateOutputAfterPhases(input, BASE_PATTERN, 100);
        buildArrayFromNumber(`18933364`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
});

describe('7 - digitsAfterOffset', () => {
    it('7.1 - calculates the 8 digits after the offse from the example in the text', () => {
        const digits = digitsAfterOffset(`98765432109876543210`, 7, 8);
        expect(digits).to.equal(`21098765`);
    });
});

describe('k - test buildRepeatingPatternMatrix', () => {
    const BASE_PATTERN = [0, 1, 0, -1];
    it.only('k.1 - print the repeatingPatternMatrix for some data', () => {
        const rpm = buildRepeatingPatternMatrix(100, BASE_PATTERN);
        printMatrix(rpm);
    });
});

function buildArrayFromNumber(n: string) {
    return n.split('').map(d => parseInt(d));
}

function printMatrix(matrix: number[][]) {
    matrix.forEach(rp => console.log(rp.map(d => (d === -1 ? '9' : d)).join('')));
}
