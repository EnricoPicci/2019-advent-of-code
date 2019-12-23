type Val = { val: number };
type Instruction = {
    id: string;
    parameters: Parameter[];
};
type Parameter = { value: number; mode: string };
type ExitCode = 'END' | 'WAIT FOR INPUT';
export type IncodeComputerState = {
    state: number[];
    output: number[];
    exitCode: ExitCode;
    instructionPointer: number;
};

export function calculateNextState(
    initialData: number[],
    input?: number[],
    outputFunction = console.log,
    instructionPointer: number = undefined,
    log = false,
) {
    const state = buildState(initialData);
    const instructionIterator = instructionIteratorBuilder(state);
    let currentInstruction = instructionIterator.next(instructionPointer);
    let newInstructionPointer: number;
    let inputPointer = 0;
    let relativeBase = 0;
    const output = [];
    while (!currentInstruction.done) {
        newInstructionPointer = undefined;
        const opCode = currentInstruction.value.id;
        if (log) {
            console.log(opCode);
        }
        if (opCode === '99') {
            return calculateResponse(state, output, 'END');
        } else if (opCode === '01') {
            // SUM
            const valToAdd1 = getParameterValue(currentInstruction.value.parameters[0], state, relativeBase);
            const valToAdd2 = getParameterValue(currentInstruction.value.parameters[1], state, relativeBase);
            // from the instructions: "Parameters that an instruction writes to will never be in immediate mode."
            const thirdParamValue = getAddressFromParameter(currentInstruction.value.parameters[2], relativeBase);
            readFromState(thirdParamValue, state).val = valToAdd1 + valToAdd2;
        } else if (opCode === '02') {
            // MULT
            const valToMult1 = getParameterValue(currentInstruction.value.parameters[0], state, relativeBase);
            const valToMult2 = getParameterValue(currentInstruction.value.parameters[1], state, relativeBase);
            // from the instructions: "Parameters that an instruction writes to will never be in immediate mode."
            const thirdParamValue = getAddressFromParameter(currentInstruction.value.parameters[2], relativeBase);
            readFromState(thirdParamValue, state).val = valToMult1 * valToMult2;
        } else if (opCode === '03') {
            // INPUT
            // ignore the parameter mode for this instruction - uses always position mode
            const paramVal = getAddressFromParameter(currentInstruction.value.parameters[0], relativeBase);
            if (inputPointer >= input.length) {
                return calculateResponse(
                    state,
                    output,
                    'WAIT FOR INPUT',
                    currentInstruction.instructionPointer - numberOfElementsPerInstruction('03'),
                );
            }
            readFromState(paramVal, state).val = input[inputPointer];
            inputPointer++;
        } else if (opCode === '04') {
            // OUTPUT
            const paramVal = getParameterValue(currentInstruction.value.parameters[0], state, relativeBase);
            output.push(paramVal);
            outputFunction(paramVal);
            if (log) {
                console.log('>>>>>>>>>>>>>>>output', paramVal);
            }
        } else if (opCode === '05') {
            // jump-if-true
            const firstParamValue = getParameterValue(currentInstruction.value.parameters[0], state, relativeBase);
            if (firstParamValue !== 0) {
                const secondParamValue = getParameterValue(currentInstruction.value.parameters[1], state, relativeBase);
                newInstructionPointer = secondParamValue;
            }
        } else if (opCode === '06') {
            // jump-if-false
            const firstParamValue = getParameterValue(currentInstruction.value.parameters[0], state, relativeBase);
            if (firstParamValue === 0) {
                const secondParamValue = getParameterValue(currentInstruction.value.parameters[1], state, relativeBase);
                newInstructionPointer = secondParamValue;
            }
        } else if (opCode === '07') {
            // less than
            const firstParamValue = getParameterValue(currentInstruction.value.parameters[0], state, relativeBase);
            const secondParamValue = getParameterValue(currentInstruction.value.parameters[1], state, relativeBase);
            // from the instructions: "Parameters that an instruction writes to will never be in immediate mode."
            const thirdParamValue = getAddressFromParameter(currentInstruction.value.parameters[2], relativeBase);
            readFromState(thirdParamValue, state).val = firstParamValue < secondParamValue ? 1 : 0;
        } else if (opCode === '08') {
            // equals
            const firstParamValue = getParameterValue(currentInstruction.value.parameters[0], state, relativeBase);
            const secondParamValue = getParameterValue(currentInstruction.value.parameters[1], state, relativeBase);
            // from the instructions: "Parameters that an instruction writes to will never be in immediate mode."
            const thirdParamValue = getAddressFromParameter(currentInstruction.value.parameters[2], relativeBase);
            readFromState(thirdParamValue, state).val = firstParamValue === secondParamValue ? 1 : 0;
        } else if (opCode === '09') {
            // adjusts the relative base
            const paramValue = getParameterValue(currentInstruction.value.parameters[0], state, relativeBase);
            relativeBase = relativeBase + paramValue;
        } else {
            throw new Error(`Instruction id "${opCode}" not known`);
        }
        currentInstruction = instructionIterator.next(newInstructionPointer);
    }
    throw new Error(`End of program not found`);
}
function getParameterValue(parameter: Parameter, state: Val[], relativeBase: number) {
    const paramVal = parameter.value;
    if (parameter.mode === '0') {
        // position mode
        return readFromState(paramVal, state).val;
    } else if (parameter.mode === '1') {
        // immediate mode
        return paramVal;
    } else if (parameter.mode === '2') {
        // relative mode
        return readFromState(paramVal + relativeBase, state).val;
    } else {
        throw new Error(`Parameter mode "${parameter.mode}" not expected`);
    }
}
function readFromState(address: number, state: Val[]) {
    if (address < 0) {
        throw new Error(`Param address can not be negative - the address value now is ${address}`);
    }
    if (address >= state.length) {
        for (let i = state.length; i <= address; i++) {
            state[i] = { val: 0 };
        }
    }
    return state[address];
}
function getAddressFromParameter(parameter: Parameter, relativeBase: number) {
    return parameter.mode === '0' ? parameter.value : parameter.value + relativeBase;
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
        case '09':
            return 2;
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
    output: number[] = [],
    exitCode: ExitCode,
    instructionPointer?: number,
) {
    const state = newState.map(val => val.val);
    return { state, exitCode, output, instructionPointer };
}
