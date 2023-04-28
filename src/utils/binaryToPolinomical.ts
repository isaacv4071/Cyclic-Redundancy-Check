export function binaryToPolynomial(binary: string) {
  let polynomial = "";
  const binaryString = binary.toString();
  const binaryArray = binaryString.split("").reverse();
  for (let i = 0; i < binaryArray.length; i++) {
    if (binaryArray[i] === "1") {
      polynomial += `x^${i} + `;
    }
  }
  polynomial = polynomial.replace(/\+ $/, "");
  return polynomial;
}
