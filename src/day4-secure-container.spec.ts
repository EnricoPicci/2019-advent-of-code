import { expect } from "chai";
import {
  buildNumberAndNonDecreasingFollowers,
  getResultNumbersValAsString,
  getResultNumbers,
  firstNumberWithNonDecreasingDigits,
  numberWithNonDecreasingDigitsIteratorBuilder,
  adjecentDigits,
  hasAdjecentDigits,
  numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIteratorBuilder
} from "./day4-secure-container";

describe("y - firstNumberWithNonDecreasingDigits", () => {
  it("y.0 - calculate the first number with digits never decreasing following 123", () => {
    const nextNumber = firstNumberWithNonDecreasingDigits(123);
    expect(nextNumber).to.equal(123);
  });
  it("y.1 - calculate the first number with digits never decreasing following 129", () => {
    const nextNumber = firstNumberWithNonDecreasingDigits(130);
    expect(nextNumber).to.equal(133);
  });
  it("y.2 - calculate the first number with digits never decreasing following 319", () => {
    const nextNumber = firstNumberWithNonDecreasingDigits(319);
    expect(nextNumber).to.equal(333);
  });
  it("y.3 - calculate the first number with digits never decreasing following 428", () => {
    const nextNumber = firstNumberWithNonDecreasingDigits(428);
    expect(nextNumber).to.equal(444);
  });
  it("y.4 - calculate the first number with digits never decreasing following 399", () => {
    const nextNumber = firstNumberWithNonDecreasingDigits(400);
    expect(nextNumber).to.equal(444);
  });
  it("y.5 - calculate the first number with digits never decreasing following 999", () => {
    const nextNumber = firstNumberWithNonDecreasingDigits(999);
    expect(nextNumber).to.equal(999);
  });
});

describe("w - numberWithNonDecreasingDigitsIteratorBuilder", () => {
  it("w.0 - calculate the first number with digits never decreasing starting from 123", () => {
    const nextNumberIterator = numberWithNonDecreasingDigitsIteratorBuilder(
      123,
      1000
    );
    const nextNumber = nextNumberIterator.next().value;
    expect(nextNumber).to.equal(123);
  });
  it("w.1 - calculate the first two numbers with digits never decreasing starting from 123", () => {
    const nextNumberIterator = numberWithNonDecreasingDigitsIteratorBuilder(
      123,
      1000
    );
    nextNumberIterator.next();
    const nextNumber = nextNumberIterator.next().value;
    expect(nextNumber).to.equal(124);
  });
  it("w.2 - calculate the first two numbers with digits never decreasing starting from 129", () => {
    const nextNumberIterator = numberWithNonDecreasingDigitsIteratorBuilder(
      129,
      1000
    );
    nextNumberIterator.next();
    const nextNumber = nextNumberIterator.next().value;
    expect(nextNumber).to.equal(133);
  });
  it("w.3 - after the max number is reached, the iterator stops", () => {
    const nextNumberIterator = numberWithNonDecreasingDigitsIteratorBuilder(
      989,
      1000
    );
    let nextResult = nextNumberIterator.next();
    expect(nextResult.value).to.equal(999);
    expect(nextResult.done).to.be.false;
    nextResult = nextNumberIterator.next();
    expect(nextResult.value).to.be.null;
    expect(nextResult.done).to.be.true;
  });
  it("w.4 - it should need 55 iterations to find all numbers with non decreasing digits between 0 and 100", () => {
    const nextNumberIterator = numberWithNonDecreasingDigitsIteratorBuilder(
      0,
      100
    );
    let result;
    while (!(result = nextNumberIterator.next()).done) {}
    expect(result.iteration).to.equal(55);
  });
});

describe("z - adjecentDigits and hasAdjacentDigits", () => {
  it("z.0 - should find a pair of adjacent numbers", () => {
    const result = adjecentDigits(42123345);
    expect(result).to.be.not.undefined;
    expect(result.a).to.equal("3");
    expect(result.b).to.equal("3");
  });
  it("z.1 - should find a pair of adjacent numbers even when they are the last ones", () => {
    const result = adjecentDigits(1673103455);
    expect(result).to.be.not.undefined;
    expect(result.a).to.equal("5");
    expect(result.b).to.equal("5");
  });
  it("z.2 - should find a pair of adjacent numbers even when they are the first ones", () => {
    const result = adjecentDigits(1123629455);
    expect(result).to.be.not.undefined;
    expect(result.a).to.equal("1");
    expect(result.b).to.equal("1");
  });
  it("z.2 - should not find a pair of adjacent numbers", () => {
    const result = adjecentDigits(628396283);
    expect(result).to.be.undefined;
  });
  it("z+.1 - should respond true when a number has adjacent digits which are the same", () => {
    const result = hasAdjecentDigits(233243);
    expect(result).to.be.true;
  });
  it("z+.2 - should respond false when a number has not adjacent digits which are the same", () => {
    const result = hasAdjecentDigits(28436183);
    expect(result).to.be.false;
  });
});

