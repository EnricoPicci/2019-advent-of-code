import { chunkString } from "./utils";

export function numberOfLayers(imageWidth: number, imageHeight: number, inputData: string) {
    const inputDataLength = inputData.length;
    const imageSize = imageWidth * imageHeight;
    const modulo = inputDataLength % imageSize;
    if (modulo !== 0) {
        throw new Error(`Input data lenght ${inputDataLength} is not compatible with image width ${imageWidth} and
        heigth ${imageHeight} since it can not be divided in a integer number of layers`);
    }
    return inputDataLength / imageSize;
}

function layers(imageWidth: number, imageHeight: number, inputData: string) {
    return chunkString(inputData, imageWidth * imageHeight);
}
export function layerWithMinNumberOfDigitOccurrences(
    digit: string,
    imageWidth: number,
    imageHeight: number,
    inputData: string,
) {
    const _layers = layers(imageWidth, imageHeight, inputData);
    let minOccurrences = _layers.reduce((min, val) => (min = Math.min(min, numberOfOccurences(val, digit))), Infinity);
    const layersWithMinDigitOccurrences = _layers.filter(l => numberOfOccurences(l, digit) === minOccurrences);
    if (layersWithMinDigitOccurrences.length > 1) {
        throw new Error(`There are ${layersWithMinDigitOccurrences.length} layers with equal min number of digits
        equal to ${minOccurrences}`);
    }
    if (layersWithMinDigitOccurrences.length < 1) {
        throw new Error(`The case of not finding any layer with min number of digit occurrences should never occur`);
    }
    return layersWithMinDigitOccurrences[0];
}

function numberOfOccurences(stringToSearch: string, element: string) {
    return (stringToSearch.match(new RegExp(element, 'g')) || []).length;
}

export function occOf1MultOccOf2ForLayerWithMinOccOf0(imageWidth: number, imageHeight: number, inputData: string) {
    const layer = layerWithMinNumberOfDigitOccurrences('0', imageWidth, imageHeight, inputData);
    const occurrencesOf1 = numberOfOccurences(layer, '1');
    const occurrencesOf2 = numberOfOccurences(layer, '2');
    return occurrencesOf1 * occurrencesOf2;
}

export function decodedImagePixels(imageWidth: number, imageHeight: number, inputData: string) {
    const _layers = layers(imageWidth, imageHeight, inputData);
    const imageSize = _layers[0].length;
    const imagePixels = [];
    for (let i = 0; i < imageSize; i++) {
        imagePixels[i] = _layers.map(l => l[i]);
    }
    return imagePixels;
}

export function decodedImage(imageWidth: number, imageHeight: number, inputData: string) {
    const imagePixels = decodedImagePixels(imageWidth, imageHeight, inputData);
    return imagePixels.map(pxs => pxs.find(p => p === '0' || p === '1') || '2');
}

export function decodedImageToStrings(imageWidth: number, imageHeight: number, inputData: string) {
    const _decodedImage = decodedImage(imageWidth, imageHeight, inputData)
        .map(c => (c === '1' ? '1' : ' '))
        .join('');
    return chunkString(_decodedImage, imageWidth);
}
