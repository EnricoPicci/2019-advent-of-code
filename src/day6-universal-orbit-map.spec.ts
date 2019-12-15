import { expect } from 'chai';

import {
    readInput,
    buildCatalogueOfOjects,
    objectsOrbited,
    centerOfMass,
    allDirectIndirectOrbits,
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
