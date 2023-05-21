<template>
  <div class="view">
    <h1>Sorting Visualizer</h1>
    <div id="container">
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

    <div class="buttonGroup">
      <button @click="init">Init</button>
      <button @click="play">Play</button>
      <button @click="showNumbers = !showNumbers">
        Show Numbers: {{ showNumbers ? "On" : "Off" }}
      </button>
    </div>
  </div>
</template>

<script>
import { swap, bubbleSort } from "./utils";

export default {
  data() {
    return {
      items: [],
      moves: [],
      swapIndices: new Set(),
      compareIndices: new Set(),
      sortedIndices: new Set(),
      animationDelayMs: 50,
      showNumbers: false,
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

    play() {
      if (this.moves.length) {
        return;
      }

      this.moves = bubbleSort([...this.items]);
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

      setTimeout(this.animate, this.animationDelayMs);
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  height: 80dvh;
  width: 80vw;
  min-width: 600px;
  border: 1px solid black;
}

.bar {
  width: 5%;
  margin: 1px;
  padding: 5px;
  background-color: #f5f5f5;
  border: 1px solid black;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.comparing {
  background-color: #3498db;
}

.swapping {
  background-color: #e74c3c;
}

.sorted {
  background-color: #2ecc71;
}

.buttonGroup {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 80vw;
  margin: 20px;
}

button {
  cursor: pointer;
  padding: 12px;
  min-width: 100px;
  border: 0px;
  border-radius: 8px;

  background: #3498db;
  color: #ffffff;
}
button:hover {
  background: #2980b9;
  color: #ffffff;
}
</style>
