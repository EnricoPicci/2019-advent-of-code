import { IntcodeProgramForRepairDroid } from './day15-oxigen-system.input-data';
import { findShortestPath, pointsInMap, traverseEntireArea, fillDistanceToAllPoints } from './day15-oxigen-system';
import { printArea } from './utils';

const map = traverseEntireArea(IntcodeProgramForRepairDroid);
const oxigenSystemPosition = pointsInMap(map).find(p => p.val === 'O');
const shortestPath = findShortestPath({ x: 0, y: 0 }, oxigenSystemPosition, map);
const shortestPathLength = shortestPath.length;

printArea(map, val => (val ? val : ' '));

console.log(`oxigeSystemPosition`, oxigenSystemPosition);

console.log(`shortestPathLength`, shortestPathLength);

const pointsWithDistance = fillDistanceToAllPoints(oxigenSystemPosition, map);
const distances = pointsWithDistance.map(p => p.distance);
const distanceFromOrigin = pointsWithDistance.find(p => p.x === 0 && p.y === 0).distance;
const maxDistance = Math.max(...distances);

console.log(`minutes to fill with oxigen the entire area`, maxDistance, distanceFromOrigin);

// const points = pointsInMap(map);
// points.filter(p => p.val === '.').forEach(p => (map[p.y][p.x] = ' '));
// const start = shortestPath[0];
// map[start.y][start.x] = 'S';
// for (let i = 1; i < shortestPath.length - 1; i++) {
//     const p = shortestPath[i];
//     map[p.y][p.x] = '.';
// }
// printArea(map, val => (val ? val : ' '));
