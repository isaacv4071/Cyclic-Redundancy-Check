export function crc(polynomial: string, generator: string): string {
  // Convertir el polinomio y el generador a arrays de bits
  const polynomialArray = polynomial.split("").map((bit) => parseInt(bit, 10));
  const generatorArray = generator.split("").map((bit) => parseInt(bit, 10));

  // Añadir ceros al polinomio para que tenga la misma longitud que el generador
  polynomialArray.push(...Array(generatorArray.length - 1).fill(0));

  // División utilizando el método de Redundancia Cíclica (CRC)
  const remainder = polynomialArray.slice();
  for (let i = 0; i < polynomialArray.length - generatorArray.length + 1; i++) {
    if (remainder[i] === 0) {
      continue;
    }
    for (let j = 0; j < generatorArray.length; j++) {
      // XOR bitwise operation
      remainder[i + j] ^= generatorArray[j];
    }
  }

  // Convertir el resto en el código CRC y devolverlo como una cadena de bits
  return remainder.slice(-generatorArray.length + 1).join("");
}
