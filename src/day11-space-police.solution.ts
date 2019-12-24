import { paint, squaresPainted, printSquares } from './day11-space-police';
import { IntcodeProgramForPaintingRobot } from './day11-space-police.input-data';

let squares = paint(IntcodeProgramForPaintingRobot, 0);
const _squaresPainted = squaresPainted(squares);

console.log('The number of panels painted at least once is:', _squaresPainted.length);

squares = paint(IntcodeProgramForPaintingRobot, 1);
printSquares(squares);
