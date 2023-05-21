export function swap(i, j, array) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export function bubbleSort(array) {
  const moves = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      moves.push({ indices: [j, j + 1], type: "compare" });
      if (array[j] > array[j + 1]) {
        moves.push({ indices: [j, j + 1], type: "swap" });
        swap(j, j + 1, array);
      }
    }
    moves.push({ indices: [array.length - i - 1], type: "sorted" });
  }

  return moves;
}