describe("x - numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIterator", () => {
  it(`x.0 - should find 55 numbers which have 2 adjacent digits which are the same 
  and have non decreasing digit sequence between 0 and 100`, () => {
    const iterator = numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIteratorBuilder(
      0,
      100
    );
    let result = iterator.next();
    while (!result.done) {
      result = iterator.next();
    }
    expect(result.value).to.be.null;
    expect(result.iteration).to.equal(55);
  });
  it(`x.1 - should find 45 numbers which have 2 adjacent digits which are the same 
  and have non decreasing digit sequence between 1100 and 1200`, () => {
    const iterator = numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIteratorBuilder(
      1100,
      1200
    );
    let result = iterator.next();
    while (!result.done) {
      result = iterator.next();
    }
    expect(result.value).to.be.null;
    expect(result.iteration).to.equal(45);
  });
  it(`x.2 - a specific number is found in a sequence`, () => {
    const start = 173381;
    const numberToFind = 177899;
    const iterator = numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIteratorBuilder(
      start,
      start * 5
    );
    let isNumberFound = false;
    let result = iterator.next();
    while (!result.done) {
      if (result.value === numberToFind) {
        isNumberFound = true;
      }
      result = iterator.next();
    }
    expect(isNumberFound).to.be.true;
  });
});

describe("1 - calculate NumberAndFollowers for non descreasing numbers", () => {
  it("1.1 - calculate NumberAndFollowers for non descreasing numbers starting with 0", () => {
    const initialVal = 0;
    const numberAndFollowers = buildNumberAndNonDecreasingFollowers(
      initialVal,
      3
    );
    expect(numberAndFollowers.val).to.equal(initialVal);
    // first level depth
    expect(numberAndFollowers.followers.length).to.equal(10);
    expect(numberAndFollowers.followers[0].val).to.equal(0);
    expect(numberAndFollowers.followers[9].val).to.equal(9);
    // second level depth
    const secondLevelNumberAndFollowers = numberAndFollowers.followers[1];
    expect(secondLevelNumberAndFollowers.followers.length).to.equal(9);
    expect(secondLevelNumberAndFollowers.followers[0].val).to.equal(1);
    expect(secondLevelNumberAndFollowers.followers[8].val).to.equal(9);
    // third level depth
    const thirdLevelNumberAndFollowers =
      secondLevelNumberAndFollowers.followers[2];
    expect(thirdLevelNumberAndFollowers.followers.length).to.equal(7);
    expect(thirdLevelNumberAndFollowers.followers[0].val).to.equal(3);
    expect(thirdLevelNumberAndFollowers.followers[6].val).to.equal(9);
    expect(thirdLevelNumberAndFollowers.followers[6].followers).to.be.undefined;
  });
  it("1.2 - calculate NumberAndFollowers for non descreasing numbers starting with a number greater than 0", () => {
    const initialVal = 2;
    const numberAndFollowers = buildNumberAndNonDecreasingFollowers(
      initialVal,
      3
    );
    expect(numberAndFollowers.val).to.equal(initialVal);
    // first level depth
    expect(numberAndFollowers.followers.length).to.equal(8);
    expect(numberAndFollowers.followers[0].val).to.equal(2);
    expect(numberAndFollowers.followers[7].val).to.equal(9);
    // second level depth
    const secondLevelNumberAndFollowers = numberAndFollowers.followers[1];
    expect(secondLevelNumberAndFollowers.followers.length).to.equal(7);
    expect(secondLevelNumberAndFollowers.followers[0].val).to.equal(3);
    expect(secondLevelNumberAndFollowers.followers[6].val).to.equal(9);
    // third level depth
    const thirdLevelNumberAndFollowers =
      secondLevelNumberAndFollowers.followers[2];
    expect(thirdLevelNumberAndFollowers.followers.length).to.equal(5);
    expect(thirdLevelNumberAndFollowers.followers[0].val).to.equal(5);
    expect(thirdLevelNumberAndFollowers.followers[4].val).to.equal(9);
    expect(thirdLevelNumberAndFollowers.followers[4].followers).to.be.undefined;
  });
});

