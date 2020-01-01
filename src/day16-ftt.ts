// const BASE_PATTERN = [0,1,0,-1]

export function buildRepeatingPattern(position: number, outputLength: number, basePattern: number[]) {
    if (position < 0) {
        throw new Error(`Position must be positive`);
    }
    if (position > outputLength) {
        throw new Error(`Position can not be bigger than outputLength`);
    }
    const basePatternLength = basePattern.length;
    let repeatingPattern: number[] = [];
    let numberOfPatternRepeatiions = 0;
    let repeatingPatternIndex = 0;
    let positionInBasePattern: number;
    while (true) {
        positionInBasePattern =
            numberOfPatternRepeatiions - Math.floor(numberOfPatternRepeatiions / basePatternLength) * basePatternLength;
        for (let i = 0; i < position; i++) {
            const patternDigit = basePattern[positionInBasePattern];
            repeatingPattern.push(patternDigit);
            repeatingPatternIndex++;
            if (repeatingPatternIndex > outputLength) {
                repeatingPattern.shift();
                return repeatingPattern;
            }
        }
        numberOfPatternRepeatiions++;
    }
}

export function buildRepeatingPatternMatrix(outputLength: number, basePattern: number[]) {
    const matrix: number[][] = [];
    for (let i = 0; i < outputLength; i++) {
        matrix.push(buildRepeatingPattern(i + 1, outputLength, basePattern));
    }
    return matrix;
}

export function calculateOutputDigit(input: number[], repeatingPattern: number[]) {
    const multResult = input.map((iDigit, i) => iDigit * repeatingPattern[i]);
    const vectorMulResult = multResult.reduce((res, val) => res + val);
    return Math.abs(vectorMulResult % 10);
}

export function transform(input: number[], basePattern: number[]) {
    const outputLength = input.length;
    const repeatingPatternMatrix = buildRepeatingPatternMatrix(outputLength, basePattern);
    return repeatingPatternMatrix.map(rp => calculateOutputDigit(input, rp));
}

export function calculateOutputAfterPhases(input: number[], basePattern: number[], numberOfPhases: number) {
    let _input = input;
    let _output: number[];
    for (let i = 0; i < numberOfPhases; i++) {
        _output = transform(_input, basePattern);
        _input = _output;
    }
    return _output;
}

export function digitsAfterOffset(data: string, offset: number, numberOfDigits: number) {
    const dataAsString = data.split('');
    const digits = dataAsString.slice(offset, offset + numberOfDigits);
    return digits.join('');
}

export function concatenateInput(data: string, offset: number, numberOfDigits: number) {
    const dataAsString = data.split('');
    const digits = dataAsString.slice(offset, offset + numberOfDigits);
    return digits.join('');
}

export function buildRepeatingPattern_(position: number, outputLength: number) {
    if (position < 0) {
        throw new Error(`Position must be positive`);
    }
    if (position > outputLength) {
        throw new Error(`Position can not be bigger than outputLength`);
    }
    const rp: number[] = [];
    let counter = position - 1;
    for (let i = 0; i < counter; i++) {
        rp.push(0);
    }
    while (true) {
        if (counter > outputLength) {
            return rp;
        }
    }
}
