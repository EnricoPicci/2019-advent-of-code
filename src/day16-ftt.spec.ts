import { expect } from 'chai';

import {
    buildRepeatingPattern,
    buildRepeatingPatternMatrix,
    calculateOutputDigit,
    transform,
    calculateOutputAfterPhases,
    digitsAfterOffset,
    calculateOffset,
    calculateOutputDigit_,
    calculateOutputValue,
    transformWithBackwardSum,
    calculateOutputAfterPhasesConsideringOffset,
} from './day16-ftt';
import { FftInput } from './day16-fft.input-data';

describe('1 - buildRepeatingPattern', () => {
    it('1.1 - calculates the repeating pattern for position 1', () => {
        const rp = buildRepeatingPattern(1, 8);
        expect(rp.length).to.equal(8);
        [1, 0, -1, 0, 1, 0, -1, 0].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.2 - calculates the repeating pattern for position 2', () => {
        const rp = buildRepeatingPattern(2, 8);
        expect(rp.length).to.equal(8);
        [0, 1, 1, 0, 0, -1, -1, 0].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.3 - calculates the repeating pattern for position 3', () => {
        const rp = buildRepeatingPattern(3, 8);
        expect(rp.length).to.equal(8);
        [0, 0, 1, 1, 1, 0, 0, 0].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.4 - calculates the repeating pattern for position 4', () => {
        const rp = buildRepeatingPattern(4, 8);
        expect(rp.length).to.equal(8);
        [0, 0, 0, 1, 1, 1, 1, 0].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.5 - calculates the repeating pattern for position 5', () => {
        const rp = buildRepeatingPattern(5, 8);
        expect(rp.length).to.equal(8);
        [0, 0, 0, 0, 1, 1, 1, 1].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.6 - calculates the repeating pattern for position 6', () => {
        const rp = buildRepeatingPattern(6, 8);
        expect(rp.length).to.equal(8);
        [0, 0, 0, 0, 0, 1, 1, 1].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.7 - calculates the repeating pattern for position 7', () => {
        const rp = buildRepeatingPattern(7, 8);
        expect(rp.length).to.equal(8);
        [0, 0, 0, 0, 0, 0, 1, 1].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
    it('1.8 - calculates the repeating pattern for position 8', () => {
        const rp = buildRepeatingPattern(8, 8);
        expect(rp.length).to.equal(8);
        [0, 0, 0, 0, 0, 0, 0, 1].forEach((e, i) => expect(rp[i]).to.equal(e));
    });
});

describe('2 - buildRepeatingPatternMatrix', () => {
    it('2.1 - builds the repeating pattern matrix for an input of length 8', () => {
        const rpm = buildRepeatingPatternMatrix(8);
        expect(rpm.length).to.equal(8);
        const rp0 = rpm[0];
        [1, 0, -1, 0, 1, 0, -1, 0].forEach((e, i) => expect(rp0[i]).to.equal(e));
        const rp7 = rpm[7];
        [0, 0, 0, 0, 0, 0, 0, 1].forEach((e, i) => expect(rp7[i]).to.equal(e));
    });
});

describe('3 - calculateOutputDigit', () => {
    it('3.1 - calculates the first output digit from the first text example', () => {
        const rpm = buildRepeatingPatternMatrix(8);
        const rp0 = rpm[0];
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const outputDigit = calculateOutputDigit(input, rp0);
        expect(outputDigit).to.equal(4);
    });
    it('3.2 - calculates the second output digit from the first text example', () => {
        const rpm = buildRepeatingPatternMatrix(8);
        const rp1 = rpm[1];
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const outputDigit = calculateOutputDigit(input, rp1);
        expect(outputDigit).to.equal(8);
    });
    it('3.3 - calculates the last output digit from the first text example', () => {
        const rpm = buildRepeatingPatternMatrix(8);
        const rp7 = rpm[7];
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const outputDigit = calculateOutputDigit(input, rp7);
        expect(outputDigit).to.equal(8);
    });
});

describe('4 - transform', () => {
    it('4.1 - calculates the first phase transformation result from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const output = transform(input);
        buildArrayFromNumber(`48226158`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
});
describe('44 - calculateOutputDigit_', () => {
    it('44.1 - calculates the fourth output digit for the first transformation result from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const position = 3;
        const rpForDigit = buildRepeatingPattern(position, input.length);
        const outputValFromTransformationOfDigit = calculateOutputValue(input, rpForDigit);
        const outputDigit = calculateOutputDigit_(position, input, outputValFromTransformationOfDigit);
        expect(outputDigit).to.equal(2);
    });
    it('44.2 - calculates the fifth output digit for the second phase transformation result from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const position = 4;
        const rpForDigit = buildRepeatingPattern(position, input.length);
        const outputValFromTransformationOfDigit = calculateOutputValue(input, rpForDigit);
        const outputDigit = calculateOutputDigit_(position, input, outputValFromTransformationOfDigit);
        expect(outputDigit).to.equal(6);
    });
    it('44.3 - calculates the sixth output digit for the second phase transformation result from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const position = 5;
        const rpForDigit = buildRepeatingPattern(position, input.length);
        const outputValFromTransformationOfDigit = calculateOutputValue(input, rpForDigit);
        const outputDigit = calculateOutputDigit_(position, input, outputValFromTransformationOfDigit);
        expect(outputDigit).to.equal(1);
    });
    it('44.4 - calculates the seventh output digit for the second phase transformation result from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const position = 6;
        const rpForDigit = buildRepeatingPattern(position, input.length);
        const outputValFromTransformationOfDigit = calculateOutputValue(input, rpForDigit);
        const outputDigit = calculateOutputDigit_(position, input, outputValFromTransformationOfDigit);
        expect(outputDigit).to.equal(5);
    });
    it('44.5 - calculates the eigth output digit for the second phase transformation result from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const position = 7;
        const rpForDigit = buildRepeatingPattern(position, input.length);
        const outputValFromTransformationOfDigit = calculateOutputValue(input, rpForDigit);
        const outputDigit = calculateOutputDigit_(position, input, outputValFromTransformationOfDigit);
        expect(outputDigit).to.equal(8);
    });
});

