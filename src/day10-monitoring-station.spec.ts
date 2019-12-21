import { expect } from 'chai';
import {
    asteroids,
    asteroidsInLineOfSight,
    asteroidWithMostAsteroidsInLineOfSight,
    sortAsteroidsInLineOfSightFromCloserToFurthest,
    sortAsteroidsInLineOfSightFrom_0_to_360_degrees,
    destroyAsteroids,
    solutionToQuiz2,
} from './day10-monitoring-station';
import { InputDataForDay10 } from './day10-monitoring-station.input-data';

describe('0 - asteroids', () => {
    const inputData = `.#..#
.....
#####
....#
...##`;
    const _asteroids = asteroids(inputData);
    it('0.1 - counts the number of asteroids in the map', () => {
        expect(_asteroids.length).to.equal(10);
    });
    it('0.2 - checks the coordinates of the first asteroid', () => {
        const firstAsteroid = _asteroids[0];
        expect(firstAsteroid.x).to.equal(1);
        expect(firstAsteroid.y).to.equal(0);
    });
    it('0.3 - checks the coordinates of the last asteroid', () => {
        const lastAsteroid = _asteroids[_asteroids.length - 1];
        expect(lastAsteroid.x).to.equal(4);
        expect(lastAsteroid.y).to.equal(4);
    });
});

describe('1 - asteroidsInLineOfSight', () => {
    const inputData = `.#..#
.....
#####
....#
...##`;
    const _asteroids = asteroids(inputData);
    it('1.1 - checks the number of asteroids in line with the first asteroid', () => {
        const asteroid = _asteroids[0];
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        expect(Object.values(_asteroidsInLine).length).to.equal(7);
    });
    it('1.2 - checks the number of asteroids in line with the last asteroid', () => {
        const asteroid = _asteroids[_asteroids.length - 1];
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        expect(Object.values(_asteroidsInLine).length).to.equal(7);
    });
    it('1.3 - checks the number of asteroids in line with the second last asteroid', () => {
        const asteroid = _asteroids[_asteroids.length - 2];
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        expect(Object.values(_asteroidsInLine).length).to.equal(8);
    });
    it('1.4 - checks the number of asteroids in line with the seventh asteroid', () => {
        const asteroid = _asteroids[6];
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        expect(Object.values(_asteroidsInLine).length).to.equal(5);
    });
    it('1.5 - checks the number of asteroids in line with the fourth asteroid', () => {
        const asteroid = _asteroids[3];
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        expect(Object.values(_asteroidsInLine).length).to.equal(7);
    });
    it('1.6 - checks the number of asteroids in line with the fifth asteroid', () => {
        const asteroid = _asteroids[4];
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        expect(Object.values(_asteroidsInLine).length).to.equal(7);
    });
});

describe('2 - asteroidWithMostAsteroidsInLineOfSight', () => {
    it(`2.1 - find the asteroid with the highest number of asteroids in line of sight from first "larger examples" 
    from the exercize text`, () => {
        const inputData = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;
        const _asteroids = asteroidWithMostAsteroidsInLineOfSight(inputData);
        expect(_asteroids.length).to.equal(1);
        const asteroidFound = _asteroids[0];
        expect(Object.values(asteroidFound.asteroidsInLineOfSight).length).to.equal(33);
        expect(asteroidFound.asteroid.x).to.equal(5);
        expect(asteroidFound.asteroid.y).to.equal(8);
    });
    it(`2.2 - find the asteroid with the highest number of asteroids in line of sight 
    from second "larger examples" from the exercize text`, () => {
        const inputData = `#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`;
        const _asteroids = asteroidWithMostAsteroidsInLineOfSight(inputData);
        expect(_asteroids.length).to.equal(1);
        const asteroidFound = _asteroids[0];
        expect(Object.values(asteroidFound.asteroidsInLineOfSight).length).to.equal(35);
        expect(asteroidFound.asteroid.x).to.equal(1);
        expect(asteroidFound.asteroid.y).to.equal(2);
    });
    it(`2.3 - find the asteroid with the highest number of asteroids in line of sight 
    from third "larger examples" from the exercize text`, () => {
        const inputData = `.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`;
        const _asteroids = asteroidWithMostAsteroidsInLineOfSight(inputData);
        expect(_asteroids.length).to.equal(1);
        const asteroidFound = _asteroids[0];
        expect(Object.values(asteroidFound.asteroidsInLineOfSight).length).to.equal(41);
        expect(asteroidFound.asteroid.x).to.equal(6);
        expect(asteroidFound.asteroid.y).to.equal(3);
    });
    it(`2. 4- find the asteroid with the highest number of asteroids in line of sight 
    from fourth "larger examples" from the exercize text`, () => {
        const inputData = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;
        const _asteroids = asteroidWithMostAsteroidsInLineOfSight(inputData);
        expect(_asteroids.length).to.equal(1);
        const asteroidFound = _asteroids[0];
        expect(Object.values(asteroidFound.asteroidsInLineOfSight).length).to.equal(210);
        expect(asteroidFound.asteroid.x).to.equal(11);
        expect(asteroidFound.asteroid.y).to.equal(13);
    });
});

