import { expect } from 'chai';
import {
    readInput,
    scanMoons,
    buildMoonPairs,
    advanceSteps,
    calculateTotalEnergy,
    countStepsToReturnToTheSamePositionOnOneAxis,
    areMoonsInTheSamePositionsOnOneAxis,
    countStepsToReturnToTheSamePosition,
} from './day12-n-body-problem';

describe('1 - readInput', () => {
    it('1.1 - should read the input and create the expected coordinates', () => {
        const input = `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`;
        const coordinates = readInput(input);
        expect(coordinates.length).to.equal(4);
        expect(coordinates[0].x).to.equal(-1);
        expect(coordinates[0].y).to.equal(0);
        expect(coordinates[0].z).to.equal(2);
        expect(coordinates[1].x).to.equal(2);
        expect(coordinates[2].x).to.equal(4);
        expect(coordinates[3].x).to.equal(3);
    });
});

describe('2 - moonPairs', () => {
    it('2.1 - should read the input and create the expected pairs of moons', () => {
        const input = `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`;
        const moons = scanMoons(input);
        const _moonPairs = buildMoonPairs(moons);
        expect(_moonPairs.length).to.equal(6);
    });
});

describe('3 - advanceSteps - first example', () => {
    const input = `<x=-1, y=0, z=2>
    <x=2, y=-10, z=-7>
    <x=4, y=-8, z=8>
    <x=3, y=5, z=-1>`;
    it('3.1 - should read the input and create the expected coordinates asfter ONE step', () => {
        const moons = scanMoons(input);
        const moonsAfterOneStep = advanceSteps(1, moons);
        expect(moonsAfterOneStep.length).to.equal(moons.length);
        const _moon0 = moonsAfterOneStep.find(m => m.name === moons[0].name);
        expect(_moon0.velocity.x).to.equal(3);
        expect(_moon0.velocity.y).to.equal(-1);
        expect(_moon0.velocity.z).to.equal(-1);
        expect(_moon0.position.x).to.equal(2);
        expect(_moon0.position.y).to.equal(-1);
        expect(_moon0.position.z).to.equal(1);
        const _moonN = moonsAfterOneStep.find(m => m.name === moons[moons.length - 1].name);
        expect(_moonN.velocity.x).to.equal(-1);
        expect(_moonN.velocity.y).to.equal(-3);
        expect(_moonN.velocity.z).to.equal(1);
        expect(_moonN.position.x).to.equal(2);
        expect(_moonN.position.y).to.equal(2);
        expect(_moonN.position.z).to.equal(0);
    });
    it('3.2 - should read the input and create the expected coordinates asfter TEN step', () => {
        const moons = scanMoons(input);
        const moonsAfterTenSteps = advanceSteps(10, moons);
        expect(moonsAfterTenSteps.length).to.equal(moons.length);
        const _moon0 = moonsAfterTenSteps.find(m => m.name === moons[0].name);
        expect(_moon0.velocity.x).to.equal(-3);
        expect(_moon0.velocity.y).to.equal(-2);
        expect(_moon0.velocity.z).to.equal(1);
        expect(_moon0.position.x).to.equal(2);
        expect(_moon0.position.y).to.equal(1);
        expect(_moon0.position.z).to.equal(-3);
        const _moonN = moonsAfterTenSteps.find(m => m.name === moons[moons.length - 1].name);
        expect(_moonN.velocity.x).to.equal(1);
        expect(_moonN.velocity.y).to.equal(-1);
        expect(_moonN.velocity.z).to.equal(-1);
        expect(_moonN.position.x).to.equal(2);
        expect(_moonN.position.y).to.equal(0);
        expect(_moonN.position.z).to.equal(4);
    });
});

