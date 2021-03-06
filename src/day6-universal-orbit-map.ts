type OrbitPair = {
    innerObject: string;
    objectInOrbit: string;
};
type ObjectInOrbit = { name: string; immediateOrbitedObjectName?: string; objectsOrbited: ObjectInOrbit[] };
type ObjectsInOrbitCatalogue = {
    [name: string]: ObjectInOrbit;
};

export function readInput(mapAsString: string) {
    const orbitPairsAsString = mapAsString.split('\n');
    return orbitPairsAsString.map(orbitPair => {
        const _orbitPair = orbitPair.trim().split(')');
        const ret: OrbitPair = { innerObject: _orbitPair[0], objectInOrbit: _orbitPair[1] };
        return ret;
    });
}

export function centerOfMass(orbitPairs: OrbitPair[]) {
    const innerObjects = orbitPairs.map(op => op.innerObject);
    const objectsInOrbit = orbitPairs.map(op => op.objectInOrbit);
    const centersOfMass = innerObjects.filter(io => !objectsInOrbit.find(oo => oo === io));
    if (centersOfMass.length === 0) {
        throw new Error(`There is no center of mass`);
    }
    if (centersOfMass.length > 1) {
        throw new Error(`There are more than one centers of mass: ${JSON.stringify(centersOfMass, null, 2)}`);
    }
    const COM: ObjectInOrbit = { name: centersOfMass[0], objectsOrbited: [] };
    return COM;
}

export function buildCatalogueOfOjects(mapAsString: string) {
    const orbitsMap = readInput(mapAsString);
    const COM = centerOfMass(orbitsMap);
    const catalogue: ObjectsInOrbitCatalogue = {};
    catalogue[COM.name] = COM;
    orbitsMap.reduce((acc, val) => {
        const _objectInOrbit: ObjectInOrbit = {
            name: val.objectInOrbit,
            immediateOrbitedObjectName: val.innerObject,
            objectsOrbited: [],
        };
        acc[_objectInOrbit.name] = _objectInOrbit;
        return acc;
    }, catalogue);
    Object.values(catalogue).forEach(objectInOrbit => {
        objectInOrbit.objectsOrbited = objectsOrbited(objectInOrbit.name, catalogue);
    });
    return catalogue;
}

export function objectsOrbited(orbitingObjectName: string, orbitingObjectsCatalogue: ObjectsInOrbitCatalogue) {
    const objectsOrbited: ObjectInOrbit[] = [];
    const orbitingObject = orbitingObjectsCatalogue[orbitingObjectName];
    let _immediateOrbitedOject = orbitingObjectsCatalogue[orbitingObject.immediateOrbitedObjectName];
    while (_immediateOrbitedOject) {
        objectsOrbited.push(_immediateOrbitedOject);
        _immediateOrbitedOject = orbitingObjectsCatalogue[_immediateOrbitedOject.immediateOrbitedObjectName];
    }
    return objectsOrbited;
}

export function allDirectIndirectOrbits(mapAsString: string) {
    const catalogue = buildCatalogueOfOjects(mapAsString);
    return Object.values(catalogue).reduce((acc, val) => {
        acc = acc.concat(val.objectsOrbited);
        return acc;
    }, [] as ObjectInOrbit[]);
}

//******************************************************************************************************************
//*****************************    Functions for PART 2 of the exercize           **********************************
//******************************************************************************************************************

function findImmediateOrbitedObject(orbitingObjectName: string, objectsCatalogue: ObjectsInOrbitCatalogue) {
    return objectsCatalogue[orbitingObjectName];
}

export function minimumOrbitalTransfers(
    fromOrbitingObjectName: string,
    toOrbitingObjectName: string,
    objectsCatalogue: ObjectsInOrbitCatalogue,
) {
    const fromOrbitedObject = findImmediateOrbitedObject(fromOrbitingObjectName, objectsCatalogue);
    const toOrbitedObject = findImmediateOrbitedObject(toOrbitingObjectName, objectsCatalogue);
    const sharedOrbitedObject = fromOrbitedObject.objectsOrbited.find(oo_1 =>
        toOrbitedObject.objectsOrbited.find(oo_2 => oo_2.name === oo_1.name),
    );
    const pathToSharedOrbitedObject_1 = orbitTransfers(fromOrbitedObject, sharedOrbitedObject, objectsCatalogue);
    const pathToSharedOrbitedObject_2 = orbitTransfers(toOrbitedObject, sharedOrbitedObject, objectsCatalogue);
    return pathToSharedOrbitedObject_1.concat(pathToSharedOrbitedObject_2);
}

export function orbitTransfers(from: ObjectInOrbit, to: ObjectInOrbit, objectsCatalogue: ObjectsInOrbitCatalogue) {
    const _orbitTransfers = [];
    let toFound = false;
    let start = objectsCatalogue[from.immediateOrbitedObjectName];
    while (!toFound) {
        const end = objectsCatalogue[start.immediateOrbitedObjectName];
        _orbitTransfers.push({ start, end });
        toFound = end.name === to.name;
        start = end;
    }
    return _orbitTransfers;
}
