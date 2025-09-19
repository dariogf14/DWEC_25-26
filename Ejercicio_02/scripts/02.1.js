// 1
const numeros = [3, 8, 15, 22, 7, 10]
console.log(numeros)

// 2
const dobles = numeros.map(numero => numero*2)
console.log(dobles)

// 3
const pares = numeros.filter(numero => numero%2 == 0)
console.log(pares)

// 4
for (const num of pares) {
  console.log(num);
}