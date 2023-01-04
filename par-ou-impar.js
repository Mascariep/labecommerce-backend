//EXERCICIO 3

const escolhaJogador = process.argv[2]
const numeroJogador = process.argv[3]

console.log(`Você escolheu ${escolhaJogador}.`)
console.log(`Voce escolheu ${Number(numeroJogador)}.`)

if(!escolhaJogador) {
    console.log("Escolha um numero par ou impare tente novamente")
} if (escolhaJogador === "par") {
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
  const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10)
  console.log("O computador escolheu ímpar")
  console.log(`O computador escolheu ${numeroAleatorioEntreZeroeDez}.`)
  let resultado = Number(numeroJogador) + Number(numeroAleatorioEntreZeroeDez)
  console.log(`A soma deu ${resultado}.`)
  resultado % 2 == 0 ? console.log("Você ganhou!") : console.log("Você perdeu!")
}else {
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10)
    console.log("O computador escolheu par.")
    console.log(`O computador escolheu ${numeroAleatorioEntreZeroeDez}.`)
    let resultado = Number(numeroJogador) + Number(numeroAleatorioEntreZeroeDez)
    console.log(`A soma deu ${resultado}.`)
    resultado % 2 == 1 ? console.log("Você ganhou!") : console.log("Você perdeu!")
}

