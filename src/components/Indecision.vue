<template>
  <h1>Indecision</h1>
  <img v-if="image" :src="image" alt="bg">

  <div class="bg-dark"></div>

  <div class="indecision-container">
    <input
      type="text"
      placeholder="Hazme una pregunta"
      v-model="question">
    <p>Recuerda terminar con un signo de interrogación</p>
    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      question: null,
      answer: null,
      image: null,
      isValidQuestion: false
    }
  },
  methods: {
    async getAnswer () {
      try {
        this.answer = 'Pensando...'
        const { answer, image } = await fetch('https://yesno.wtf/api').then(response => response.json())
        this.answer = answer === 'yes' ? 'Si' : 'No'
        this.image = image
      } catch (error) {
        console.error('IndecisionComponent: API error')
        this.answer = 'No se pudo cargarla información del API'
        this.image = null
      }
    }
  },
  watch: {
    question (value) {
      this.isValidQuestion = false
      console.log({ value })

      if (!value.endsWith('?')) return
      console.log({ value })

      this.isValidQuestion = true
      this.getAnswer()
    }
  }
}
</script>

<style scoped>
  img, .bg-dark {
    height: 100vh;
    left: 0px;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    top: 0px;
    width: 100vw;
  }

  .bg-dark {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .indecision-container {
    position: relative;
    z-index: 99;
  }

  input {
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    width: 250px;
  }
  input:focus {
    outline: none;
  }

  p {
    color: white;
    font-size: 20px;
    margin-top: 0px;
  }

  h1, h2 {
    color: white;
  }

  h2 {
    margin-top: 150px;
  }

</style>
