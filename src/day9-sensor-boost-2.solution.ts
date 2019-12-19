import { calculateNextState } from './intcode-computer';
import { InputDataForDay9FirstPartQuiz } from './day9-sensor-boost.input-data';

const input = [1];
let output: number;
const outputFunction = (o: number) => {
    output = o;
};
calculateNextState(InputDataForDay9FirstPartQuiz, input, outputFunction);

console.log(`The BOOST keycode is ${output}`);
