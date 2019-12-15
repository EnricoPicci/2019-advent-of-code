import { calculateNextState } from './intcode-computer';

export function chainAmplifierControllers(phaseSettings: number[], controllerSoftware: number[], input: number) {
    const outputStream: number[] = [];
    const outputFunction = (o: number) => {
        outputStream.push(o);
    };
    let _input = input;
    phaseSettings.forEach(setting => {
        calculateNextState(controllerSoftware, [setting, _input], outputFunction);
        _input = outputStream[outputStream.length - 1];
    });
    return outputStream[outputStream.length - 1];
}

export function permutation(values: any[], firstPart: any[] = [], result: any[] = []) {
    if (values.length === 1) {
        result.push(firstPart.concat(values[0]));
    } else {
        const firstValues = values.slice();
        firstValues.map(firstVal => {
            const valuesWithoutFirstVal = values.filter(v => v !== firstVal);
            const newFirstPart = firstPart.concat(firstVal);
            return permutation(valuesWithoutFirstVal, newFirstPart, result);
        });
    }
    return result;
}

export function findMaxThrustSignal(phaseSettings: number[], controllerSoftware: number[], input: number) {
    return permutation(phaseSettings)
        .map(permutatedSettings => chainAmplifierControllers(permutatedSettings, controllerSoftware, input))
        .reduce((maxSignal, signal) => (maxSignal = maxSignal < signal ? signal : maxSignal));
}
