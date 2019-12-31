import { intcodeComputer } from './intcode-computer-1';
import { printArea } from './utils';

export enum DroidSignal {
    Wall,
    Traversable,
    Oxigen,
}
export type Map = { [y: number]: { [x: number]: string } };

export enum Direction {
    North = 1,
    South,
    West,
    East,
}

type Point = {
    y: number;
    x: number;
    val?: string;
    distance?: any;
};

export function drawMapGenerator(map: Map = {}) {
    let currentPosition = { x: 0, y: 0 };
    placePointInMap('D', map, { x: 0, y: 0 });
    return (signal: DroidSignal, direction: Direction) => {
        let nextPosition = { ...currentPosition };
        switch (direction) {
            case Direction.North: // north
                nextPosition.y++;
                break;
            case Direction.South: // south
                nextPosition.y--;
                break;
            case Direction.West: // west
                nextPosition.x--;
                break;
            case Direction.East: // east
                nextPosition.x++;
                break;
            default:
                throw new Error(`Direction "${direction}" not expected`);
        }
        switch (signal) {
            case DroidSignal.Wall: // WALL
                placePointInMap('#', map, nextPosition);
                break;
            case DroidSignal.Traversable: // Travesable space
                placePointInMap('.', map, currentPosition);
                currentPosition = { ...nextPosition };
                placePointInMap('D', map, nextPosition);
                break;
            case DroidSignal.Oxigen: // Oxygen System
                placePointInMap('.', map, currentPosition);
                currentPosition = { ...nextPosition };
                placePointInMap('O', map, nextPosition);
                break;
            default:
                throw new Error(`Signal "${signal}" not expected`);
        }
        return { map, currentPosition };
    };
}

export function placePointInMap(value: string, map: Map, point: { x: number; y: number }) {
    map[point.y] = map[point.y] ? map[point.y] : {};
    if (map[point.y][point.x] !== 'O') {
        map[point.y][point.x] = value;
    }
}

export function pointsInMap(map: Map) {
    return Object.entries(map).flatMap(([y, line]) =>
        Object.entries(line).map(([x, val]) => ({ y: parseInt(y), x: parseInt(x), val, distance: undefined } as Point)),
    );
}
function traversedPointsInMap(map: Map) {
    return pointsInMap(map).filter(p => p.val === '.' || p.val === 'D' || p.val === 'O');
}
export function countElementsInMap(map: Map) {
    return pointsInMap(map).length;
}

export function findPointWithPotentialToExplore(from: Point, map: Map) {
    const _points = traversedPointsInMap(map).filter(p => hasPotentiaToExplore(p, map));
    const sortedPoints = _points.sort(
        (a, b) => (a.x - from.x) ** 2 + (a.y - from.y) ** 2 - (b.x - from.x) ** 2 - (b.y - from.y) ** 2,
    );
    // //
    // console.log('Current point', from);
    // console.log('Closest point to explore', sortedPoints[0]);
    // const _pVal = map[from.y][from.x];
    // map[from.y][from.x] = 'P';
    // printArea(map, val => (val ? val : ' '));
    // map[from.y][from.x] = _pVal;
    // console.log('   ');
    // console.log('   ');
    // console.log('   ');
    // //
    return sortedPoints.length === 0 ? null : sortedPoints[0];
}
function hasPotentiaToExplore(p: Point, map: Map) {
    return map[p.y][p.x] !== '#' && !!directionToExplore(p, map);
}
function directionToExplore(p: Point, map: Map) {
    if (map[p.y][p.x] === '#') {
        throw new Error(`Can not ask a wall which is the direction to explore`);
    }
    if (!map[p.y + 1] || !map[p.y + 1][p.x]) {
        return Direction.North;
    } else if (!map[p.y][p.x + 1]) {
        return Direction.East;
    } else if (!map[p.y - 1] || !map[p.y - 1][p.x]) {
        return Direction.South;
    } else if (!map[p.y][p.x - 1]) {
        return Direction.West;
    } else {
        return null;
    }
}

export function findClosestTraversedPoints(point: Point, allPoints: Point[]) {
    return allPoints.filter(
        p =>
            (p.val === '.' || p.val === 'D' || p.val === 'O') &&
            (((p.x === point.x + 1 || p.x === point.x - 1) && p.y === point.y) ||
                ((p.y === point.y + 1 || p.y === point.y - 1) && p.x === point.x)),
    );
}

export function findClosestTraversedPointsWithDistanceNotYetDefined(points: Point[], allPoints: Point[]) {
    return points.flatMap(p => findClosestTraversedPoints(p, allPoints).filter(pp => pp.distance === undefined));
}

