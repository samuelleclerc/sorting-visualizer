<template>
  <nav>
    <h1>Sorting Visualizer</h1>
    <ul>
      <li>
        <button @click="reset">Reset</button>
      </li>
      <li>
        <button @click="play('bubble')">Bubble Sort</button>
      </li>
      <li>
        <button @click="play('selection')">Selection Sort</button>
      </li>
      <li>
        <button @click="play('insertion')">Insertion Sort</button>
      </li>
      <li>
        <button @click="toggleNumbers">Toggle Numbers</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    play: {
      type: Function,
      required: true,
    },
    toggleNumbers: {
      type: Function,
      required: true,
    },
    reset: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped>
nav {
  border-bottom: 1px solid #ffffffde;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
}

nav h1 {
  color: #2ecc71;
}

nav ul {
  display: flex;
  align-items: center;
}

nav li {
  list-style: none;
}

button {
  border: none;
  background-color: inherit;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  color: var(--color-text);
}
</style>
