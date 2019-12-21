import { chunkString } from './utils';
import { InputDataForDay10 } from './day10-monitoring-station.input-data';

type Asteroid = { x: number; y: number };

function readMap(mapInput: string) {
    const width = mapInput.indexOf('\n') + 1;
    const map = chunkString(mapInput, width);
    const mapPoints: Asteroid[] = [];

    map.forEach((line, i) => {
        line.split('').forEach((c, j) => {
            const mapPoint = c === '#' ? { x: j, y: i } : null;
            mapPoints.push(mapPoint);
        });
    });
    return mapPoints;
}

export function asteroids(mapInput: string) {
    return readMap(mapInput).filter(p => !!p);
}

export function asteroidsInLineOfSight(center: Asteroid, asteroids: Asteroid[]) {
    const _recenteredAsteroids = asteroids
        .filter(a => a !== center)
        .map(a => ({ x: a.x - center.x, y: a.y - center.y }));
    return _recenteredAsteroids.reduce((acc, val) => {
        let angle = parseFloat(Math.acos((val.y * -1) / Math.sqrt(val.x ** 2 + val.y ** 2)).toFixed(12));
        angle = val.x >= 0 ? angle : Math.PI * 2 - angle;
        const _astInLine = !!acc[angle] ? acc[angle] : (acc[angle] = []);
        _astInLine.push(val);
        return acc;
    }, {} as { [angle: number]: Asteroid[] });
}

export function asteroidWithMostAsteroidsInLineOfSight(mapInput: string) {
    const _asteroids = asteroids(mapInput);
    const _asteroidsWithAsteroidsInLineOfSight = _asteroids.map(a => {
        const _asteroidsInLineOfSight = asteroidsInLineOfSight(a, _asteroids);
        return { asteroid: a, asteroidsInLineOfSight: _asteroidsInLineOfSight };
    });
    const maxNumberOfAsteroidsInLineOfSight = _asteroidsWithAsteroidsInLineOfSight.reduce(
        (maxNumberOfAsteroidsInLineOfSight, _asteroid) => {
            const numberOfAsteroidsInLingOfSight = Object.values(_asteroid.asteroidsInLineOfSight).length;
            return maxNumberOfAsteroidsInLineOfSight < numberOfAsteroidsInLingOfSight
                ? numberOfAsteroidsInLingOfSight
                : maxNumberOfAsteroidsInLineOfSight;
        },
        0,
    );
    return _asteroidsWithAsteroidsInLineOfSight.filter(
        a => Object.values(a.asteroidsInLineOfSight).length === maxNumberOfAsteroidsInLineOfSight,
    );
}

export function sortAsteroidsInLineOfSightFromCloserToFurthest(asteroidsInLineOfSight: {
    [angle: number]: Asteroid[];
}) {
    return Object.entries(asteroidsInLineOfSight).reduce(
        (acc, [angle, asteroids]) => {
            acc[angle] = asteroids.sort((ast1, ast2) => {
                const distance1 = ast1.x ** 2 + ast1.y ** 2;
                const distance2 = ast2.x ** 2 + ast2.y ** 2;
                return distance1 - distance2;
            });
            return acc;
        },
        {} as {
            [angle: number]: Asteroid[];
        },
    );
}

export function sortAsteroidsInLineOfSightFrom_0_to_360_degrees(asteroidsInLineOfSight: {
    [angle: number]: Asteroid[];
}) {
    return Object.entries(asteroidsInLineOfSight)
        .sort((as1, as2) => parseFloat(as1[0]) - parseFloat(as2[0]))
        .map(([, asteroids]) => asteroids);
}

export function destroyAsteroids(asteroidsInLineOfSight: { [angle: number]: Asteroid[] }, centralAsteroid: Asteroid) {
    const asteroidsSorted = sortAsteroidsInLineOfSightFromCloserToFurthest(asteroidsInLineOfSight);
    const asteroidsSortedByAngle = sortAsteroidsInLineOfSightFrom_0_to_360_degrees(asteroidsSorted);
    const asteroidsDestroyed: Asteroid[] = [];
    _destroyAsteroids(asteroidsSortedByAngle, asteroidsDestroyed);
    return asteroidsDestroyed.map(a => ({ x: a.x + centralAsteroid.x, y: a.y + centralAsteroid.y }));
}
function _destroyAsteroids(asteroidsInLineOfSight: Asteroid[][], asteroidsDestroyed: Asteroid[]) {
    const _asteroidsLeft = asteroidsLeft(asteroidsInLineOfSight);
    if (_asteroidsLeft.length === 0) {
        return;
    }
    _asteroidsLeft.forEach(as => asteroidsDestroyed.push(as.shift()));
    _destroyAsteroids(_asteroidsLeft, asteroidsDestroyed);
}
function asteroidsLeft(asteroids: Asteroid[][]) {
    return asteroids.filter(as => as.length > 0);
}

export function solutionToQuiz2() {
    const _asteroids = asteroidWithMostAsteroidsInLineOfSight(InputDataForDay10);
    const centralAsteroid = _asteroids[0];
    const destroyedAsteroids = destroyAsteroids(centralAsteroid.asteroidsInLineOfSight, centralAsteroid.asteroid);
    const asteroid200 = destroyedAsteroids[199];
    return asteroid200.x * 100 + asteroid200.y;
}