export function findShortestPath(from: Point, to: Point, map: Map) {
    const path: Point[] = [];
    if (areSamePoint(from, to)) {
        return path;
    }
    const points = fillDistance(from, to, map);
    const _from = points.find(p => areSamePoint(p, from));
    const _to = points.find(p => areSamePoint(p, to));
    path.push(to);
    return _findShortestPath(_from, _to, points, path).reverse();
}
function areSamePoint(point1: Point, point2: Point) {
    return point1.x === point2.x && point1.y === point2.y;
}

function _findShortestPath(from: Point, to: Point, allPoints: Point[], pathSoFar: Point[]): Point[] {
    const closestPoints = findClosestTraversedPoints(to, allPoints);
    const target = closestPoints.find(p => areSamePoint(p, from));
    if (target) {
        return pathSoFar;
    }
    const nextPoint = closestPoints.find(p => p.distance === to.distance - 1);
    if (!nextPoint) {
        throw new Error(`We are stuck`);
    }
    pathSoFar.push(nextPoint);
    return _findShortestPath(from, nextPoint, allPoints, pathSoFar);
}

export function fillDistance(from: Point, to: Point, map: Map) {
    const allPoints = traversedPointsInMap(map);
    const _from = allPoints.find(p => areSamePoint(p, from));
    const _to = allPoints.find(p => areSamePoint(p, to));
    if (!_from) {
        throw new Error(`we have a problem`);
    }
    _from.distance = 0;
    return _fillDistance([_from], _to, allPoints);
}

function _fillDistance(from: Point[], to: Point, allPoints: Point[]) {
    const pointsWithDistanceNotYetDefined = allPoints.filter(p => !p.distance);
    if (pointsWithDistanceNotYetDefined.length === 0) {
        return allPoints;
    }
    let target: Point;
    let _from = from;
    let _distance = 0;
    while (!target) {
        _distance++;
        const closestPoints = findClosestTraversedPointsWithDistanceNotYetDefined(_from, allPoints);
        closestPoints.forEach(p => (p.distance = _distance));
        target = closestPoints.find(p => areSamePoint(p, to));
        _from = closestPoints;
    }
    return allPoints;
}

export function fillDistanceToAllPoints(from: Point, map: Map) {
    const allPoints = traversedPointsInMap(map);
    let _from = allPoints.find(p => areSamePoint(p, from));
    if (!_from) {
        throw new Error(`we have a problem`);
    }
    _from.distance = 0;
    const pointsWithDistanceNotYetDefined = allPoints.filter(p => !p.distance);
    if (pointsWithDistanceNotYetDefined.length === 0) {
        return allPoints;
    }
    let _froms = [from];
    let _distance = 0;
    while (true) {
        _distance++;
        const closestPoints = findClosestTraversedPointsWithDistanceNotYetDefined(_froms, allPoints);
        if (closestPoints.length === 0) {
            return allPoints;
        }
        closestPoints.forEach(p => (p.distance = _distance));
        _froms = closestPoints;
    }
}

export function traverseEntireArea(intcodeProgramForRepairDroid: number[]) {
    const _intcodeComputer = intcodeComputer(intcodeProgramForRepairDroid);
    const drawMap = drawMapGenerator();
    let directionInstruction: Direction = Direction.North;
    let computerOutput = _intcodeComputer([directionInstruction]).output;
    let drawMapOutput = drawMap(computerOutput[0], directionInstruction);
    while (true) {
        directionInstruction = directionToExplore(drawMapOutput.currentPosition, drawMapOutput.map);
        if (directionInstruction) {
            computerOutput = _intcodeComputer([directionInstruction]).output;
            drawMapOutput = drawMap(computerOutput[0], directionInstruction);
        } else {
            const pointWithPotentialToExplore = findPointWithPotentialToExplore(
                drawMapOutput.currentPosition,
                drawMapOutput.map,
            );
            if (pointWithPotentialToExplore) {
                const path = findShortestPath(
                    drawMapOutput.currentPosition,
                    pointWithPotentialToExplore,
                    drawMapOutput.map,
                );
                let _from = drawMapOutput.currentPosition;
                path.forEach(p => {
                    const _direction = directionToAdjacentPoint(_from, p);
                    computerOutput = _intcodeComputer([_direction]).output;
                    drawMapOutput = drawMap(computerOutput[0], _direction);
                    if (computerOutput[0] !== DroidSignal.Traversable) {
                        printArea(drawMapOutput.map, val => (val ? val : ' '));
                        throw new Error(`we have a problem`);
                    }
                    _from = p;
                });
            } else {
                printArea(drawMapOutput.map, val => (val ? val : ' '));
                return drawMapOutput.map;
            }
            directionInstruction = directionToExplore(pointWithPotentialToExplore, drawMapOutput.map);
        }
    }
}
function directionToAdjacentPoint(from: Point, to: Point) {
    if (from.y < to.y) {
        return Direction.North;
    } else if (from.y > to.y) {
        return Direction.South;
    } else if (from.x < to.x) {
        return Direction.East;
    } else if (from.x > to.x) {
        return Direction.West;
    } else {
        throw new Error(`It seems that the 2 points are the same`);
    }
}