describe('f - quizs', () => {
    it(`f.1 - first quiz`, () => {
        const _asteroids = asteroidWithMostAsteroidsInLineOfSight(InputDataForDay10);
        expect(_asteroids.length).to.equal(1);
        const asteroidFound = _asteroids[0];
        expect(Object.values(asteroidFound.asteroidsInLineOfSight).length).to.equal(284);
    });
});

describe('3 - sortAsteroidsInLineOfSightFromCloserToFurthest', () => {
    it(`3.1 - finds the closest and the furthest asteroids from the asteroid at position (0,0)
    when the asteroids are set along a diagonal`, () => {
        const inputData = `#....
.#...
..#..
...#.
....#`;
        const _asteroids = asteroids(inputData);
        const asteroid = _asteroids[0];
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        const asteroidsSorted = Object.values(sortAsteroidsInLineOfSightFromCloserToFurthest(_asteroidsInLine));
        expect(asteroidsSorted.length).to.equal(1);
        // the example has all asteroids in the diagonal from top left to bottom right
        // therefore the angle of the asteroids in line of sight for the asteroid at position (0,0)
        // is 45 degrees
        const asteroidsSortedAt45DegreesAngle = asteroidsSorted[0];
        const closest = asteroidsSortedAt45DegreesAngle[0];
        expect(closest.x).to.equal(1);
        expect(closest.y).to.equal(1);
        const furthest = asteroidsSortedAt45DegreesAngle[asteroidsSortedAt45DegreesAngle.length - 1];
        expect(furthest.x).to.equal(4);
        expect(furthest.y).to.equal(4);
    });
    it(`3.2 - finds the closest and the furthest asteroids from the asteroid at position (3,3)
    when asteroids are positioned horizontally`, () => {
        const inputData = `...#.
...#.
...#.
...#.
...#.`;
        const _asteroids = asteroids(inputData);
        const asteroid = _asteroids.find(a => a.x === 3 && a.y === 3);
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        const asteroidsSorted = Object.values(sortAsteroidsInLineOfSightFromCloserToFurthest(_asteroidsInLine));
        expect(asteroidsSorted.length).to.equal(2);
        // the example has all asteroids in aligned vertically
        // we take the line of asteroids with the highet number of asteroids
        const asteroidsSortedAt0DegreesAngle = asteroidsSorted.sort((as1, as2) => as2.length - as1.length)[0];
        const closest = asteroidsSortedAt0DegreesAngle[0];
        expect(closest.x).to.equal(0);
        expect(closest.y).to.equal(-1);
        const furthest = asteroidsSortedAt0DegreesAngle[asteroidsSortedAt0DegreesAngle.length - 1];
        expect(furthest.x).to.equal(0);
        expect(furthest.y).to.equal(-3);
    });
});

