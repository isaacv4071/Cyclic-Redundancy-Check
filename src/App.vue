<template>
  <div>
    <h2>Cálculo del Método de Redundancia Cíclica (CRC)</h2>
    <div>
      <label for="polynomial">Polinomio:</label>
      <input type="text" id="polynomial" v-model="polynomial">
    </div>
    <div>
      <label for="generator">Generador:</label>
      <input type="text" id="generator" v-model="generator">
    </div>
    <button @click="calculate">Calcular</button>
    <div v-if="crc">
      <p>Código CRC: {{ crc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      polynomial: '',
      generator: '',
      crc: ''
    }
  },
  methods: {
    calculate () {
      // Convertir el polinomio y el generador a arrays de bits
      const polynomialArray = this.polynomial.split('').map(bit => parseInt(bit, 10))
      const generatorArray = this.generator.split('').map(bit => parseInt(bit, 10))

      // Añadir ceros al polinomio para que tenga la misma longitud que el generador
      polynomialArray.push(...Array(generatorArray.length - 1).fill(0))

      // División utilizando el método de Redundancia Cíclica (CRC)
      const remainder = polynomialArray.slice()
      for (let i = 0; i < polynomialArray.length - generatorArray.length + 1; i++) {
        if (remainder[i] === 0) {
          continue
        }
        for (let j = 0; j < generatorArray.length; j++) {
          remainder[i + j] ^= generatorArray[j]
        }
      }

      // Convertir el resto en el código CRC y devolverlo como una cadena de bits
      const crc = remainder.slice(-generatorArray.length + 1).join('')
      this.crc = crc
    }
  }
}
</script>
