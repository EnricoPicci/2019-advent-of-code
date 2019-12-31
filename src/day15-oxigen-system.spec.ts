import { expect } from 'chai';
import {
    drawMapGenerator,
    DroidSignal,
    Direction,
    countElementsInMap,
    placePointInMap,
    Map,
    canExploreNorth,
    canExploreSouth,
    canExploreEast,
    canExploreWest,
    findPointWithPotentialToExplore,
    findShortestPath,
    fillDistance,
    findClosestTraversedPoints,
    findShortestPathToOxigeneSystem,
    minutesToFillWithOxigeneTheEntireArea,
} from './day15-oxigen-system';
import { IntcodeProgramForRepairDroid } from './day15-oxigen-system.input-data';

describe('1 - drawMapGenerator', () => {
    it('1.1 - after one move the Droid finds a wall', () => {
        const drawMap = drawMapGenerator();
        const map = drawMap(DroidSignal.Wall, Direction.North).map;
        expect(map[0][0]).to.equal('D');
        expect(map[1][0]).to.equal('#');
    });
    it('1.2 - after one move the Droid finds a wall and then moves East', () => {
        const drawMap = drawMapGenerator();
        drawMap(DroidSignal.Wall, Direction.North);
        const map = drawMap(DroidSignal.Traversable, Direction.East).map;
        expect(map[0][0]).to.equal('.');
        expect(map[1][0]).to.equal('#');
        expect(map[0][1]).to.equal('D');
    });
    it('1.3 - after some moves the Droid finds itself in a dead end', () => {
        const drawMap = drawMapGenerator();
        drawMap(DroidSignal.Wall, Direction.North);
        drawMap(DroidSignal.Traversable, Direction.East);
        drawMap(DroidSignal.Wall, Direction.North);
        drawMap(DroidSignal.Wall, Direction.South);
        const map = drawMap(DroidSignal.Wall, Direction.East).map;
        expect(map[0][0]).to.equal('.');
        expect(map[1][0]).to.equal('#');
        expect(map[0][1]).to.equal('D');
        expect(map[1][1]).to.equal('#');
        expect(map[0][2]).to.equal('#');
        expect(map[-1][1]).to.equal('#');
        expect(countElementsInMap(map)).to.equal(6);
    });
    it('1.4 - turns back from the dead end', () => {
        const drawMap = drawMapGenerator();
        drawMap(DroidSignal.Wall, Direction.North);
        drawMap(DroidSignal.Traversable, Direction.East);
        drawMap(DroidSignal.Wall, Direction.North);
        drawMap(DroidSignal.Wall, Direction.South);
        drawMap(DroidSignal.Wall, Direction.East);
        const map = drawMap(DroidSignal.Traversable, Direction.West).map;
        expect(map[0][0]).to.equal('D');
        expect(map[1][0]).to.equal('#');
        expect(map[0][1]).to.equal('.');
        expect(map[1][1]).to.equal('#');
        expect(map[0][2]).to.equal('#');
        expect(map[-1][1]).to.equal('#');
        expect(countElementsInMap(map)).to.equal(6);
    });
    it('1.5 - it finally finds the oxigen', () => {
        const drawMap = drawMapGenerator();
        drawMap(DroidSignal.Wall, Direction.North);
        drawMap(DroidSignal.Traversable, Direction.East);
        drawMap(DroidSignal.Wall, Direction.North);
        drawMap(DroidSignal.Wall, Direction.South);
        drawMap(DroidSignal.Wall, Direction.East);
        drawMap(DroidSignal.Traversable, Direction.West);
        drawMap(DroidSignal.Wall, Direction.West);
        drawMap(DroidSignal.Traversable, Direction.South);
        drawMap(DroidSignal.Wall, Direction.South);
        const map = drawMap(DroidSignal.Oxigen, Direction.West).map;
        expect(map[1][0]).to.equal('#');
        expect(map[1][1]).to.equal('#');
        expect(map[0][-1]).to.equal('#');
        expect(map[0][0]).to.equal('.');
        expect(map[0][1]).to.equal('.');
        expect(map[0][2]).to.equal('#');
        expect(map[-1][-1]).to.equal('O');
        expect(map[-1][0]).to.equal('.');
        expect(map[-1][1]).to.equal('#');
        expect(map[-2][0]).to.equal('#');
        expect(countElementsInMap(map)).to.equal(10);
    });
});

