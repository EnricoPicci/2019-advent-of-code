import { numberWithNonDecreasingDigitsIteratorBuilder } from "./day4-secure-container";

export function adjecentDigitsGroups(n: number) {
  const numberAsString = n.toString();
  const numberAsArrayOfDigits = numberAsString.split("");
  let previousVal: string;
  return numberAsArrayOfDigits.reduce((acc, val) => {
    if (!previousVal) {
      previousVal = val;
    } else {
      if (val === previousVal) {
        acc[val] = acc[val] ? acc[val] : [val];
        acc[val].push(val);
      }
      previousVal = val;
    }
    return acc;
  }, {} as { [n: number]: number[] });
}
export function hasAdjecentDigitsNotPartOfLargerGroup(n: number) {
  const groups = adjecentDigitsGroups(n);
  const groupValues = Object.keys(groups).map(k => groups[k]);
  return !!groupValues.find(g => g.length === 2);
}

export function numberWithNonDecreasingDigitsAndTwoAdjacentDigitsNotPartOfLargerGroupIteratorBuilder(
  startNumber: number,
  maxNumber: number
) {
  const nonDecreasingDigitsIterator = numberWithNonDecreasingDigitsIteratorBuilder(
    startNumber,
    maxNumber
  );

  const numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIterator = {
    next: () => {
      let nextNumberWithNonDecreasingDigits = nonDecreasingDigitsIterator.next();
      while (
        !nextNumberWithNonDecreasingDigits.done &&
        !hasAdjecentDigitsNotPartOfLargerGroup(
          nextNumberWithNonDecreasingDigits.value
        )
      ) {
        nextNumberWithNonDecreasingDigits = nonDecreasingDigitsIterator.next();
      }
      return nextNumberWithNonDecreasingDigits;
    }
  };

  return numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIterator;
}
