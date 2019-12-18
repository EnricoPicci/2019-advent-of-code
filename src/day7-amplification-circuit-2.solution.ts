import { findMaxThrustSignal } from './day7-amplification-circuit';
import { InputData } from './day7-amplification-circuit.input-data';

const maxSignal = findMaxThrustSignal([9, 8, 7, 6, 5], InputData, 0);

console.log('the highest signal that can be sent to the thrusters using a loop setup is', maxSignal.signal);