describe('2 - canExploreNorth', () => {
    it('2.1 - North can be explored since there is just unexplored space', () => {
        //     .#
        //    D#
        const currentPosition = { x: 0, y: 0 };
        const map: Map = {};
        placePointInMap('D', map, currentPosition);
        placePointInMap('#', map, { x: 1, y: 0 });

        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('#', map, { x: 2, y: 1 });

        expect(canExploreNorth(map, currentPosition)).to.be.true;
    });
    it('2.2 - North can be explored since there is one unexplored space', () => {
        //    ##
        //    #..#
        //     .#
        //    D#
        const currentPosition = { x: 0, y: 0 };
        const map: Map = {};
        placePointInMap('D', map, currentPosition);
        placePointInMap('#', map, { x: 1, y: 0 });

        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('#', map, { x: 2, y: 1 });

        placePointInMap('#', map, { x: 0, y: 2 });
        placePointInMap('.', map, { x: 1, y: 2 });
        placePointInMap('.', map, { x: 2, y: 2 });
        placePointInMap('#', map, { x: 3, y: 2 });

        placePointInMap('#', map, { x: 0, y: 3 });
        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreNorth(map, currentPosition)).to.be.true;
    });
    it('2.3 - North can not be explored since there is a wall', () => {
        //    ##
        //    #..#
        //    D.#
        //     #
        const currentPosition = { x: 0, y: 1 };
        const map: Map = {};
        placePointInMap('#', map, { x: 1, y: 0 });

        placePointInMap('D', map, currentPosition);
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('#', map, { x: 2, y: 1 });

        placePointInMap('#', map, { x: 0, y: 2 });
        placePointInMap('.', map, { x: 1, y: 2 });
        placePointInMap('.', map, { x: 2, y: 2 });
        placePointInMap('#', map, { x: 3, y: 2 });

        placePointInMap('#', map, { x: 0, y: 3 });
        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreNorth(map, currentPosition)).to.be.false;
    });
    it('2.4 - North can not be explored since there is no unexplored space', () => {
        //    ##
        //    #..#
        //    ..#
        //    D#
        const currentPosition = { x: 0, y: 0 };
        const map: Map = {};
        placePointInMap('D', map, currentPosition);
        placePointInMap('#', map, { x: 1, y: 0 });

        placePointInMap('.', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('#', map, { x: 2, y: 1 });

        placePointInMap('#', map, { x: 0, y: 2 });
        placePointInMap('.', map, { x: 1, y: 2 });
        placePointInMap('.', map, { x: 2, y: 2 });
        placePointInMap('#', map, { x: 3, y: 2 });

        placePointInMap('#', map, { x: 0, y: 3 });
        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreNorth(map, currentPosition)).to.be.false;
    });
});

