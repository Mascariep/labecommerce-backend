//EXERCICIO 3

const escolhaJogador = process.argv[2]
console.log(`Você escolheu ${escolhaJogador.toLowerCase()}.`)

const escolhaComputador = ["Pedra" , "Papel" , "Tesoura"]
const escolha = escolhaComputador[Math.floor(Math.random()*escolhaComputador.length)]

console.log(`O computador escolheu ${escolha}.`)

if(!escolhaJogador){
    console.log("Escolha Pedra, Papel ou tesoura!")
} else if(escolhaJogador === "pedra"){
    escolha === "Pedra" ? console.log("Empate") :
    escolha === "Papel" ? console.log("Derrota") :
    escolha === "Tesoura" ? console.log("Vitória") : console.log("Tente novamente")
} else if(escolhaJogador === "papel"){
    escolha === "Pedra" ? console.log("Vitória") :
    escolha === "Papel" ? console.log("Empate") :
    escolha === "Tesoura" ? console.log("Derrota") : console.log("Tente novamente")
} else if(escolhaJogador === "tesoura"){
    escolha === "Pedra" ? console.log("Derrota") :
    escolha === "Papel" ? console.log("Vitória") :
    escolha === "Tesoura" ? console.log("Empate") : console.log("Tente novamente")
}