export function findShortestPathToOxigeneSystem(intcodeProgramForRepairDroid: number[]) {
    const map = traverseEntireArea(intcodeProgramForRepairDroid);
    const oxigenSystemPosition = pointsInMap(map).find(p => p.val === 'O');
    return findShortestPath({ x: 0, y: 0 }, oxigenSystemPosition, map);
}

export function minutesToFillWithOxigeneTheEntireArea(intcodeProgramForRepairDroid: number[]) {
    const map = traverseEntireArea(intcodeProgramForRepairDroid);
    const oxigenSystemPosition = pointsInMap(map).find(p => p.val === 'O');
    const pointsWithDistance = fillDistanceToAllPoints(oxigenSystemPosition, map);
    const distances = pointsWithDistance.map(p => p.distance);
    return Math.max(...distances);
}

// extra stuff
export function canExploreNorth(map: Map, currentPosition: { x: number; y: number }) {
    const _yCoords = yCoords(map);
    const lowY = currentPosition.y + 1;
    const highY = Math.max(..._yCoords);
    return _canExploreIncreasingDirection(map, lowY, highY, currentPosition, 'x');
}
export function canExploreSouth(map: Map, currentPosition: { x: number; y: number }) {
    const _yCoords = yCoords(map);
    const lowY = Math.min(..._yCoords);
    const highY = currentPosition.y;
    return _canExploreDecreasingDirection(map, lowY, highY, currentPosition, 'x');
}
export function canExploreEast(map: Map, currentPosition: { x: number; y: number }) {
    const _xCoords = xCoords(map);
    const lowX = currentPosition.x + 1;
    const highX = Math.max(..._xCoords);
    return _canExploreIncreasingDirection(map, lowX, highX, currentPosition, 'y');
}
export function canExploreWest(map: Map, currentPosition: { x: number; y: number }) {
    const _xCoords = xCoords(map);
    const lowX = Math.min(..._xCoords);
    const highX = currentPosition.x;
    return _canExploreDecreasingDirection(map, lowX, highX, currentPosition, 'y');
}
function yCoords(map: Map) {
    return Object.keys(map).map(y => parseInt(y));
}
function xCoords(map: Map) {
    return Object.values(map)
        .flatMap(l => Object.keys(l))
        .map(x => parseInt(x));
}
function _canExploreIncreasingDirection(
    map: Map,
    lowCoord: number,
    highCoord: number,
    currentPosition: { x: number; y: number },
    fixedAxis: 'x' | 'y',
) {
    const lineToWall: string[] = [];
    for (let i = lowCoord; i < highCoord; i++) {
        let space;
        switch (fixedAxis) {
            case 'x':
                space = map[i][currentPosition.x] ? map[i][currentPosition.x] : ' ';
                break;
            case 'y':
                space = map[currentPosition.y][i] ? map[currentPosition.y][i] : ' ';
                break;
        }
        lineToWall.push(space);
        if (space === '#') {
            break;
        }
    }
    return lineToWall.length === 0 ? true : !!lineToWall.find(space => space === ' ');
}
function _canExploreDecreasingDirection(
    map: Map,
    lowCoord: number,
    highCoord: number,
    currentPosition: { x: number; y: number },
    fixedAxis: 'x' | 'y',
) {
    const lineToWall: string[] = [];
    for (let i = highCoord; i > lowCoord; i--) {
        let space;
        switch (fixedAxis) {
            case 'x':
                space = map[i][currentPosition.x] ? map[i][currentPosition.x] : ' ';
                break;
            case 'y':
                space = map[currentPosition.y][i] ? map[currentPosition.y][i] : ' ';
                break;
        }
        lineToWall.push(space);
        if (space === '#') {
            break;
        }
    }
    return lineToWall.length === 0 ? true : !!lineToWall.find(space => space === ' ');
}
