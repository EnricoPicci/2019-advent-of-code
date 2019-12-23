import { expect } from 'chai';

import {
    PositionAndDirecton,
    moveGenerator,
    painterRobotGenerator,
    printSquares,
    squaresPainted,
    paint,
} from './day11-space-police';
import { IntcodeProgramForPaintingRobot } from './day11-space-police.input-data';

describe('1 - move', () => {
    it('1.1 - moves from position {x: 0, y:0} facing up after receiving the commend to move left', () => {
        const moveLeftCommand = 0;
        const start: PositionAndDirecton = { position: { x: 0, y: 0 }, direction: 'u' };
        const move = moveGenerator(start);
        const newPosition = move(moveLeftCommand);
        const expectedNewPositionAndDirection: PositionAndDirecton = { position: { x: -1, y: 0 }, direction: 'l' };
        expect(newPosition.direction).to.equal(expectedNewPositionAndDirection.direction);
        expect(newPosition.position.x).to.equal(expectedNewPositionAndDirection.position.x);
        expect(newPosition.position.y).to.equal(expectedNewPositionAndDirection.position.y);
    });
    it('1.2 - moves from position {x: 1, y:1} facing up after receiving the commend to move right', () => {
        const moveLeftCommand = 1;
        const start: PositionAndDirecton = { position: { x: 1, y: 1 }, direction: 'u' };
        const move = moveGenerator(start);
        const newPosition = move(moveLeftCommand);
        const expectedNewPositionAndDirection: PositionAndDirecton = { position: { x: 2, y: 1 }, direction: 'r' };
        expect(newPosition.direction).to.equal(expectedNewPositionAndDirection.direction);
        expect(newPosition.position.x).to.equal(expectedNewPositionAndDirection.position.x);
        expect(newPosition.position.y).to.equal(expectedNewPositionAndDirection.position.y);
    });
    it('1.3 - moves from position {x: 2, y:2} facing left after receiving the commend to move left', () => {
        const moveLeftCommand = 0;
        const start: PositionAndDirecton = { position: { x: 2, y: 2 }, direction: 'l' };
        const move = moveGenerator(start);
        const newPosition = move(moveLeftCommand);
        const expectedNewPositionAndDirection: PositionAndDirecton = { position: { x: 2, y: 1 }, direction: 'd' };
        expect(newPosition.direction).to.equal(expectedNewPositionAndDirection.direction);
        expect(newPosition.position.x).to.equal(expectedNewPositionAndDirection.position.x);
        expect(newPosition.position.y).to.equal(expectedNewPositionAndDirection.position.y);
    });
    it('1.4 - moves from position {x: 2, y:2} facing left after receiving the commend to move right', () => {
        const moveLeftCommand = 1;
        const start: PositionAndDirecton = { position: { x: 2, y: 2 }, direction: 'l' };
        const move = moveGenerator(start);
        const newPosition = move(moveLeftCommand);
        const expectedNewPositionAndDirection: PositionAndDirecton = { position: { x: 2, y: 3 }, direction: 'u' };
        expect(newPosition.direction).to.equal(expectedNewPositionAndDirection.direction);
        expect(newPosition.position.x).to.equal(expectedNewPositionAndDirection.position.x);
        expect(newPosition.position.y).to.equal(expectedNewPositionAndDirection.position.y);
    });
    it('1.5 - moves from position {x: 2, y:2} facing down after receiving the commend to move left', () => {
        const moveLeftCommand = 0;
        const start: PositionAndDirecton = { position: { x: 2, y: 2 }, direction: 'd' };
        const move = moveGenerator(start);
        const newPosition = move(moveLeftCommand);
        const expectedNewPositionAndDirection: PositionAndDirecton = { position: { x: 3, y: 2 }, direction: 'r' };
        expect(newPosition.direction).to.equal(expectedNewPositionAndDirection.direction);
        expect(newPosition.position.x).to.equal(expectedNewPositionAndDirection.position.x);
        expect(newPosition.position.y).to.equal(expectedNewPositionAndDirection.position.y);
    });
    it('1.6 - moves from position {x: 2, y:2} facing down after receiving the commend to move right', () => {
        const moveLeftCommand = 1;
        const start: PositionAndDirecton = { position: { x: 2, y: 2 }, direction: 'd' };
        const move = moveGenerator(start);
        const newPosition = move(moveLeftCommand);
        const expectedNewPositionAndDirection: PositionAndDirecton = { position: { x: 1, y: 2 }, direction: 'l' };
        expect(newPosition.direction).to.equal(expectedNewPositionAndDirection.direction);
        expect(newPosition.position.x).to.equal(expectedNewPositionAndDirection.position.x);
        expect(newPosition.position.y).to.equal(expectedNewPositionAndDirection.position.y);
    });
    it('1.7 - moves from position {x: 2, y:2} facing right after receiving the commend to move left', () => {
        const moveLeftCommand = 0;
        const start: PositionAndDirecton = { position: { x: 2, y: 2 }, direction: 'r' };
        const move = moveGenerator(start);
        const newPosition = move(moveLeftCommand);
        const expectedNewPositionAndDirection: PositionAndDirecton = { position: { x: 2, y: 3 }, direction: 'u' };
        expect(newPosition.direction).to.equal(expectedNewPositionAndDirection.direction);
        expect(newPosition.position.x).to.equal(expectedNewPositionAndDirection.position.x);
        expect(newPosition.position.y).to.equal(expectedNewPositionAndDirection.position.y);
    });
    it('1.8 - moves from position {x: 2, y:2} facing right after receiving the commend to move right', () => {
        const moveLeftCommand = 1;
        const start: PositionAndDirecton = { position: { x: 2, y: 2 }, direction: 'r' };
        const move = moveGenerator(start);
        const newPosition = move(moveLeftCommand);
        const expectedNewPositionAndDirection: PositionAndDirecton = { position: { x: 2, y: 1 }, direction: 'd' };
        expect(newPosition.direction).to.equal(expectedNewPositionAndDirection.direction);
        expect(newPosition.position.x).to.equal(expectedNewPositionAndDirection.position.x);
        expect(newPosition.position.y).to.equal(expectedNewPositionAndDirection.position.y);
    });
    it('1.9 - moves left 4 times from position {x: 2, y:2} facing up. Should return to the starting position', () => {
        const moveLeftCommand = 0;
        const start: PositionAndDirecton = { position: { x: 2, y: 2 }, direction: 'u' };
        const move = moveGenerator(start);
        move(moveLeftCommand);
        move(moveLeftCommand);
        move(moveLeftCommand);
        const endPosition = move(moveLeftCommand);
        expect(endPosition.direction).to.equal(start.direction);
        expect(endPosition.position.x).to.equal(start.position.x);
        expect(endPosition.position.y).to.equal(start.position.y);
    });
    it('1.10 - moves right 4 times from position {x: 2, y:2} facing up. Should return to the starting position', () => {
        const moveLeftCommand = 1;
        const start: PositionAndDirecton = { position: { x: 2, y: 2 }, direction: 'u' };
        const move = moveGenerator(start);
        move(moveLeftCommand);
        move(moveLeftCommand);
        move(moveLeftCommand);
        const endPosition = move(moveLeftCommand);
        expect(endPosition.direction).to.equal(start.direction);
        expect(endPosition.position.x).to.equal(start.position.x);
        expect(endPosition.position.y).to.equal(start.position.y);
    });
});

describe('2 - painterRobotGenerator and squaresPainted', () => {
    const painterRobot = painterRobotGenerator();
    painterRobot(1, 0);
    painterRobot(0, 0);
    painterRobot(1, 0);
    painterRobot(1, 0);
    painterRobot(0, 1);
    painterRobot(1, 0);
    const squares = painterRobot(1, 0).squares;
    it('2.1 - paints few squares', () => {
        printSquares(squares);
        expect(squares[-1][-1]).to.equal(1);
        expect(squares[-1][0]).to.equal(1);
        expect(squares[0][-1]).to.equal(0);
        expect(squares[0][0]).to.equal(0);
        expect(squares[0][1]).to.equal(1);
        expect(squares[1][1]).to.equal(1);
    });
    it('2.2 - counts the squares painted', () => {
        const _squaresPainted = squaresPainted(squares);
        expect(_squaresPainted.length).to.equal(6);
    });
});

describe('3 - paint', () => {
    it('3.1 - paints the plate and counts the squares painted', () => {
        const squares = paint(IntcodeProgramForPaintingRobot);
        const _squaresPainted = squaresPainted(squares);
        expect(_squaresPainted.length).to.equal(2016);
    });
});
