import { expect } from 'chai';
import {
    numberOfLayers,
    layerWithMinNumberOfDigitOccurrences,
    occOf1MultOccOf2ForLayerWithMinOccOf0,
    decodedImagePixels as decodeImagePixels,
    decodedImage,
} from './day8-space-image-format';
import { InputData } from './day8-space-image-format.input-data';

describe('0 - numberOfLayers', () => {
    it('0.1 - the number of layers defined by a string long 24 chars for an image 3 * 4 should be 2', () => {
        const inputData = '012345678901234567890123';
        const width = 3;
        const height = 4;

        expect(numberOfLayers(width, height, inputData)).to.equal(2);
    });
    it(`0.2 - it is not possible to calculate the number of layers 
    defined by a string long 25 chars for an image 3 * 4 should be 2`, () => {
        const inputData = '0123456789012345678901235';
        const width = 3;
        const height = 4;

        expect(() => numberOfLayers(width, height, inputData)).to.throw();
    });
});

describe('1 - layerWithMinNumberOfDigitOccurrences', () => {
    it(`1.0 - the fist layer contain 2 occurrences of 0 while layer 2 contains 3 occurrence of 0 
    so the one to be chosed is the first 1`, () => {
        const digit = '0';
        const layer1 = '012345678901';
        const layer2 = '112005678910';
        const inputData = layer1 + layer2;
        const width = 3;
        const height = 4;

        expect(layerWithMinNumberOfDigitOccurrences(digit, width, height, inputData)).to.equal(layer1);
    });
    it('1.1 - the second layer does not contain any 0 so is the one to be chosed', () => {
        const digit = '0';
        const layer1 = '012345678901';
        const layer2 = '112345678911';
        const inputData = layer1 + layer2;
        const width = 3;
        const height = 4;

        expect(layerWithMinNumberOfDigitOccurrences(digit, width, height, inputData)).to.equal(layer2);
    });
    it(`1.2 - both layers contain the same amount of occurrencs of 0`, () => {
        const digit = '0';
        const layer1 = '012345678901';
        const layer2 = layer1;
        const inputData = layer1 + layer2;
        const width = 3;
        const height = 4;

        expect(() => layerWithMinNumberOfDigitOccurrences(digit, width, height, inputData)).to.throw();
    });
});

describe('2 - occOf1MultOccOf2ForLayerWithMinOccOf0', () => {
    it(`2.1 - there are 4 occurrences of 1 and 1 occurrence of 2 in the layer with less occurrences of 0
    so the expected result is 4`, () => {
        const layer1 = '012345678901';
        const layer2 = '112345678911';
        const inputData = layer1 + layer2;
        const width = 3;
        const height = 4;

        expect(occOf1MultOccOf2ForLayerWithMinOccOf0(width, height, inputData)).to.equal(4);
    });
});

describe('f - solution of quizs', () => {
    it(`f.1 - solution of quiz of part1`, () => {
        const width = 25;
        const height = 6;

        expect(occOf1MultOccOf2ForLayerWithMinOccOf0(width, height, InputData)).to.equal(2413);
    });
});

describe('x - decodeImagePixels', () => {
    it(`x.1 - the image pixels should have the same length of any layer of the image data`, () => {
        const layer1 = '012012012012';
        const layer2 = layer1;
        const inputData = layer1 + layer2;
        const width = 3;
        const height = 4;

        expect(decodeImagePixels(width, height, inputData).length).to.equal(layer1.length);
    });
    it(`x.2 - the image has 2 layers so the image pixels should have a depth of 2`, () => {
        const layer1 = '012012012012';
        const layer2 = layer1;
        const inputData = layer1 + layer2;
        const width = 3;
        const height = 4;

        const _decodedImagePixels = decodeImagePixels(width, height, inputData);
        _decodedImagePixels.forEach(d => expect(d.length).to.equal(2));
        expect(_decodedImagePixels[0].join('')).to.equal('00');
        expect(_decodedImagePixels[1].join('')).to.equal('11');
        expect(_decodedImagePixels[2].join('')).to.equal('22');
    });
});

describe('y - decodedImage', () => {
    it(`y.1 - since all layers are the same, the decoded image should be the same as any layer`, () => {
        const layer = '012012012012';
        const inputData = layer + layer + layer + layer;
        const width = 3;
        const height = 4;

        const _decodedImage = decodedImage(width, height, inputData);
        expect(_decodedImage.join('')).to.equal(layer);
    });
    it(`y.2 - since the last layer has all 1s than all transparencies of above layers are turned to 1`, () => {
        const layer = '012012012012';
        const lastLayer = '111111111111';
        const expectedImage = '011011011011';
        const inputData = layer + layer + layer + lastLayer;
        const width = 3;
        const height = 4;

        const _decodedImage = decodedImage(width, height, inputData);
        expect(_decodedImage.join('')).to.equal(expectedImage);
    });
});
