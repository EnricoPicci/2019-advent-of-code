import { intcodeComputer } from './intcode-computer-1';
import { printArea } from './utils';

export type Screen = { [y: number]: { [x: number]: number } };

export function playArcadeGame(
    intcodeProgramForArcadeGame: number[],
    initialMove: [number] = undefined,
    maxNumberOfMoves = Infinity,
    _printScreen = false,
) {
    const screen: Screen = {};
    let output = [];
    let score: number;
    let ballPosition: { x: number; y: number };
    let paddlePosition: { x: number; y: number };
    const outputFunction = (o: number) => {
        output.push(o);
        if (output.length === 3) {
            const [x, y, val] = output;
            if (x === -1 && y === 0) {
                score = val;
            } else {
                screen[y] = screen[y] ? screen[y] : {};
                screen[y][x] = val;
                ballPosition = val === 4 ? { x, y } : ballPosition;
                paddlePosition = val === 3 ? { x, y } : paddlePosition;
            }
            output = [];
        }
    };
    const _intcodeComputer = intcodeComputer(intcodeProgramForArcadeGame, outputFunction);
    let resp = _intcodeComputer(initialMove);
    if (_printScreen) {
        printScreen(screen);
    }
    let counter = 0;
    while (resp.exitCode !== 'END' && counter < maxNumberOfMoves) {
        const command = [Math.sign(ballPosition.x - paddlePosition.x)];
        resp = _intcodeComputer(command);
        if (_printScreen) {
            printScreen(screen);
        }
        counter++;
    }
    return { screen, score };
}

export function countBlockTilesOnScreen(screen: Screen) {
    return Object.values(screen)
        .map(line => Object.values(line).filter(tile => tile === 2).length)
        .reduce((totNumberOfTiles, numberOfTilesOnLine) => totNumberOfTiles + numberOfTilesOnLine);
}

const determineCharToPrint = id => {
    return id === 0 ? ' ' : id === 1 ? 'X' : id === 2 ? '=' : id === 3 ? '_' : id === 4 ? 'o' : 'A';
};

export function printScreen(screen: Screen) {
    printArea(screen, determineCharToPrint);
}
