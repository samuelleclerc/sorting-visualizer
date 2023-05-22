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

export function selectionSort(array) {
  const moves = [];

  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      moves.push({ indices: [min, j], type: "compare" });
      if (array[min] > array[j]) {
        min = j;
      }
    }
    if (min !== i) {
      moves.push({ indices: [i, min], type: "swap" });
      swap(i, min, array);
    }
    moves.push({ indices: [i], type: "sorted" });
  }

  return moves;
}

export function insertionSort(array) {
  const moves = [];

  moves.push({ indices: [0], type: "sorted" });

  for (let i = 1; i <= array.length; i++) {
    let j = i;

    moves.push({ indices: [j, j - 1], type: "compare" });
    while (j > 0 && array[j] < array[j - 1]) {
      moves.push({ indices: [j, j - 1], type: "swap" });
      swap(j, j - 1, array);
      j -= 1;
    }
    moves.push({ indices: [i], type: "sorted" });
  }

  return moves;
}
