// 1
function retiro(saldo, retirar) {
    // 2
    if (saldo >= retirar) {
        saldo -= retirar
        return `Retiro exitoso. Saldo restante: ${saldo}`
    }
    // 3
    else {
        return 'Saldo insuficiente'
    }   
}

// 4
function retiro(saldo, retirar, tarjeta) {
    if (saldo >= retirar) {
        saldo -= retirar
        return `Retiro exitoso. Saldo restante: ${saldo}`
    }
    else if (retirar > saldo && tarjeta == true) {
        return "Saldo insuficiente, pagando con tarjeta de crédito"
    }   
    else {
        return 'Saldo insuficiente'
    }
}

console.log(retiro(100, 50, false))
console.log(retiro(100, 150, true))
console.log(retiro(100, 150, false))