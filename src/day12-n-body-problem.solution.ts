import {
    scanMoons,
    advanceSteps,
    calculateTotalEnergy,
    countStepsToReturnToTheSamePosition,
} from './day12-n-body-problem';

const input = `<x=1, y=4, z=4>
        <x=-4, y=-1, z=19>
        <x=-15, y=-14, z=12>
        <x=-17, y=1, z=10>`;
const moons = scanMoons(input);
const moonsAfterTenStep = advanceSteps(1000, moons);
const totalEnergy = calculateTotalEnergy(moonsAfterTenStep);

console.log('the total energy in the system is ', totalEnergy);

console.log();
console.log();
console.log();

const steps = countStepsToReturnToTheSamePosition(moons);

console.log('The number of steps it takes to reach the first state is ', steps);
