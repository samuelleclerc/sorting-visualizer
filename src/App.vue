<template>
  <NavBar :reset="init" :play="play" :toggleNumbers="toggleNumbers" />
  <div class="container">
    <div class="bars">
      <div
        v-for="(item, index) in items"
        :key="index"
        :style="{
          height: item + '%',
        }"
        :class="{
          comparing: isComparing(index),
          swapping: isSwapping(index),
          sorted: isSorted(index),
          bar: true,
        }"
      >
        {{ showNumbers ? item : "" }}
      </div>
    </div>
  </div>
</template>

<script>
import { swap, bubbleSort, selectionSort, insertionSort } from "./utils";
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },

  data() {
    return {
      items: [],
      moves: [],
      swapIndices: new Set(),
      compareIndices: new Set(),
      sortedIndices: new Set(),
      animationDelayMs: 50,
      showNumbers: false,
      timeout: null,
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.items = [];
      this.moves = [];

      this.compareIndices.clear();
      this.swapIndices.clear();
      this.sortedIndices.clear();

      for (let i = 0; i < 20; i++) {
        this.items[i] = Math.floor(Math.random() * 91) + 5;
      }
    },

    play(sortingAlgorithm) {
      if (this.moves.length) {
        this.moves = [];
        clearTimeout(this.timeout);
      }

      this.init();

      switch (sortingAlgorithm) {
        case "bubble":
          this.moves = bubbleSort([...this.items]);
          break;
        case "selection":
          this.moves = selectionSort([...this.items]);
          break;
        case "insertion":
          this.moves = insertionSort([...this.items]);
          break;
      }
      this.animate();
    },

    animate() {
      this.swapIndices.clear();
      this.compareIndices.clear();

      if (!this.moves.length) {
        return;
      }

      const { indices, type } = this.moves.shift();
      const [i, j] = indices;

      switch (type) {
        case "compare":
          this.compareIndices.add(i);
          this.compareIndices.add(j);
          break;
        case "swap":
          this.swapIndices.add(i);
          this.swapIndices.add(j);
          swap(i, j, this.items);
          break;
        case "sorted":
          this.sortedIndices.add(i);
          this.sortedIndices.add(j);
          break;
      }

      this.timeout = setTimeout(this.animate, this.animationDelayMs);
    },

    toggleNumbers() {
      this.showNumbers = !this.showNumbers;
    },

    isComparing(index) {
      return this.compareIndices.has(index);
    },
    isSwapping(index) {
      return this.swapIndices.has(index);
    },
    isSorted(index) {
      return this.sortedIndices.has(index);
    },
  },
};
</script>

<style>
.container {
  flex-grow: 0.95;
  min-width: 100%;
  display: flex;
  justify-content: center;
}

.bars {
  width: 80%;
  display: flex;
  align-items: flex-end;
}

.bar {
  width: 5%;
  margin: 1px;
  padding: 5px;
  background-color: #ffffffde;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-width: fit-content;
  color: #1a1a1a;
  border-radius: 4px;
}

.comparing {
  background-color: #3498db !important;
}

.swapping {
  background-color: #e74c3c !important;
}

.sorted {
  background-color: #2ecc71;
}
</style>
