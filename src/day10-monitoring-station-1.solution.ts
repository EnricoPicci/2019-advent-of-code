import { asteroidWithMostAsteroidsInLineOfSight } from './day10-monitoring-station';
import { InputDataForDay10 } from './day10-monitoring-station.input-data';

const _asteroids = asteroidWithMostAsteroidsInLineOfSight(InputDataForDay10);
const asteroidFound = _asteroids[0];
const result = Object.values(asteroidFound.asteroidsInLineOfSight).length;

console.log(`The result of test 1 of Day 10 is ${result}`);
