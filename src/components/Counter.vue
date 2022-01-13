<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>

  <div>
    <button @click="increase()"> + </button>
    <button @click="decrease()"> - </button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    start: {
      type: Number,
      default: 100,
      validator (value) {
        return value >= 100
      }
    }
  },
  data () {
    return {
      counter: this.start
    }
  },
  methods: {
    // increase counter
    increase () {
      this.counter++
    },
    // decrease counter
    decrease () {
      this.counter--
    }
  },
  computed: {
    squareCounter () {
      return this.counter * this.counter
    },
    customTitle () {
      return this.title || 'Counter'
    }
  }
}
</script>

<style>
  button {
    background-color: #64B687;
    border-radius: 5px;
    border: 1px solid white;
    cursor: pointer;
    color: white;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
    width: 60px;
    height: 35px;
  }

  button:hover {
    background-color: #5AA67B;
    transition: 0.3s ease-in-out;
  }
</style>