describe('3 - canExploreSouth', () => {
    it('3.1 - South can be explored since there is just unexplored space', () => {
        //     .#
        //    D#
        const currentPosition = { x: 0, y: 0 };
        const map: Map = {};
        placePointInMap('D', map, currentPosition);
        placePointInMap('#', map, { x: 1, y: 0 });

        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('#', map, { x: 2, y: 1 });

        expect(canExploreSouth(map, currentPosition)).to.be.true;
    });
    it('3.2 - South can be explored since there is one unexplored space', () => {
        //    D#
        //     #
        //    ...#
        //    ..#
        const currentPosition = { x: 0, y: 3 };
        const map: Map = {};

        placePointInMap('.', map, { x: 0, y: 0 });
        placePointInMap('.', map, { x: 1, y: 0 });
        placePointInMap('#', map, { x: 2, y: 0 });

        placePointInMap('.', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('.', map, { x: 2, y: 1 });
        placePointInMap('#', map, { x: 3, y: 1 });

        placePointInMap('#', map, { x: 1, y: 2 });

        placePointInMap('D', map, currentPosition);
        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreSouth(map, currentPosition)).to.be.true;
    });
    it('3.3 - South can not be explored since there is a wall', () => {
        //    D#
        //    #
        //    #..#
        //     .#
        const currentPosition = { x: 0, y: 3 };
        const map: Map = {};

        placePointInMap('.', map, { x: 1, y: 0 });
        placePointInMap('#', map, { x: 2, y: 0 });

        placePointInMap('#', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('.', map, { x: 2, y: 1 });
        placePointInMap('#', map, { x: 3, y: 1 });

        placePointInMap('#', map, { x: 0, y: 2 });

        placePointInMap('D', map, currentPosition);
        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreSouth(map, currentPosition)).to.be.false;
    });
    it('3.4 - South can not be explored since there is no unexplored space', () => {
        //    D#
        //    .#
        //    #..#
        //     .#
        const currentPosition = { x: 0, y: 3 };
        const map: Map = {};

        placePointInMap('.', map, { x: 1, y: 0 });
        placePointInMap('#', map, { x: 2, y: 0 });

        placePointInMap('#', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('.', map, { x: 2, y: 1 });
        placePointInMap('#', map, { x: 3, y: 1 });

        placePointInMap('.', map, { x: 0, y: 2 });
        placePointInMap('#', map, { x: 1, y: 2 });

        placePointInMap('D', map, currentPosition);
        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreSouth(map, currentPosition)).to.be.false;
    });
});

describe('4 - canExploreEast', () => {
    it('4.1 - East can be explored since there is just unexplored space', () => {
        //     .#
        //    D
        const currentPosition = { x: 0, y: 0 };
        const map: Map = {};
        placePointInMap('D', map, currentPosition);

        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('#', map, { x: 2, y: 1 });

        expect(canExploreEast(map, currentPosition)).to.be.true;
    });
    it('4.2 - East can be explored since there is one unexplored space', () => {
        //     #
        //     #
        //    #..#
        //    D .#
        const currentPosition = { x: 0, y: 0 };
        const map: Map = {};

        placePointInMap('D', map, currentPosition);
        placePointInMap('.', map, { x: 2, y: 0 });
        placePointInMap('#', map, { x: 3, y: 0 });

        placePointInMap('#', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('.', map, { x: 2, y: 1 });
        placePointInMap('#', map, { x: 3, y: 1 });

        placePointInMap('#', map, { x: 1, y: 2 });

        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreEast(map, currentPosition)).to.be.true;
    });
    it('4.3 - East can not be explored since there is a wall', () => {
        //     #
        //     #
        //    #..#
        //    D#.#
        const currentPosition = { x: 0, y: 0 };
        const map: Map = {};

        placePointInMap('D', map, currentPosition);
        placePointInMap('#', map, { x: 1, y: 0 });
        placePointInMap('.', map, { x: 2, y: 0 });
        placePointInMap('#', map, { x: 3, y: 0 });

        placePointInMap('#', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('.', map, { x: 2, y: 1 });
        placePointInMap('#', map, { x: 3, y: 1 });

        placePointInMap('#', map, { x: 1, y: 2 });

        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreEast(map, currentPosition)).to.be.false;
    });
    it('4.4 - East can not be explored since there is no unexplored space', () => {
        //     #
        //     #
        //    #..#
        //    D..#
        const currentPosition = { x: 0, y: 0 };
        const map: Map = {};

        placePointInMap('D', map, currentPosition);
        placePointInMap('.', map, { x: 1, y: 0 });
        placePointInMap('.', map, { x: 2, y: 0 });
        placePointInMap('#', map, { x: 3, y: 0 });

        placePointInMap('#', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('.', map, { x: 2, y: 1 });
        placePointInMap('#', map, { x: 3, y: 1 });

        placePointInMap('#', map, { x: 1, y: 2 });

        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreEast(map, currentPosition)).to.be.false;
    });
});

