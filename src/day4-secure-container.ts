export function numberWithNonDecreasingDigitsIteratorBuilder(startNumber: number, maxNumber: number) {
    let _currentNumber = firstNumberWithNonDecreasingDigits(startNumber);
    let _iterationCount = 0;

    const numberWithNonDecreasingDigitsIterator = {
        next: () => {
            if (maxNumber > _currentNumber) {
                const _result = {
                    value: _currentNumber,
                    done: false,
                    iteration: _iterationCount,
                };
                _iterationCount++;
                _currentNumber = firstNumberWithNonDecreasingDigits(_currentNumber + 1);
                return _result;
            }
            return { value: null, done: true, iteration: _iterationCount };
        },
    };
    return numberWithNonDecreasingDigitsIterator;
}

export function firstNumberWithNonDecreasingDigits(number: number) {
    const numberAsString = number.toString();
    const result = _firstNumberWithNonDecreasingDigits(numberAsString);
    return parseInt(result);
}
function _firstNumberWithNonDecreasingDigits(numberAsString: string, currentIndex = 0) {
    const currentDigit = numberAsString[currentIndex];
    const nextIndex = currentIndex + 1;
    if (nextIndex < numberAsString.length) {
        const nextDigit = numberAsString[nextIndex];
        if (nextDigit < currentDigit) {
            const lenghtToPad = numberAsString.length - nextIndex + 1;
            const paddingString = new Array(lenghtToPad).join(currentDigit);
            const nextNumberAsString = numberAsString.substring(0, nextIndex) + paddingString;
            return nextNumberAsString;
        } else {
            return _firstNumberWithNonDecreasingDigits(numberAsString, currentIndex + 1);
        }
    }
    return numberAsString;
}

export function adjecentDigits(n: number) {
    const numberAsString = n.toString();
    const numberLength = numberAsString.length;
    const pairs: { a: string; b: string }[] = [];
    for (let i = 0; i < numberLength - 1; i++) {
        pairs.push({ a: numberAsString[i], b: numberAsString[i + 1] });
    }
    return pairs.find(p => p.a === p.b);
}
export function hasAdjecentDigits(n: number) {
    return !!adjecentDigits(n);
}

export function numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIteratorBuilder(
    startNumber: number,
    maxNumber: number,
) {
    const nonDecreasingDigitsIterator = numberWithNonDecreasingDigitsIteratorBuilder(startNumber, maxNumber);

    const numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIterator = {
        next: () => {
            let nextNumberWithNonDecreasingDigits = nonDecreasingDigitsIterator.next();
            while (
                !nextNumberWithNonDecreasingDigits.done &&
                !hasAdjecentDigits(nextNumberWithNonDecreasingDigits.value)
            ) {
                nextNumberWithNonDecreasingDigits = nonDecreasingDigitsIterator.next();
            }
            return nextNumberWithNonDecreasingDigits;
        },
    };

    return numberWithNonDecreasingDigitsAndTwoSameAdjacentDigitsIterator;
}

// ******************************************************************************************************************
// ********* this implements a different line of reasoining which I eventually left uncompleted  ********************
// ********* since the above implementation seems simpler                                        ********************
// ******************************************************************************************************************

type NumberAndFollowers = {
    val: number;
    followers?: NumberAndFollowers[];
};

export function buildNumberAndNonDecreasingFollowers(val: number, depth: number) {
    const result: NumberAndFollowers = { val };
    if (depth > 0) {
        const followers: NumberAndFollowers[] = [];
        for (let i = val; i < 10; i++) {
            followers.push(buildNumberAndNonDecreasingFollowers(i, depth - 1));
        }
        result.followers = followers;
    }
    return result;
}

export function buildNumberAndNonDecreasingFollowers1(val: number, depth?: number) {
    const result: NumberAndFollowers = { val };
    if (depth > 0) {
        const followers: NumberAndFollowers[] = [];
        for (let i = val; i < 10; i++) {
            followers.push(buildNumberAndNonDecreasingFollowers(i, depth - 1));
        }
        result.followers = followers;
    }
    return result;
}

export function getResultNumbersValAsString(numberAndFollowers: NumberAndFollowers, precedingNumberAsString = '') {
    const val = numberAndFollowers.val;
    const followers = numberAndFollowers.followers;
    return followers
        ? followers.reduce((acc, f) => {
              const _precedingNumberAsString = precedingNumberAsString + `${val}`;
              const res = getResultNumbersValAsString(f, _precedingNumberAsString);
              acc = acc.concat(res);
              return acc;
          }, [])
        : [precedingNumberAsString + `${val}`];
}

export function getResultNumbers(numberAndFollowers: NumberAndFollowers) {
    return getResultNumbersValAsString(numberAndFollowers).map(n => parseInt(n));
}
