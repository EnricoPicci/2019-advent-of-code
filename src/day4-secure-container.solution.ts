import { numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIteratorBuilder } from "./day4-secure-container";

const start = 245182;
const end = 790572;

const iterator = numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIteratorBuilder(
  start,
  end
);

let result = iterator.next();
const passwords: number[] = [];

while (!result.done) {
  passwords.push(result.value);
  result = iterator.next();
}

console.log(
  "the number of different passwords within the range given is",
  passwords.length
);