describe('5 - canExploreWest', () => {
    it('5.1 - West can be explored since there is just unexplored space', () => {
        //     .#
        //    D
        const currentPosition = { x: 0, y: 0 };
        const map: Map = {};
        placePointInMap('D', map, currentPosition);

        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('#', map, { x: 2, y: 1 });

        expect(canExploreWest(map, currentPosition)).to.be.true;
    });
    it('5.2 - West can be explored since there is one unexplored space', () => {
        //     #
        //     #
        //    #..#
        //    #. D
        const currentPosition = { x: 3, y: 0 };
        const map: Map = {};

        placePointInMap('#', map, { x: 0, y: 0 });
        placePointInMap('.', map, { x: 1, y: 0 });
        placePointInMap('D', map, currentPosition);

        placePointInMap('#', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('.', map, { x: 2, y: 1 });
        placePointInMap('#', map, { x: 3, y: 1 });

        placePointInMap('#', map, { x: 1, y: 2 });

        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreWest(map, currentPosition)).to.be.true;
    });
    it('5.3 - West can not be explored since there is a wall', () => {
        //     #
        //     #
        //    #..#
        //     .#D
        const currentPosition = { x: 3, y: 0 };
        const map: Map = {};

        placePointInMap('.', map, { x: 1, y: 0 });
        placePointInMap('#', map, { x: 2, y: 0 });
        placePointInMap('D', map, currentPosition);

        placePointInMap('#', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('.', map, { x: 2, y: 1 });
        placePointInMap('#', map, { x: 3, y: 1 });

        placePointInMap('#', map, { x: 1, y: 2 });

        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreWest(map, currentPosition)).to.be.false;
    });
    it('5.4 - West can not be explored since there is no unexplored space', () => {
        //     #
        //     #
        //    #..#
        //    #..D
        const currentPosition = { x: 3, y: 0 };
        const map: Map = {};

        placePointInMap('#', map, { x: 0, y: 0 });
        placePointInMap('.', map, { x: 1, y: 0 });
        placePointInMap('.', map, { x: 2, y: 0 });
        placePointInMap('D', map, currentPosition);

        placePointInMap('#', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('.', map, { x: 2, y: 1 });
        placePointInMap('#', map, { x: 3, y: 1 });

        placePointInMap('#', map, { x: 1, y: 2 });

        placePointInMap('#', map, { x: 1, y: 3 });

        expect(canExploreWest(map, currentPosition)).to.be.false;
    });
});

describe('6 - findPointWithPotentialToExplore', () => {
    it('6.1 - There are points with potential to start exploration', () => {
        const input = `.#
D`;
        const currentPosition = { x: 0, y: 0 };
        const map = buildMap(input);
        expect(findPointWithPotentialToExplore(currentPosition, map)).to.be.not.undefined;
    });
    it('6.2 - There is one point with potential to start exploration', () => {
        const input = `###
#D#
#.#
 ..`;
        const map = buildMap(input);
        const currentPosition = { x: 1, y: 2 };
        expect(findPointWithPotentialToExplore(currentPosition, map)).to.be.not.undefined;
    });
    it('6.3 - There is one point with potential to start exploration', () => {
        //  ###
        //  #D#
        //  #.#
        //  #.#
        const currentPosition = { x: 1, y: 2 };
        const map: Map = {};

        placePointInMap('#', map, { x: 1, y: 0 });
        placePointInMap('.', map, { x: 1, y: 0 });
        placePointInMap('#', map, { x: 2, y: 0 });

        placePointInMap('#', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('#', map, { x: 2, y: 1 });

        placePointInMap('#', map, { x: 0, y: 2 });
        placePointInMap('D', map, currentPosition);
        placePointInMap('#', map, { x: 2, y: 2 });

        placePointInMap('#', map, { x: 0, y: 3 });
        placePointInMap('#', map, { x: 1, y: 3 });
        placePointInMap('#', map, { x: 2, y: 3 });

        expect(findPointWithPotentialToExplore(currentPosition, map)).to.be.not.undefined;
        expect(findPointWithPotentialToExplore(currentPosition, map).x).to.equal(1);
        expect(findPointWithPotentialToExplore(currentPosition, map).y).to.equal(0);
    });
    it('6.4 - There is one point with potential to start exploration', () => {
        //  ###
        //  #D#
        //  #..
        //  ###
        const currentPosition = { x: 1, y: 2 };
        const map: Map = {};

        placePointInMap('#', map, { x: 1, y: 0 });
        placePointInMap('#', map, { x: 1, y: 0 });
        placePointInMap('#', map, { x: 2, y: 0 });

        placePointInMap('#', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });
        placePointInMap('.', map, { x: 2, y: 1 });

        placePointInMap('#', map, { x: 0, y: 2 });
        placePointInMap('D', map, currentPosition);
        placePointInMap('#', map, { x: 2, y: 2 });

        placePointInMap('#', map, { x: 0, y: 3 });
        placePointInMap('#', map, { x: 1, y: 3 });
        placePointInMap('#', map, { x: 2, y: 3 });

        const point = findPointWithPotentialToExplore(currentPosition, map);
        expect(point).to.be.not.undefined;
        expect(findPointWithPotentialToExplore(currentPosition, map).x).to.equal(2);
        expect(findPointWithPotentialToExplore(currentPosition, map).y).to.equal(1);
    });
    it('6.5 - There is one point with potential to start exploration', () => {
        //   #
        //  #D#
        //  #.
        //   #
        const currentPosition = { x: 1, y: 2 };
        const map: Map = {};

        placePointInMap('#', map, { x: 1, y: 0 });

        placePointInMap('#', map, { x: 0, y: 1 });
        placePointInMap('.', map, { x: 1, y: 1 });

        placePointInMap('#', map, { x: 0, y: 2 });
        placePointInMap('D', map, currentPosition);
        placePointInMap('#', map, { x: 2, y: 2 });

        placePointInMap('#', map, { x: 1, y: 3 });

        const point = findPointWithPotentialToExplore(currentPosition, map);
        expect(point).to.be.not.undefined;
        expect(findPointWithPotentialToExplore(currentPosition, map).x).to.equal(1);
        expect(findPointWithPotentialToExplore(currentPosition, map).y).to.equal(1);
    });
});

describe('7 - fillDistance', () => {
    it('7.1 - fill the distances on a map', () => {
        const input = `# .
#.......
#...##.#
#......`;
        const from = { x: 2, y: 1 };
        const to = { x: 6, y: 1 };
        const map = buildMap(input);
        const points = fillDistance(from, to, map);
        expect(points).to.be.not.undefined;
        const targetPoint = points.find(p => p.x === to.x && p.y === to.y);
        expect(targetPoint.distance).to.equal(6);
        let lastPoint = targetPoint;
        for (let i = 5; i > 0; i--) {
            const point_N_from_targetPoint = findClosestTraversedPoints(lastPoint, points).find(p => p.distance === i);
            expect(point_N_from_targetPoint).to.be.not.undefined;
            lastPoint = point_N_from_targetPoint;
        }
    });
});

describe('8 - findShortestPath', () => {
    it('8.1 - find the shortest path which is an horizontal line', () => {
        const input = `#
#D#
#...
#`;
        const map = buildMap(input);
        const path = findShortestPath({ x: 1, y: 1 }, { x: 3, y: 1 }, map);
        expect(path).to.be.not.undefined;
        expect(path.length).to.equal(2);
        expect(path[1].x).to.equal(3);
    });
    it('8.2 - find the shortest path which is a vertical line', () => {
        const input = `# .
#D.#
#...
#..`;
        const map = buildMap(input);
        const path = findShortestPath({ x: 2, y: 3 }, { x: 2, y: 0 }, map);
        expect(path).to.be.not.undefined;
        expect(path.length).to.equal(3);
        expect(path[path.length - 1].y).to.equal(0);
    });
    it('8.3 - find the shortest path which has some 90 degrees turns', () => {
        const input = `# .
#D.#
#...
#..`;
        const map = buildMap(input);
        const path = findShortestPath({ x: 1, y: 0 }, { x: 3, y: 1 }, map);
        expect(path).to.be.not.undefined;
        expect(path.length).to.equal(3);
        expect(path[path.length - 1].y).to.equal(1);
        expect(path[path.length - 1].x).to.equal(3);
    });
    it('8.4 - find the shortest between 2 points divivded by a wall', () => {
        const input = `# .
#.......
#...##.#
#......`;
        const map = buildMap(input);
        const path = findShortestPath({ x: 2, y: 1 }, { x: 6, y: 1 }, map);
        expect(path).to.be.not.undefined;
        expect(path.length).to.equal(6);
        expect(path[path.length - 1].y).to.equal(1);
        expect(path[path.length - 1].x).to.equal(6);
    });
    it('8.5 - find the shortest between 2 points in a complex map', () => {
        const input = `##### ######### ####### ##### ####### #
.....#.........#.......#.....#.......#.#
.###. .###.###.#.#.#####.#.###.#.###.#.#
.#... ...#.#.....#.#.....#.....#...#.#.#
.#.   ##.#.#.#####.#.########## ##.#.#.#
. .   ...#.#.#...#.#.#.........#...#.#.#
##.   .## .###.#.## .#####.#.## .###.#.#
...   ...#.....#...#.....#.#...#...#...#
. ######.#########.     .#####.###. ##.#
. .........#.....#.     .#.....#...#...#
.#.######## .## .#.     .#.#.###. ##.##
.......#...#...#...     .#.#.#...#.....#
########. .# #.#########.#.#.#.########
...#..... .#  ...........#.#.#.........#
. .#. # ##.#############.#.#.#########.
. ...#.#...#...........#.#.#.........#.
. ####.#.## .##   ####.#.#.#.#########.
. ...#...#  ...#  .....#...#.#.........
.#.#. .#######.   .#########.#.     ###
...#. .......#.   .........#.#.     ...#
 ## .       .#.     #     .## . ####. .#
    .       .#.     .#    ...#. ..... .#
  ##. ##### .#.     .#      .#. . ### .#
  ... .....#...     .#      ... .#...#.#
##. ##.###.######   .######## ##.#.## .#
... ...#  .......#  .........#... ...#.#
.   .##    #####. ####### # .#. ##.#. .#
.   .#          . .......#.#... ...#. .#
.###.#          .#.###.#.#.#####.## . .#
.....#          ...#...#...#.......#. .#
 ####            ## .#######.#######. .#
                    .........#    ... .#
                     ########     .###.#
                                  .....#
                                   ####`;
        const map = buildMap(input);
        const path = findShortestPath({ x: 20, y: 13 }, { x: 0, y: 29 }, map);
        expect(path).to.be.not.undefined;
        expect(path.length).to.equal(412);
        expect(path[path.length - 1].y).to.equal(29);
        expect(path[path.length - 1].x).to.equal(0);
    });
});

describe('f - quizs', () => {
    it('f.1 - first quiz - find the length of the shortest path to the oxigen system', () => {
        const shortestPath = findShortestPathToOxigeneSystem(IntcodeProgramForRepairDroid);
        expect(shortestPath.length).to.equal(412);
    });
    it('f.2 - second quiz - find how many minutes it takes to fill the entire area with oxigene', () => {
        const minutes = minutesToFillWithOxigeneTheEntireArea(IntcodeProgramForRepairDroid);
        expect(minutes).to.equal(418);
    });
});

function buildMap(input: string) {
    return input
        .split('\n')
        .reverse()
        .reduce((map, line, y) => {
            map[y] = {};
            line.split('').forEach((point, x) => (map[y][x] = point));
            return map;
        }, {} as Map);
}

describe('x - buildMap', () => {
    it('x.1 - builds a map', () => {
        const input = `#
#D#
#.
#`;
        const map = buildMap(input);
        expect(Object.keys(map).length).to.equal(4);
        expect(Object.keys(map[0]).length).to.equal(1);
        expect(Object.keys(map[1]).length).to.equal(2);
        expect(Object.keys(map[2]).length).to.equal(3);
        expect(Object.keys(map[3]).length).to.equal(1);
        expect(map[0][0]).to.equal('#');
        expect(map[1][0]).to.equal('#');
        expect(map[1][1]).to.equal('.');
        expect(map[2][0]).to.equal('#');
        expect(map[2][1]).to.equal('D');
        expect(map[2][2]).to.equal('#');
        expect(map[3][0]).to.equal('#');
    });
});
