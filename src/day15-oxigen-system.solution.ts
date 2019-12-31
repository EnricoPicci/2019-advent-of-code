import { IntcodeProgramForRepairDroid } from './day15-oxigen-system.input-data';
import { findShortestPath, pointsInMap, findShortestPathToOxigeneSystem } from './day15-oxigen-system';
import { printArea } from './utils';

const map = findShortestPathToOxigeneSystem(IntcodeProgramForRepairDroid);
const oxigenSystemPosition = pointsInMap(map).find(p => p.val === 'O');
const shortestPath = findShortestPath({ x: 0, y: 0 }, oxigenSystemPosition, map);
const shortestPathLength = shortestPath.length;

printArea(map, val => (val ? val : ' '));

console.log(`oxigeSystemPosition`, oxigenSystemPosition);

const points = pointsInMap(map);
points.filter(p => p.val === '.').forEach(p => (map[p.y][p.x] = ' '));
const start = shortestPath[0];
map[start.y][start.x] = 'S';
for (let i = 1; i < shortestPath.length - 1; i++) {
    const p = shortestPath[i];
    map[p.y][p.x] = '.';
}

console.log(`shortestPathLength`, shortestPathLength);
printArea(map, val => (val ? val : ' '));
