type Val = { val: number };
type Operation = [Val, Val, Val, Val];

export function calculateNextState(initialState: number[]) {
  const newState = initialState.map(val => ({ val }));
  const _chuncks: Operation[] = [...chunks(newState, 4)];
  _chuncks.forEach(op => {
    const opCode = op[0].val;
    if (opCode === 99) {
      return calculateResponse(newState);
    } else if (opCode === 1) {
      const valToAdd1 = newState[op[1].val].val;
      const valToAdd2 = newState[op[2].val].val;
      newState[op[3].val].val = valToAdd1 + valToAdd2;
    } else if (opCode === 2) {
      const valToMult1 = newState[op[1].val].val;
      const valToMult2 = newState[op[2].val].val;
      newState[op[3].val].val = valToMult1 * valToMult2;
    }
  });
  return calculateResponse(newState);
}

function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

function calculateResponse(
  newState: {
    val: number;
  }[]
) {
  return newState.map(val => val.val);
}
