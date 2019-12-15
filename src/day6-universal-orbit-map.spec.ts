import { expect } from 'chai';

import {
    readInput,
    buildCatalogueOfOjects,
    objectsOrbited,
    centerOfMass,
    allDirectIndirectOrbits,
    orbitTransfers,
    minimumOrbitalTransfers,
} from './day6-universal-orbit-map';
import { InputData } from './day6-universal-orbit-map.input-data';

// this is the example from the description of the exercize
const exampleMapAsString = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

//******************************************************************************************************************
//*****************************    PART 1           ****************************************************************
//******************************************************************************************************************
describe('1 - readInput', () => {
    it('1.1 - should read an input and return an array of OrbitPairs', () => {
        const orbitsMap = readInput(exampleMapAsString);
        expect(orbitsMap.length).to.equal(11);
        const firstPair = orbitsMap[0];
        expect(firstPair.innerObject).to.equal('COM');
        expect(firstPair.objectInOrbit).to.equal('B');
        orbitsMap.slice(1).forEach(op => {
            expect(op.innerObject.length).to.equal(1);
            expect(op.objectInOrbit.length).to.equal(1);
        });
    });
});

describe('2 - centerOfMass and buildCatalogueOfOjects', () => {
    it('2.1 - finds center of mass', () => {
        const orbitsMap = readInput(exampleMapAsString);
        const COM = centerOfMass(orbitsMap);
        expect(COM).to.be.not.undefined;
    });
    it('2.2 - builds a catalogue of objects', () => {
        const catalogue = buildCatalogueOfOjects(exampleMapAsString);
        expect(Object.keys(catalogue).length).to.equal(12);
    });
});

describe('3 - objectsOrbited', () => {
    it('3.1 - finds the objects that a certain object orbits either directly or indirectly', () => {
        const catalogue = buildCatalogueOfOjects(exampleMapAsString);
        const _objectsOrbited = objectsOrbited('D', catalogue);
        expect(_objectsOrbited.length).to.equal(3);
    });
});

describe('4 - allDirectIndirectOrbits', () => {
    it('4.1 - finds all direct and indirect orbits - example provided in the exercize', () => {
        const allOrbits = allDirectIndirectOrbits(exampleMapAsString);
        expect(allOrbits.length).to.equal(42);
    });
});

describe('f - solution to quizs', () => {
    it('f.1 - solution to quiz 1', () => {
        const allOrbits = allDirectIndirectOrbits(InputData);
        expect(allOrbits.length).to.equal(621125);
    }).timeout(60000);
});

//******************************************************************************************************************
//*****************************    PART 2           ****************************************************************
//******************************************************************************************************************

// this is the example from the description of the exercize adpted to the data of Part 2 of the exercize
const exampleMapAsStringForPart2 = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`;

describe('x - orbitTransfers', () => {
    it('x.1 - finds the orbit transfers from one orbiting object to another', () => {
        const catalogue = buildCatalogueOfOjects(exampleMapAsStringForPart2);
        const from = catalogue['YOU'];
        const to = catalogue['D'];
        const _orbitTransfers = orbitTransfers(from, to, catalogue);
        expect(_orbitTransfers.length).to.equal(3);
    });
});

describe('y - minimumOrbitalTransfers', () => {
    it('y.1 - finds the minimum orbit transfers from one orbiting object to another', () => {
        const catalogue = buildCatalogueOfOjects(exampleMapAsStringForPart2);
        const fromName = 'YOU';
        const toName = 'SAN';
        const _minimumOrbitalTransfers = minimumOrbitalTransfers(fromName, toName, catalogue);
        expect(_minimumOrbitalTransfers.length).to.equal(4);
    });
});

describe('g - solution to quizs', () => {
    it('g.1 - solution to quiz 2', () => {
        const catalogue = buildCatalogueOfOjects(InputData);
        const fromName = 'YOU';
        const toName = 'SAN';
        const _minimumOrbitalTransfers = minimumOrbitalTransfers(fromName, toName, catalogue);
        expect(_minimumOrbitalTransfers.length).to.equal(550);
    }).timeout(60000);
});