describe('5 - calculateOutputAfterPhases', () => {
    it('5.1 - calculates the output after 2 phases from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const output = calculateOutputAfterPhases(input, 2);
        buildArrayFromNumber(`34040438`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
    it('5.2 - calculates the output after 3 phases from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const output = calculateOutputAfterPhases(input, 3);
        buildArrayFromNumber(`03415518`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
    it('5.3 - calculates the output after 4 phases from the first text example', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        const output = calculateOutputAfterPhases(input, 4);
        buildArrayFromNumber(`01029498`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
});

describe('6 - calculateOutputAfterPhases - second set of examples', () => {
    it('6.1 - calculates the output after 100 phases from the first example of the second set of examples from the text', () => {
        const input = buildArrayFromNumber(`80871224585914546619083218645595`);
        const output = calculateOutputAfterPhases(input, 100);
        buildArrayFromNumber(`24176176`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
    it('6.2 - calculates the output after 100 phases from the second example of the second set of examples from the text', () => {
        const input = buildArrayFromNumber(`19617804207202209144916044189917`);
        const output = calculateOutputAfterPhases(input, 100);
        buildArrayFromNumber(`73745418`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
    it('6.3 - calculates the output after 100 phases from the third example of the second set of examples from the text', () => {
        const input = buildArrayFromNumber(`69317163492948606335995924319873`);
        const output = calculateOutputAfterPhases(input, 100);
        buildArrayFromNumber(`52432133`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
});

describe('f - quizs', () => {
    it('f.1 - first quiz', () => {
        const input = buildArrayFromNumber(FftInput);
        const output = calculateOutputAfterPhases(input, 100);
        buildArrayFromNumber(`18933364`).forEach((e, i) => expect(output[i]).to.equal(e));
    });
});

describe('7 - calculateOffset and digitsAfterOffset', () => {
    it('7.1 - takes the 8 digits after the offset from the example in the text', () => {
        const digits = digitsAfterOffset(`98765432109876543210`, 7, 8);
        expect(digits).to.equal(`21098765`);
    });
    it('7.2 - takes the 8 digits after the offset using the first seven digits as the offset', () => {
        const input = `0000011109876543210`;
        const offset = calculateOffset(input, 7);
        const digits = digitsAfterOffset(input, offset, 8);
        expect(digits).to.equal(`76543210`);
    });
    it('7.3 - takes all the digits after the offset using the first seven digits as the offset', () => {
        const input = `0000011109876543210111`;
        const offset = calculateOffset(input, 7);
        const digits = digitsAfterOffset(input, offset);
        expect(digits).to.equal(`76543210111`);
    });
});

describe('8 - transformWithBackwardSum', () => {
    it(`8.1 - transform an input using the backward sum algorithm from the first example of the text
    The transformation works only for the second half`, () => {
        const input = `80871224585914546619083218645595`;
        const output = transformWithBackwardSum(buildArrayFromNumber(input));
        const secondHalfOfOutput = output.slice(output.length / 2);
        expect(secondHalfOfOutput.join('')).to.equal(`8265668532484945`);
    });
});

describe('9 - calculateOutputAfterPhasesConsideringOffset', () => {
    const tenThousands = 10000;
    it(`9.1 - calculates the output for the first example with 10.000 repetitions`, () => {
        const input = `03036732577212944063491565474664`.repeat(tenThousands);
        const output = calculateOutputAfterPhasesConsideringOffset(input, 100);
        const first8Digits = output.slice(0, 8);
        expect(first8Digits.join('')).to.equal(`84462026`);
    });
    it(`9.2 - calculates the output for the second example with 10.000 repetitions`, () => {
        const input = `02935109699940807407585447034323`.repeat(tenThousands);
        const output = calculateOutputAfterPhasesConsideringOffset(input, 100);
        const first8Digits = output.slice(0, 8);
        expect(first8Digits.join('')).to.equal(`78725270`);
    });
    it(`9.3 - calculates the output for the third example with 10.000 repetitions`, () => {
        const input = `03081770884921959731165446850517`.repeat(tenThousands);
        const output = calculateOutputAfterPhasesConsideringOffset(input, 100);
        const first8Digits = output.slice(0, 8);
        expect(first8Digits.join('')).to.equal(`53553731`);
    });
});

describe('g - quizs', () => {
    it('g.1 - second quiz', () => {
        const tenThousands = 10000;
        const input = FftInput.repeat(tenThousands);
        const output = calculateOutputAfterPhasesConsideringOffset(input, 100);
        const first8Digits = output.slice(0, 8);
        expect(first8Digits.join('')).to.equal(`53553731`);
    });
});

describe('k - test buildRepeatingPatternMatrix', () => {
    // it.only('k.1 - print the repeatingPatternMatrix for some data', () => {
    //     const rpm = buildRepeatingPatternMatrix(42);
    //     printMatrix(rpm);
    // });
    // it('k.2 - print the transformation results starting for some data repeated', () => {
    //     const input = `0123456789`;
    //     const inputRepeated = input.repeat(40);
    //     const inputRepeatedAsArrayOfNumbers = buildArrayFromNumber(inputRepeated);
    //     const output = calculateOutputAfterPhases(inputRepeatedAsArrayOfNumbers, 1);
    //     console.log(output.join(''));
    // });
});
// function printMatrix(matrix: number[][]) {
//     matrix.forEach((rp, i) => console.log(rp.map(d => (d === -1 ? '9' : d)).join('') + '    ' + i));
// }

function buildArrayFromNumber(n: string) {
    return n.split('').map(d => parseInt(d));
}
