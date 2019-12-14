import { calculateNextState } from "./day2-1022-program-alarm";

import { initialState } from "./day2-1022-program-alarm.input-data";

export function solveQuiz2() {
  const resp = { solutionFound: false, noun: null, verb: null };
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const _initialState = initialState.slice();
      _initialState[1] = noun;
      _initialState[2] = verb;
      const result = calculateNextState(_initialState);
      if (result[0] === 19690720) {
        resp.solutionFound = true;
        resp.noun = noun;
        resp.verb = verb;
        break;
      }
    }
  }
  return resp;
}

const solution = solveQuiz2();

if (solution.solutionFound) {
  console.log("noun", solution.noun);
  console.log("verb", solution.verb);
  console.log(
    "the result (noun * 100 + verb) is",
    solution.noun * 100 + solution.verb
  );
} else {
  console.log("no solution found");
}