describe('4 - calculateTotalEnergy', () => {
    it('4.1 - should calculate the total energy after TEN steps - first example', () => {
        const input = `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`;
        const moons = scanMoons(input);
        const moonsAfterTenStep = advanceSteps(10, moons);
        const totalEnergy = calculateTotalEnergy(moonsAfterTenStep);
        expect(totalEnergy).to.equal(179);
    });
    it('4.2 - should calculate the total energy after ONE HUNDRED steps - second example', () => {
        const input = `<x=-8, y=-10, z=0>
        <x=5, y=5, z=10>
        <x=2, y=-7, z=3>
        <x=9, y=-8, z=-3>`;
        const moons = scanMoons(input);
        const moonsAfterSteps = advanceSteps(100, moons);
        const totalEnergy = calculateTotalEnergy(moonsAfterSteps);
        expect(totalEnergy).to.equal(1940);
    });
});

describe('f - quizs', () => {
    it('f.1 - first quiz', () => {
        const input = `<x=1, y=4, z=4>
        <x=-4, y=-1, z=19>
        <x=-15, y=-14, z=12>
        <x=-17, y=1, z=10>`;
        const moons = scanMoons(input);
        const moonsAfterTenStep = advanceSteps(1000, moons);
        const totalEnergy = calculateTotalEnergy(moonsAfterTenStep);
        expect(totalEnergy).to.equal(10635);
    });
});

describe('5 - oscillations', () => {
    it(`5.1 - calculates how many steps it takes for all moons to return to the same position
    The initial position of the the moons varies only on the x axis, y and z are set to zero`, () => {
        const input = `<x=-1, y=0, z=0>
        <x=2, y=-0, z=-0>
        <x=3, y=-0, z=0>
        <x=4, y=0, z=-0>`;
        const moons = scanMoons(input);
        let counter = countStepsToReturnToTheSamePositionOnOneAxis(moons, 'x');
        expect(counter).to.equal(18);
    });
    it(`5.2 - calculates how many steps it takes for all moons to return to the same position
    considering only the y axis`, () => {
        const input = `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`;
        const moons = scanMoons(input);
        let counter = countStepsToReturnToTheSamePositionOnOneAxis(moons, 'y');
        expect(counter).to.equal(28);
    });
    it(`5.3 - calculates how many steps it takes for all moons to return to the same position
    considering only the z axis`, () => {
        const input = `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`;
        const moons = scanMoons(input);
        let counter = countStepsToReturnToTheSamePositionOnOneAxis(moons, 'z');
        expect(counter).to.equal(44);
    });
    it(`5.4 - after 2772 steps all moons to return to the same position`, () => {
        const input = `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`;
        const moons = scanMoons(input);
        let nextMoons = moons;
        nextMoons = advanceSteps(2772, nextMoons);
        expect(areMoonsInTheSamePositionsOnOneAxis(moons, nextMoons, 'x')).to.be.true;
        expect(areMoonsInTheSamePositionsOnOneAxis(moons, nextMoons, 'y')).to.be.true;
        expect(areMoonsInTheSamePositionsOnOneAxis(moons, nextMoons, 'z')).to.be.true;
    });
});

describe('6 - countStepsToReturnToTheSamePosition', () => {
    it(`6.1 - calculates how many steps it takes for all moons to return to the same position
    This is the first example in the text of the problem`, () => {
        const input = `<x=-1, y=0, z=2>
        <x=2, y=-10, z=-7>
        <x=4, y=-8, z=8>
        <x=3, y=5, z=-1>`;
        const moons = scanMoons(input);
        let counter = countStepsToReturnToTheSamePosition(moons);
        expect(counter).to.equal(2772);
    });
    it(`6.2 - calculates how many steps it takes for all moons to return to the same position
    This is the second example in the text of the problem`, () => {
        const input = `<x=-8, y=-10, z=0>
        <x=5, y=5, z=10>
        <x=2, y=-7, z=3>
        <x=9, y=-8, z=-3>`;
        const moons = scanMoons(input);
        let counter = countStepsToReturnToTheSamePosition(moons);
        expect(counter).to.equal(4686774924);
    });
});

describe(' g- quizs', () => {
    it('g.1 - second quiz', () => {
        const input = `<x=1, y=4, z=4>
        <x=-4, y=-1, z=19>
        <x=-15, y=-14, z=12>
        <x=-17, y=1, z=10>`;
        const moons = scanMoons(input);
        const steps = countStepsToReturnToTheSamePosition(moons);
        expect(steps).to.equal(583523031727256);
    }).timeout(100000);
});
