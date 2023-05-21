<template>
  <div class="body">
    <h1>Sorting Visualizer</h1>
    <div id="container">
      <div
        v-for="(item, index) in items"
        :key="index"
        :style="{
          height: item + '%',
        }"
        :class="{ highlighted: isIncluded(index), bar: true }"
      ></div>
    </div>

    <div>
      <button @click="init">Init</button>
      <button @click="play">Play</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      moves: [],
      indices: [],
    };
  },

  mounted() {
    this.init();
  },

  computed: {
    isIncluded() {
      return (index) => this.indices.includes(index);
    },
  },

  methods: {
    init() {
      for (let i = 0; i < 20; i++) {
        this.items[i] = Math.floor(Math.random() * 91) + 5;
      }
    },

    play() {
      this.bubbleSort([...this.items]);
      this.animate();
    },

    animate() {
      if (!this.moves.length) {
        this.indices = [];
        return;
      }

      const [i, j] = this.moves.shift();
      this.indices = [i, j];
      [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
      setTimeout(this.animate, 100);
    },

    bubbleSort(array) {
      this.moves = [];

      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          if (array[j] > array[j + 1]) {
            this.moves.push([j, j + 1]);
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
          }
        }
      }

      return this.moves;
    },
  },
};
</script>

<style>
.body {
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
  height: 80vh;
  width: 80vw;
  border: 1px solid black;
}

.bar {
  width: 5%;
  margin: 1px;
  background-color: #f5f5f5;
  border: 1px solid black;
}

.highlighted {
  background-color: #ff0000;
}
</style>
