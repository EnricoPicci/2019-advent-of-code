import { calculateNextState } from './intcode-computer';

export function chainAmplifierControllers(phaseSettings: number[], controllerSoftware: number[], initialInput: number) {
    const outputLog: number[] = [];
    const outputFunctionGenerator = ((_outputLog: number[]) => {
        return (output: number[]) => {
            return (o: number) => {
                output.push(o);
                outputLog.push(o);
                if (output.length > 1) {
                    console.log('output.length', output.length);
                }
            };
        };
    })(outputLog);
    const numberOfAmplifiers = phaseSettings.length;
    const amplifierControllersExecutionResults = phaseSettings.map((setting, i) => {
        let output: number[] = [];
        return {
            name: `AmplifierController${i}`,
            lastExecutionResult: calculateNextState(
                controllerSoftware,
                [setting],
                outputFunctionGenerator(output),
                undefined,
            ),
        };
    });
    let controllerIndex = -1;
    let output: number[] = [];
    let input = [initialInput];
    let exitCode;
    while (!(exitCode === 'END' && controllerIndex === numberOfAmplifiers - 1)) {
        controllerIndex = controllerIndex < numberOfAmplifiers - 1 ? controllerIndex + 1 : 0;
        const controllerExecutionResult = amplifierControllersExecutionResults[controllerIndex];
        output = [];
        const executionResult = calculateNextState(
            controllerExecutionResult.lastExecutionResult.state,
            input,
            outputFunctionGenerator(output),
            controllerExecutionResult.lastExecutionResult.instructionPointer,
        );
        controllerExecutionResult.lastExecutionResult = executionResult;
        exitCode = executionResult.exitCode;
        input = output;
    }
    return outputLog[outputLog.length - 1];
}

export function permutation(values: any[], firstPart: any[] = [], result: any[] = []) {
    if (values.length === 1) {
        result.push(firstPart.concat(values[0]));
    } else {
        const firstValues = values.slice();
        firstValues.forEach(firstVal => {
            const valuesWithoutFirstVal = values.filter(v => v !== firstVal);
            const newFirstPart = firstPart.concat(firstVal);
            return permutation(valuesWithoutFirstVal, newFirstPart, result);
        });
    }
    return result;
}

export function findMaxThrustSignal(phaseSettings: number[], controllerSoftware: number[], input: number) {
    return permutation(phaseSettings)
        .map(permutatedSettings => ({
            signal: chainAmplifierControllers(permutatedSettings, controllerSoftware, input),
            phaseSettings: permutatedSettings,
        }))
        .reduce(
            (maxSignal, signalAndSettings) =>
                (maxSignal = maxSignal.signal < signalAndSettings.signal ? signalAndSettings : maxSignal),
            { signal: 0, phaseSettings: null },
        );
}
