// const BASE_PATTERN = [0,1,0,-1]

export function buildRepeatingPattern(position: number, outputLength: number) {
    if (position < 0) {
        throw new Error(`Position must be positive`);
    }
    if (position > outputLength) {
        throw new Error(`Position can not be bigger than outputLength`);
    }
    const rp: number[] = [];
    let counter = { counter: position - 1 };
    for (let i = 0; i < counter.counter; i++) {
        rp.push(0);
    }
    while (true) {
        addDigits(position, outputLength, 1, rp);
        addDigits(position, outputLength, 0, rp);
        addDigits(position, outputLength, -1, rp);
        addDigits(position, outputLength, 0, rp);
        if (rp.length === outputLength) {
            return rp;
        }
    }
}
function addDigits(numberOfTimes: number, outputLength: number, digit: number, rp: number[]) {
    for (let j = 0; j < numberOfTimes; j++) {
        if (rp.length === outputLength) {
            return rp;
        }
        rp.push(digit);
    }
}

export function buildRepeatingPatternMatrix(outputLength: number) {
    const matrix: number[][] = [];
    for (let i = 0; i < outputLength; i++) {
        matrix.push(buildRepeatingPattern(i + 1, outputLength));
    }
    return matrix;
}

export function calculateOutputValue(input: number[], repeatingPattern: number[]) {
    const multiplications: number[] = [];
    repeatingPattern.forEach((rpd, i) => {
        if (rpd) {
            multiplications.push(input[i] * rpd);
        }
    });
    return multiplications.reduce((res, val) => res + val, 0);
}
export function calculateOutputDigit(input: number[], repeatingPattern: number[]) {
    const vectorMulResult = calculateOutputValue(input, repeatingPattern);
    return Math.abs(vectorMulResult % 10);
}
export function calculateOutputDigit_(position: number, input: number[], previousVectorMultValue: number) {
    const inputLength = input.length;
    let outputValue = previousVectorMultValue;
    let counter = 0;
    let iteration = 0;
    while (true) {
        for (let i = 0; i < iteration + 1; i++) {
            counter = (iteration + 1) * position - 1 + i;
            if (counter >= inputLength) {
                return Math.abs(outputValue % 10);
            }
            const operationId = iteration % 4;
            const operation = operations[operationId];
            outputValue = operation(outputValue, input[counter]);
        }
        iteration++;
    }
}
const operations = [
    (outVal, inVal) => outVal - inVal,
    (outVal, inVal) => outVal + inVal,
    (outVal, inVal) => outVal + inVal,
    (outVal, inVal) => outVal - inVal,
];

export function transform_(input: number[]) {
    const outputLength = input.length;
    const output: number[] = [];
    for (let i = 0; i < outputLength; i++) {
        const rp = buildRepeatingPattern(i + 1, outputLength);
        const outputDigit = calculateOutputDigit(input, rp);
        output.push(outputDigit);
    }
    return output;
}
export function transform(input: number[]) {
    const outputLength = input.length;
    const output: number[] = [];
    //
    let rp = buildRepeatingPattern(1, outputLength);
    let outputDigit = calculateOutputDigit(input, rp);
    output.push(outputDigit);
    //
    rp = buildRepeatingPattern(2, outputLength);
    outputDigit = calculateOutputDigit(input, rp);
    output.push(outputDigit);
    //
    rp = buildRepeatingPattern(3, outputLength);
    outputDigit = calculateOutputDigit(input, rp);
    output.push(outputDigit);
    //
    rp = buildRepeatingPattern(4, outputLength);
    outputDigit = calculateOutputDigit(input, rp);
    output.push(outputDigit);
    //
    rp = buildRepeatingPattern(5, outputLength);
    let outputValFromTransformationOfDigit = calculateOutputValue(input, rp);
    outputDigit = calculateOutputDigit(input, rp);
    output.push(outputDigit);
    //
    for (let i = 5; i < outputLength; i++) {
        const position = i;
        const rp = buildRepeatingPattern(position, outputLength);
        outputValFromTransformationOfDigit = calculateOutputValue(input, rp);
        const outputDigit = calculateOutputDigit_(position, input, outputValFromTransformationOfDigit);
        output.push(outputDigit);
    }
    return output;
}

export function calculateOutputAfterPhases(input: number[], numberOfPhases: number, log = false) {
    let _input = input;
    let _output: number[];
    for (let i = 0; i < numberOfPhases; i++) {
        _output = transform(_input);
        if (log) {
            console.log(_output.join('') + '   ' + i);
        }
        _input = _output;
    }
    return _output;
}

export function calculateOffset(data: string, numberOfDigitsForTheOffset: number) {
    const offsetAsString = data.slice(0, numberOfDigitsForTheOffset);
    return parseInt(offsetAsString);
}
export function digitsAfterOffset(data: string, offset: number, numberOfDigits?: number) {
    numberOfDigits = numberOfDigits ? numberOfDigits : data.length - offset;
    const dataAsString = data.split('');
    const digits = dataAsString.slice(offset, offset + numberOfDigits);
    return digits.join('');
}

export function transformWithBackwardSum(input: number[]) {
    const inputLength = input.length;
    const lastDigit = input[inputLength - 1];
    const outputAsDigitArray: number[] = [lastDigit];
    let lastVal = lastDigit;
    for (let i = 1; i < inputLength; i++) {
        const nextVal = (lastVal + input[inputLength - i - 1]) % 10;
        lastVal = nextVal;
        outputAsDigitArray.push(nextVal);
    }
    return outputAsDigitArray.reverse();
}

export function calculateOutputAfterPhasesConsideringOffset(input: string, numberOfPhases: number, log = false) {
    const offset = calculateOffset(input, 7);
    console.log(input.length);
    const _digits = digitsAfterOffset(input, offset);
    let _input = _digits.split('').map(d => parseInt(d));
    let _output: number[];
    for (let i = 0; i < numberOfPhases; i++) {
        _output = transformWithBackwardSum(_input);
        if (log) {
            console.log(_output.join('') + '   ' + i);
        }
        _input = _output;
    }
    return _output;
}