describe('4 - sortAsteroidsInLineOfSightFrom_0_to_360_degrees', () => {
    it(`4.1 - when asteroids are positioned horizontally and the central asteroid is at position (3,3)
    the first line of asteroids should be the one just up from the center, i.e. the one with 3 asteroids`, () => {
        const inputData = `...#.
...#.
...#.
...#.
...#.`;
        const _asteroids = asteroids(inputData);
        const asteroid = _asteroids.find(a => a.x === 3 && a.y === 3);
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        const asteroidsSortedByAngle = sortAsteroidsInLineOfSightFrom_0_to_360_degrees(_asteroidsInLine);
        expect(asteroidsSortedByAngle.length).to.equal(2);
        expect(asteroidsSortedByAngle[0].length).to.equal(3);
        expect(asteroidsSortedByAngle[1].length).to.equal(1);
    });
});

describe('5 - destroyAsteroids', () => {
    it(`5.1 - when asteroids are positioned horizontally and the central asteroid is at position (3,3)
    the first asteroids to be destroyed are those immediately above and below the center`, () => {
        const inputData = `...#.
...#.
...#.
...#.
...#.`;
        const _asteroids = asteroids(inputData);
        const asteroid = _asteroids.find(a => a.x === 3 && a.y === 3);
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        const asteroidsDestroyed = destroyAsteroids(_asteroidsInLine, asteroid);
        expect(asteroidsDestroyed.length).to.equal(4);
        expect(asteroidsDestroyed[0].x).to.equal(3);
        expect(asteroidsDestroyed[0].y).to.equal(2);
        expect(asteroidsDestroyed[1].x).to.equal(3);
        expect(asteroidsDestroyed[1].y).to.equal(4);
        expect(asteroidsDestroyed[2].x).to.equal(3);
        expect(asteroidsDestroyed[2].y).to.equal(1);
        expect(asteroidsDestroyed[3].x).to.equal(3);
        expect(asteroidsDestroyed[3].y).to.equal(0);
    });
    it(`5.2 - when asteroids are positioned along a diagonal and the central asteroid is at position (1,1)
    the first asteroids to be destroyed are those immediately above on the left below on the righ of the center`, () => {
        const inputData = `#....
.#...
..#..
...#.
....#`;
        const _asteroids = asteroids(inputData);
        const asteroid = _asteroids.find(a => a.x === 1 && a.y === 1);
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        const asteroidsDestroyed = destroyAsteroids(_asteroidsInLine, asteroid);
        expect(asteroidsDestroyed.length).to.equal(4);
        expect(asteroidsDestroyed[0].x).to.equal(2);
        expect(asteroidsDestroyed[0].y).to.equal(2);
        expect(asteroidsDestroyed[1].x).to.equal(0);
        expect(asteroidsDestroyed[1].y).to.equal(0);
        expect(asteroidsDestroyed[2].x).to.equal(3);
        expect(asteroidsDestroyed[2].y).to.equal(3);
        expect(asteroidsDestroyed[3].x).to.equal(4);
        expect(asteroidsDestroyed[3].y).to.equal(4);
    });
    it(`5.3 - when asteroids are positioned along the 2 diagonals and the central asteroid is at position (2,2)
    all the asteroids are destroyed in 2 rounds`, () => {
        const inputData = `#...#
.#.#.
..#..
.#.#.
#...#`;
        const _asteroids = asteroids(inputData);
        const asteroid = _asteroids.find(a => a.x === 2 && a.y === 2);
        const _asteroidsInLine = asteroidsInLineOfSight(asteroid, _asteroids);
        const asteroidsDestroyed = destroyAsteroids(_asteroidsInLine, asteroid);
        expect(asteroidsDestroyed[0].x).to.equal(3);
        expect(asteroidsDestroyed[0].y).to.equal(1);
        expect(asteroidsDestroyed[1].x).to.equal(3);
        expect(asteroidsDestroyed[1].y).to.equal(3);
        expect(asteroidsDestroyed[2].x).to.equal(1);
        expect(asteroidsDestroyed[2].y).to.equal(3);
        expect(asteroidsDestroyed[3].x).to.equal(1);
        expect(asteroidsDestroyed[3].y).to.equal(1);
    });
});

