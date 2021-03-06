import { intcodeComputer } from './intcode-computer-1';
import { printArea } from './utils';

type Position = { x: number; y: number };

type Direction = 'u' | 'l' | 'd' | 'r';
const nextDirectionForUp: [Direction, Direction] = ['l', 'r'];
const nextDirectionForLeft: [Direction, Direction] = ['d', 'u'];
const nextDirectionForDown: [Direction, Direction] = ['r', 'l'];
const nextDirectionForRight: [Direction, Direction] = ['u', 'd'];
const nextDirections: { [key in Direction]: [Direction, Direction] } = {
    u: nextDirectionForUp,
    l: nextDirectionForLeft,
    d: nextDirectionForDown,
    r: nextDirectionForRight,
};

const Moves: { [key in Direction]: (position: Position) => Position } = {
    u: from => ({ x: from.x, y: from.y + 1 }),
    l: from => ({ x: from.x - 1, y: from.y }),
    d: from => ({ x: from.x, y: from.y - 1 }),
    r: from => ({ x: from.x + 1, y: from.y }),
};

export type PositionAndDirecton = {
    position: Position;
    direction: Direction;
};
type TurnLeftRightCommand = 0 | 1;
type BlackWhite = 0 | 1;

export function moveGenerator(start: PositionAndDirecton) {
    let _start = start;
    return function _move(command: TurnLeftRightCommand) {
        const newDirection = nextDirections[_start.direction][command];
        const newPostion = Moves[newDirection](_start.position);
        _start = { position: newPostion, direction: newDirection };
        return _start;
    };
}

export function painterRobotGenerator() {
    let _positionAndDirecton: PositionAndDirecton = { position: { x: 0, y: 0 }, direction: 'u' };
    const squares: { [y: number]: { [x: number]: BlackWhite } } = {};
    const move = moveGenerator(_positionAndDirecton);
    return function _paintAndMove(color: BlackWhite, moveCommand: TurnLeftRightCommand) {
        const currentPosition = _positionAndDirecton.position;
        squares[currentPosition.y] = squares[currentPosition.y] ? squares[currentPosition.y] : {};
        squares[currentPosition.y][currentPosition.x] = color;
        _positionAndDirecton = move(moveCommand);
        const colorSeenByCamera =
            squares[_positionAndDirecton.position.y] &&
            squares[_positionAndDirecton.position.y][_positionAndDirecton.position.x] !== undefined
                ? squares[_positionAndDirecton.position.y][_positionAndDirecton.position.x]
                : 0;
        return { squares, colorSeenByCamera };
    };
}

export function squaresPainted(squares: { [y: number]: { [x: number]: BlackWhite } }) {
    const lines = Object.values(squares);
    return lines.reduce((acc, line) => {
        const colors = Object.values(line);
        acc.push(...colors);
        return acc;
    }, new Array<any>());
}

export function printSquares(squares) {
    printArea(squares, color => (color === 1 ? '1' : ' '));
}

export function paint(intcodeProgram: number[], statingColor: number) {
    let _squares: {
        [y: number]: {
            [x: number]: BlackWhite;
        };
    };
    const painterRobot = painterRobotGenerator();
    let _intcodeComputer = intcodeComputer(intcodeProgram);
    let intcodeComputerResponse = _intcodeComputer([statingColor]);
    while (intcodeComputerResponse.exitCode !== 'END') {
        const color = intcodeComputerResponse.output[0] as BlackWhite;
        const moveInstruction = intcodeComputerResponse.output[1] as TurnLeftRightCommand;
        const { squares, colorSeenByCamera } = painterRobot(color, moveInstruction);
        _squares = squares;
        intcodeComputerResponse = _intcodeComputer([colorSeenByCamera]);
    }
    return _squares;
}
