<template>
  <div>
    <h1>Cálculo de CRC</h1>
    <label for="polynomial">Polinomio:</label>
    <input type="text" id="polynomial" v-model="polynomial" />
    <button @click="calculateCRC()">Calcular CRC</button>
    <div v-if="crc">
      <p>CRC: {{ crc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      polynomial: '',
      crc: null
    }
  },
  methods: {
    calculateCRC () {
      const polynomialArray = this.polynomial.split('').map(Number)
      const generatorArray = [1, 1, 0, 1, 0, 1] // Generador utilizado para el ejemplo
      const paddedPolynomial = polynomialArray.concat(Array(generatorArray.length - 1).fill(0))
      const remainder = [...paddedPolynomial]
      for (let i = 0; i < polynomialArray.length; i++) {
        if (remainder[i] === 0) {
          continue
        }
        for (let j = 0; j < generatorArray.length; j++) {
          remainder[i + j] = (remainder[i + j] + generatorArray[j]) % 2
        }
      }
      const crc = remainder.slice(polynomialArray.length).join('')
      this.crc = crc
    }
  }
}
</script>
