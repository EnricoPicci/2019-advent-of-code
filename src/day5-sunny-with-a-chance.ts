type Val = { val: number };
type Instruction = {
  id: string;
  parameters: Parameter[];
};
type Parameter = { value: number; mode: string };

export function calculateNextState(
  initialData: number[],
  input?: number,
  outputFunction = console.log
) {
  const state = buildState(initialData);
  const instructionIterator = instructionIteratorBuilder(state);
  let currentInstruction = instructionIterator.next();
  while (!currentInstruction.done) {
    const opCode = currentInstruction.value.id;
    if (opCode === "99") {
      return calculateResponse(state);
    } else if (opCode === "01") {
      // SUM
      const valToAdd1 = getParameterValue(
        currentInstruction.value.parameters[0],
        state
      );
      const valToAdd2 = getParameterValue(
        currentInstruction.value.parameters[1],
        state
      );
      state[currentInstruction.value.parameters[2].value].val =
        valToAdd1 + valToAdd2;
    } else if (opCode === "02") {
      // MULT
      const valToMult1 = getParameterValue(
        currentInstruction.value.parameters[0],
        state
      );
      const valToMult2 = getParameterValue(
        currentInstruction.value.parameters[1],
        state
      );
      state[currentInstruction.value.parameters[2].value].val =
        valToMult1 * valToMult2;
    } else if (opCode === "03") {
      // INPUT - ignore the parameter mode for this instruction
      const paramVal = currentInstruction.value.parameters[0].value;
      state[paramVal].val = input;
    } else if (opCode === "04") {
      // OUTPUT - ignore the parameter mode for this instruction
      const paramVal = currentInstruction.value.parameters[0].value;
      const output = state[paramVal].val;
      outputFunction(output);
    }
    currentInstruction = instructionIterator.next();
  }
  throw new Error(`End of program not found`);
}
function getParameterValue(parameter: Parameter, state: Val[]) {
  const paramVal = parameter.value;
  return parameter.mode === "1" ? paramVal : state[paramVal].val;
}

export function buildState(initialData: number[]) {
  return initialData.map(val => ({ val }));
}

function instructionIteratorBuilder(state: Val[]) {
  let currentIndex = 0;
  const _state = state;
  let lengthOfInstruction: number;
  let _iterationCount = 0;
  const instructionIterator = {
    next: () => {
      if (currentIndex < _state.length) {
        const op = _state[currentIndex];
        const opId = ("00" + op.val).slice(-2);
        lengthOfInstruction = numberOfElementsPerInstruction(opId);
        const endInstructionIndex = currentIndex + lengthOfInstruction;
        const instructionElements = _state.slice(
          currentIndex,
          endInstructionIndex
        );
        const instruction = buildInstruction(instructionElements);
        currentIndex = endInstructionIndex;
        _iterationCount++;
        return { value: instruction, done: false, iteration: _iterationCount };

        // const op = _state[currentIndex];
        // const instruction = buildInstruction(op.val);
        // lengthOfInstruction = numberOfElementsPerInstruction(instruction.id);
        // const endInstructionIndex = currentIndex + lengthOfInstruction;
        // const val = _state.slice(currentIndex, endInstructionIndex);
        // currentIndex = endInstructionIndex;
        // _iterationCount++;
        // return {
        //   value: val,
        //   done: false,
        //   iteration: _iterationCount
        // };
      }
      return { value: null, done: true, iteration: _iterationCount };
    }
  };
  return instructionIterator;
}

export function buildInstruction(instructionElements: Val[]) {
  let instruction: Instruction;
  let instructionDataAsString = instructionElements[0].val.toString();
  instructionDataAsString =
    instructionDataAsString.length < 2
      ? "0" + instructionDataAsString
      : instructionDataAsString;
  const instructionLength = instructionDataAsString.length;
  const id = instructionDataAsString.substr(instructionLength - 2, 2);
  const parameterModesString = instructionDataAsString.substr(
    0,
    instructionLength - 2
  );
  const parameterModesStringLength = parameterModesString.length;
  const numberOfParameters = numberOfParametersPerInstruction(id);
  const parameters: Parameter[] = [];
  for (let i = 0; i < numberOfParameters; i++) {
    const parameterValue = instructionElements[i + 1].val;
    const parameterModePosition = parameterModesStringLength - i;
    const parameterMode =
      parameterModePosition > 0
        ? parameterModesString[parameterModePosition - 1]
        : "0";
    const parameter: Parameter = { value: parameterValue, mode: parameterMode };
    parameters.push(parameter);
  }
  instruction = { id, parameters };
  return instruction;
}
function numberOfElementsPerInstruction(instructionId: string) {
  switch (instructionId) {
    case "01":
      return 4;
    case "02":
      return 4;
    case "03":
      return 2;
    case "04":
      return 2;
    case "99":
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
  }[]
) {
  return newState.map(val => val.val);
}
