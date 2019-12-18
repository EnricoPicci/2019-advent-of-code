type Val = { val: number };
type Instruction = {
    id: string;
    parameters: Parameter[];
};
type Parameter = { value: number; mode: string };
type ExitCode = 'END' | 'WAIT FOR INPUT';

export function calculateNextState(
    initialData: number[],
    input?: number[],
    outputFunction = console.log,
    instructionPointer: number = undefined,
) {
    const state = buildState(initialData);
    const instructionIterator = instructionIteratorBuilder(state);
    let currentInstruction = instructionIterator.next(instructionPointer);
    let newInstructionPointer: number;
    let inputPointer = 0;
    while (!currentInstruction.done) {
        newInstructionPointer = undefined;
        const opCode = currentInstruction.value.id;
        if (opCode === '99') {
            return calculateResponse(state, 'END');
        } else if (opCode === '01') {
            // SUM
            const valToAdd1 = getParameterValue(currentInstruction.value.parameters[0], state);
            const valToAdd2 = getParameterValue(currentInstruction.value.parameters[1], state);
            state[currentInstruction.value.parameters[2].value].val = valToAdd1 + valToAdd2;
        } else if (opCode === '02') {
            // MULT
            const valToMult1 = getParameterValue(currentInstruction.value.parameters[0], state);
            const valToMult2 = getParameterValue(currentInstruction.value.parameters[1], state);
            state[currentInstruction.value.parameters[2].value].val = valToMult1 * valToMult2;
        } else if (opCode === '03') {
            // INPUT - ignore the parameter mode for this instruction - uses always position mode
            const paramVal = currentInstruction.value.parameters[0].value;
            if (inputPointer >= input.length) {
                return calculateResponse(
                    state,
                    'WAIT FOR INPUT',
                    currentInstruction.instructionPointer - numberOfElementsPerInstruction('03'),
                );
            }
            state[paramVal].val = input[inputPointer];
            inputPointer++;
        } else if (opCode === '04') {
            // OUTPUT
            const paramVal = getParameterValue(currentInstruction.value.parameters[0], state);
            const output = paramVal;
            outputFunction(output);
        } else if (opCode === '05') {
            // jump-if-true
            const firstParamValue = getParameterValue(currentInstruction.value.parameters[0], state);
            if (firstParamValue !== 0) {
                // const secondParamValue = currentInstruction.value.parameters[1].value;
                const secondParamValue = getParameterValue(currentInstruction.value.parameters[1], state);
                newInstructionPointer = secondParamValue;
            }
        } else if (opCode === '06') {
            // jump-if-false
            const firstParamValue = getParameterValue(currentInstruction.value.parameters[0], state);
            if (firstParamValue === 0) {
                // const secondParamValue = currentInstruction.value.parameters[1].value;
                const secondParamValue = getParameterValue(currentInstruction.value.parameters[1], state);
                newInstructionPointer = secondParamValue;
            }
        } else if (opCode === '07') {
            // less than
            const firstParamValue = getParameterValue(currentInstruction.value.parameters[0], state);
            const secondParamValue = getParameterValue(currentInstruction.value.parameters[1], state);
            // from the instructions: "Parameters that an instruction writes to will never be in immediate mode."
            const thirdParamValue = currentInstruction.value.parameters[2].value;
            state[thirdParamValue].val = firstParamValue < secondParamValue ? 1 : 0;
        } else if (opCode === '08') {
            // equals
            const firstParamValue = getParameterValue(currentInstruction.value.parameters[0], state);
            const secondParamValue = getParameterValue(currentInstruction.value.parameters[1], state);
            // from the instructions: "Parameters that an instruction writes to will never be in immediate mode."
            const thirdParamValue = currentInstruction.value.parameters[2].value;
            state[thirdParamValue].val = firstParamValue === secondParamValue ? 1 : 0;
        } else {
            throw new Error(`Instruction id "${opCode}" not known`);
        }
        currentInstruction = instructionIterator.next(newInstructionPointer);
    }
    throw new Error(`End of program not found`);
}
function getParameterValue(parameter: Parameter, state: Val[]) {
    const paramVal = parameter.value;
    return parameter.mode === '1' ? paramVal : state[paramVal].val;
}

export function buildState(initialData: number[]) {
    return initialData.map(val => ({ val }));
}

function instructionIteratorBuilder(state: Val[]) {
    let instructionPointer = 0;
    const _state = state;
    let lengthOfInstruction: number;
    let _iterationCount = 0;
    const instructionIterator = {
        next: (_instructionPointer?: number) => {
            instructionPointer = _instructionPointer === undefined ? instructionPointer : _instructionPointer;
            if (instructionPointer < _state.length) {
                const op = _state[instructionPointer];
                const opId = ('00' + op.val).slice(-2);
                lengthOfInstruction = numberOfElementsPerInstruction(opId);
                const endInstructionIndex = instructionPointer + lengthOfInstruction;
                const instructionElements = _state.slice(instructionPointer, endInstructionIndex);
                const instruction = buildInstruction(instructionElements);
                instructionPointer = endInstructionIndex;
                _iterationCount++;
                return { value: instruction, done: false, iteration: _iterationCount, instructionPointer };
            }
            return { value: null, done: true, iteration: _iterationCount, instructionPointer };
        },
    };
    return instructionIterator;
}

export function buildInstruction(instructionElements: Val[]) {
    let instruction: Instruction;
    let instructionDataAsString = instructionElements[0].val.toString();
    instructionDataAsString =
        instructionDataAsString.length < 2 ? '0' + instructionDataAsString : instructionDataAsString;
    const instructionLength = instructionDataAsString.length;
    const id = instructionDataAsString.substr(instructionLength - 2, 2);
    const parameterModesString = instructionDataAsString.substr(0, instructionLength - 2);
    const parameterModesStringLength = parameterModesString.length;
    const numberOfParameters = numberOfParametersPerInstruction(id);
    const parameters: Parameter[] = [];
    for (let i = 0; i < numberOfParameters; i++) {
        const parameterValue = instructionElements[i + 1].val;
        const parameterModePosition = parameterModesStringLength - i;
        const parameterMode = parameterModePosition > 0 ? parameterModesString[parameterModePosition - 1] : '0';
        const parameter: Parameter = { value: parameterValue, mode: parameterMode };
        parameters.push(parameter);
    }
    instruction = { id, parameters };
    return instruction;
}
function numberOfElementsPerInstruction(instructionId: string) {
    switch (instructionId) {
        case '01':
            return 4;
        case '02':
            return 4;
        case '03':
            return 2;
        case '04':
            return 2;
        case '05':
            return 3;
        case '06':
            return 3;
        case '07':
            return 4;
        case '08':
            return 4;
        case '99':
            return 1;
        default:
            return 1;
    }
}
function numberOfParametersPerInstruction(instructionId: string) {
    return numberOfElementsPerInstruction(instructionId) - 1;
}

function calculateResponse(
    newState: {
        val: number;
    }[],
    exitCode: ExitCode,
    instructionPointer?: number,
) {
    const state = newState.map(val => val.val);
    return { state, exitCode, instructionPointer };
}
