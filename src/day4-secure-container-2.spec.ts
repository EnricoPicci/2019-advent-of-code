import { expect } from "chai";
import {
  adjecentDigitsGroups,
  hasAdjecentDigitsNotPartOfLargerGroup,
  numberWithNonDecreasingDigitsAndTwoAdjacentDigitsNotPartOfLargerGroupIteratorBuilder
} from "./day4-secure-container-2";

describe("1 - adjecentDigitsGroups", () => {
  it("1.1 - should find one group of adjacent digits which are equal", () => {
    const groups = adjecentDigitsGroups(122234);
    expect(Object.keys(groups).length).to.equal(1);
    expect(groups[2].length).to.equal(3);
  });
  it("1.2 - should find three groups of adjacent digits which are equal", () => {
    const groups = adjecentDigitsGroups(1222892334555569);
    expect(Object.keys(groups).length).to.equal(3);
    expect(groups[2].length).to.equal(3);
    expect(groups[3].length).to.equal(2);
    expect(groups[5].length).to.equal(4);
  });
  it("1.2 - should find no groups of adjacent digits which are equal", () => {
    const groups = adjecentDigitsGroups(18273629);
    expect(Object.keys(groups).length).to.equal(0);
  });
});

describe("2 - hasAdjecentDigitsNotPartOfLargerGroup", () => {
  it("2.1 - should find that there are adjacent groups not part of larger group - first example given in the exercize", () => {
    const resp = hasAdjecentDigitsNotPartOfLargerGroup(112233);
    expect(resp).to.be.true;
  });
  it("2.2 - should find that there are NO adjacent groups not part of larger group - second example given in the exercize", () => {
    const resp = hasAdjecentDigitsNotPartOfLargerGroup(123444);
    expect(resp).to.be.false;
  });
  it("2.3 - should find that there are adjacent groups not part of larger group - third example given in the exercize", () => {
    const resp = hasAdjecentDigitsNotPartOfLargerGroup(111122);
    expect(resp).to.be.true;
  });
});

describe("3 - numberWithNonDecreasingDigitsAndTwoAdjacentDigitsNotPartOfLargerGroupIteratorBuilder", () => {
  it("3.1 - should find at least one number in the iteration", () => {
    const iterator = numberWithNonDecreasingDigitsAndTwoAdjacentDigitsNotPartOfLargerGroupIteratorBuilder(
      100,
      200
    );
    const firstNumber = iterator.next();
    expect(firstNumber.value).to.equal(112);
    expect(firstNumber.done).to.be.false;
    expect(firstNumber.iteration).to.equal(1);
  });
  it("3.2 - should not find any number in the iteration", () => {
    const iterator = numberWithNonDecreasingDigitsAndTwoAdjacentDigitsNotPartOfLargerGroupIteratorBuilder(
      1000,
      1119
    );
    const firstNumber = iterator.next();
    expect(firstNumber.done).to.be.true;
  });
});

describe("4 - answer to the calendar question", () => {
  it("4.1 - should calculate the expected value", () => {
    const start = 245182;
    const end = 790572;

    const iterator = numberWithNonDecreasingDigitsAndTwoAdjacentDigitsNotPartOfLargerGroupIteratorBuilder(
      start,
      end
    );

    let result = iterator.next();
    const passwords: number[] = [];

    while (!result.done) {
      passwords.push(result.value);
      result = iterator.next();
    }
    expect(passwords.length).to.equal(710);
  });
});
