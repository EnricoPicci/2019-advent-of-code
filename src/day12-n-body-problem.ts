type Coord = { x: number; vel_x: number; y: number; vel_y: number; z: number; vel_z: number };
type Velocity = { x: number; y: number; z: number };
export type Moon = { name: string; position: Coord; velocity: Velocity };

export function readInput(input: string) {
    return input.split('\n').map(moonData =>
        moonData
            .split(',')
            .map(coordinateData => coordinateData.split('='))
            .reduce((coordinates, [firstPart, value]) => {
                coordinates[firstPart[firstPart.length - 1]] = parseInt(value);
                return coordinates;
            }, {} as Coord),
    );
}

export function scanMoons(scanData: string) {
    return readInput(scanData).map(
        (position, i) => ({ name: `Moon${i}`, position, velocity: { x: 0, y: 0, z: 0 } } as Moon),
    );
}

export function buildMoonPairs(moons: Moon[]): [Moon, Moon][] {
    const _moons = moons.slice();
    if (_moons.length <= 2) {
        return [moons] as [Moon, Moon][];
    }
    const firstElement = _moons.shift();
    return _moons.map(e => [firstElement, e]).concat(buildMoonPairs(_moons)) as [Moon, Moon][];
}

function advanceOneStep(moons: Moon[]) {
    const clonedMoons = moons.map(m => cloneMoon(m));
    const moonPairs = buildMoonPairs(clonedMoons);
    const moonSet = moonPairs
        .map(_moonPair => {
            calculateVelocity(_moonPair, 'x');
            calculateVelocity(_moonPair, 'y');
            calculateVelocity(_moonPair, 'z');
            return _moonPair;
        })
        .reduce((moons, [moon1, moon2]) => {
            moons.add(moon1);
            moons.add(moon2);
            return moons;
        }, new Set<Moon>());
    const _moons = [...moonSet];
    _moons.forEach(moon => {
        calculatePosition(moon, 'x');
        calculatePosition(moon, 'y');
        calculatePosition(moon, 'z');
    });
    return _moons;
}
function cloneMoon(moon: Moon) {
    const _moon = { ...moon };
    _moon.position = { ...moon.position };
    _moon.velocity = { ...moon.velocity };
    return _moon;
}
function calculateVelocity([moon1, moon2]: [Moon, Moon], axis: string) {
    let newVel1: number;
    let newVel2: number;
    if (moon1.position[axis] === moon2.position[axis]) {
        newVel1 = moon1.velocity[axis];
        newVel2 = moon2.velocity[axis];
    } else if (moon1.position[axis] < moon2.position[axis]) {
        newVel1 = moon1.velocity[axis] + 1;
        newVel2 = moon2.velocity[axis] - 1;
    } else {
        newVel1 = moon1.velocity[axis] - 1;
        newVel2 = moon2.velocity[axis] + 1;
    }
    moon1.velocity[axis] = newVel1;
    // moon1.position[axis] = moon1.position[axis] + newVel1;
    moon2.velocity[axis] = newVel2;
    // moon2.position[axis] = moon1.position[axis] + newVel2;
}
function calculatePosition(moon: Moon, axis: string) {
    moon.position[axis] = moon.position[axis] + moon.velocity[axis];
}

export function advanceSteps(numberOfSteps: number, moons: Moon[]) {
    let _moons = moons;
    for (let i = 0; i < numberOfSteps; i++) {
        _moons = advanceOneStep(_moons);
    }
    return _moons;
}

export function calculateTotalEnergy(moons: Moon[]) {
    return moons
        .map(moon => {
            const pot = Object.values(moon.position).reduce((_pot, p) => _pot + Math.abs(p), 0);
            const kin = Object.values(moon.velocity).reduce((_kin, v) => _kin + Math.abs(v), 0);
            return pot * kin;
        })
        .reduce((totalEnergy, moonEnergy) => totalEnergy + moonEnergy);
}

export function countStepsToReturnToTheSamePositionOnOneAxis(moons: Moon[], axis: string) {
    let nextMoons = moons;
    let counter = 1;
    do {
        nextMoons = advanceSteps(1, nextMoons);
        counter++;
    } while (!areMoonsInTheSamePositionsOnOneAxis(moons, nextMoons, axis));
    return counter;
}
export function areMoonsInTheSamePositionsOnOneAxis(moons1: Moon[], moons2: Moon[], axis: string) {
    let resp = true;
    const differentPositions = new Set(moons2.map(moon => moon.position[axis]));
    const areAllMoonsOnTheSamePosition = [...differentPositions].length === 1;
    const haveAllMoonsVelocityZero = moons2.reduce((acc, val) => acc && val.velocity[axis] === 0, true);
    if (areAllMoonsOnTheSamePosition && haveAllMoonsVelocityZero) {
        throw new Error(`All moons are now in position ${moons2[0].position[axis]}`);
    }
    // moons1.forEach((moon, i) => console.log(moon.position[axis], moons2[i].position[axis]));
    moons1.forEach((moon, i) => (resp = resp && moon.position[axis] === moons2[i].position[axis]));
    return resp;
}

export function countStepsToReturnToTheSamePosition(moons: Moon[]) {
    const stepsForX = countStepsToReturnToTheSamePositionOnOneAxis(moons, 'x');
    const stepsForY = countStepsToReturnToTheSamePositionOnOneAxis(moons, 'y');
    const stepsForZ = countStepsToReturnToTheSamePositionOnOneAxis(moons, 'z');
    const maxNumberOfSteps = Math.max(stepsForX, stepsForY, stepsForZ);
    let counter = 2;
    while (true) {
        const multiplicationResult = maxNumberOfSteps * counter;
        const isMultiplierForX = multiplicationResult % stepsForX === 0;
        const isMultiplierForY = multiplicationResult % stepsForY === 0;
        const isMultiplierForZ = multiplicationResult % stepsForZ === 0;
        if (isMultiplierForX && isMultiplierForY && isMultiplierForZ) {
            return multiplicationResult;
        }
        counter++;
    }
}
