import { findMaxThrustSignal } from './day7-amplification-circuit';
import { InputData } from './day7-amplification-circuit.input-data';

const maxSignal = findMaxThrustSignal([0, 1, 2, 3, 4], InputData, 0);

console.log('the highest signal that can be sent to the thrusters', maxSignal);