describe("2 - getResultNumbersValAsString", () => {
  it("2.1 - calculate the numbers with digits never decreasing starting from 0 as initial value for the first digit and depth of 1", () => {
    const initialVal = 0;
    const numberAndFollowers = buildNumberAndNonDecreasingFollowers(
      initialVal,
      1
    );
    const neverDecreasingDigitNumbers = getResultNumbersValAsString(
      numberAndFollowers
    );
    expect(neverDecreasingDigitNumbers.length).to.equal(10);
    expect(neverDecreasingDigitNumbers[0]).to.equal("00");
    expect(neverDecreasingDigitNumbers[9]).to.equal("09");
  });
  it("2.2 - calculate the numbers with digits never decreasing starting from 0 as initial value for the first digit and depth of 2", () => {
    const initialVal = 0;
    const numberAndFollowers = buildNumberAndNonDecreasingFollowers(
      initialVal,
      2
    );
    const neverDecreasingDigitNumbers = getResultNumbersValAsString(
      numberAndFollowers
    );
    expect(neverDecreasingDigitNumbers.length).to.equal(55);
    expect(neverDecreasingDigitNumbers[0]).to.equal("000");
    expect(neverDecreasingDigitNumbers[9]).to.equal("009");
    expect(neverDecreasingDigitNumbers[10]).to.equal("011");
    expect(neverDecreasingDigitNumbers[54]).to.equal("099");
  });
  it("2.3 - calculate the numbers with digits never decreasing starting from 9 as initial value for the first digit and depth of 1", () => {
    const initialVal = 9;
    const numberAndFollowers = buildNumberAndNonDecreasingFollowers(
      initialVal,
      0
    );
    const neverDecreasingDigitNumbers = getResultNumbersValAsString(
      numberAndFollowers
    );
    expect(neverDecreasingDigitNumbers.length).to.equal(1);
    expect(neverDecreasingDigitNumbers[0]).to.equal("9");
  });
  it("2.4 - calculate the numbers with digits never decreasing starting from 8 as initial value for the first digit and depth of 1", () => {
    const initialVal = 8;
    const numberAndFollowers = buildNumberAndNonDecreasingFollowers(
      initialVal,
      1
    );
    const neverDecreasingDigitNumbers = getResultNumbersValAsString(
      numberAndFollowers
    );
    expect(neverDecreasingDigitNumbers.length).to.equal(2);
    expect(neverDecreasingDigitNumbers[0]).to.equal("88");
    expect(neverDecreasingDigitNumbers[1]).to.equal("89");
  });
});

describe("3 - getResultNumbers", () => {
  it("3.0 - calculate the numbers with digits never decreasing starting from 9 as initial value for the first digit and depth of 1", () => {
    const initialVal = 9;
    const numberAndFollowers = buildNumberAndNonDecreasingFollowers(
      initialVal,
      1
    );
    const neverDecreasingDigitNumbers = getResultNumbers(numberAndFollowers);
    expect(neverDecreasingDigitNumbers.length).to.equal(1);
    expect(neverDecreasingDigitNumbers[0]).to.equal(99);
  });
  it("3.1 - calculate the numbers with digits never decreasing starting from 0 as initial value for the first digit and depth of 2", () => {
    const initialVal = 0;
    const numberAndFollowers = buildNumberAndNonDecreasingFollowers(
      initialVal,
      2
    );
    const neverDecreasingDigitNumbers = getResultNumbers(numberAndFollowers);
    expect(neverDecreasingDigitNumbers.length).to.equal(55);
    expect(neverDecreasingDigitNumbers[0]).to.equal(0);
    expect(neverDecreasingDigitNumbers[9]).to.equal(9);
    expect(neverDecreasingDigitNumbers[10]).to.equal(11);
    expect(neverDecreasingDigitNumbers[54]).to.equal(99);
  });
  it("3.2 - calculate the numbers with digits never decreasing starting from 9 as initial value for the first digit and depth of 2", () => {
    const initialVal = 9;
    const numberAndFollowers = buildNumberAndNonDecreasingFollowers(
      initialVal,
      2
    );
    const neverDecreasingDigitNumbers = getResultNumbers(numberAndFollowers);
    expect(neverDecreasingDigitNumbers.length).to.equal(1);
    expect(neverDecreasingDigitNumbers[0]).to.equal(999);
  });
  it("3.3 - calculate the numbers with digits never decreasing starting from 9 as initial value for the first digit and depth of 3", () => {
    const initialVal = 9;
    const numberAndFollowers = buildNumberAndNonDecreasingFollowers(
      initialVal,
      3
    );
    const neverDecreasingDigitNumbers = getResultNumbers(numberAndFollowers);
    expect(neverDecreasingDigitNumbers.length).to.equal(1);
    expect(neverDecreasingDigitNumbers[0]).to.equal(9999);
  });
});