describe('6 - examples part 2', () => {
    it(`6.1 - first example of part 2`, () => {
        //   01234567890123456
        // 0 .#....#####...#..
        // 1 ##...##.#####..##
        // 2 ##...#...#.#####.
        // 3 ..#.....X...###..
        // 4 ..#.#.....#....##
        const inputData = `.#....#####...#..
##...##.#####..##
##...#...#.#####.
..#.....#...###..
..#.#.....#....##`;
        const _asteroids = asteroids(inputData);
        const centralAsteroid = _asteroids.find(a => a.x === 8 && a.y === 3);
        const _asteroidsInLine = asteroidsInLineOfSight(centralAsteroid, _asteroids);
        const destroyedAsteroids = destroyAsteroids(_asteroidsInLine, centralAsteroid);
        expect(destroyedAsteroids[8].x).to.equal(15);
        expect(destroyedAsteroids[8].y).to.equal(1);
        expect(destroyedAsteroids[12].x).to.equal(15);
        expect(destroyedAsteroids[12].y).to.equal(2);
        expect(destroyedAsteroids[15].x).to.equal(15);
        expect(destroyedAsteroids[15].y).to.equal(4);
        expect(destroyedAsteroids[16].y).to.equal(4);
        expect(destroyedAsteroids[16].x).to.equal(10);
        expect(destroyedAsteroids[17].x).to.equal(4);
        expect(destroyedAsteroids[17].y).to.equal(4);
        let numberOfAsteroids = destroyedAsteroids.length;
        numberOfAsteroids--;
        expect(destroyedAsteroids[numberOfAsteroids].x).to.equal(14);
        expect(destroyedAsteroids[numberOfAsteroids].y).to.equal(3);
        numberOfAsteroids--;
        expect(destroyedAsteroids[numberOfAsteroids].x).to.equal(13);
        expect(destroyedAsteroids[numberOfAsteroids].y).to.equal(3);
        numberOfAsteroids--;
        expect(destroyedAsteroids[numberOfAsteroids].x).to.equal(16);
        expect(destroyedAsteroids[numberOfAsteroids].y).to.equal(1);
        numberOfAsteroids--;
        expect(destroyedAsteroids[numberOfAsteroids].x).to.equal(14);
        expect(destroyedAsteroids[numberOfAsteroids].y).to.equal(0);
        numberOfAsteroids--;
        expect(destroyedAsteroids[numberOfAsteroids].x).to.equal(10);
        expect(destroyedAsteroids[numberOfAsteroids].y).to.equal(1);
        numberOfAsteroids--;
        expect(destroyedAsteroids[numberOfAsteroids].x).to.equal(8);
        expect(destroyedAsteroids[numberOfAsteroids].y).to.equal(0);
        numberOfAsteroids--;
        expect(destroyedAsteroids[numberOfAsteroids].x).to.equal(7);
        expect(destroyedAsteroids[numberOfAsteroids].y).to.equal(0);
        numberOfAsteroids--;
        expect(destroyedAsteroids[numberOfAsteroids].x).to.equal(6);
        expect(destroyedAsteroids[numberOfAsteroids].y).to.equal(0);
        numberOfAsteroids--;
        expect(destroyedAsteroids[numberOfAsteroids].x).to.equal(6);
        expect(destroyedAsteroids[numberOfAsteroids].y).to.equal(1);
    });
    it(`6.2 - second example of part 2`, () => {
        const inputData = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;
        const _asteroids = asteroidWithMostAsteroidsInLineOfSight(inputData);
        const centralAsteroid = _asteroids[0];
        const destroyedAsteroids = destroyAsteroids(centralAsteroid.asteroidsInLineOfSight, centralAsteroid.asteroid);
        expect(destroyedAsteroids[0].x).to.equal(11);
        expect(destroyedAsteroids[0].y).to.equal(12);
        expect(destroyedAsteroids[199].x).to.equal(8);
        expect(destroyedAsteroids[199].y).to.equal(2);
    });
});

describe('g - quizs', () => {
    it(`g.1 - second quiz`, () => {
        const result = solutionToQuiz2();
        expect(result).to.equal(284);
    });
});
