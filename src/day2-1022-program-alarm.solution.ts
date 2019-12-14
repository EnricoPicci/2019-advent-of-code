import { calculateNextState } from "./day2-1022-program-alarm";
import { initialState } from "./day2-1022-program-alarm.input-data";

const result = calculateNextState(initialState);

console.log("The expected result is:", result[0]);
