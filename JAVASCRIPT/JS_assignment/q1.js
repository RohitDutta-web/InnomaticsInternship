const atmWithdrawal = (balance, amount, pin, enteredPin) => {
  if (pin.toString() !== enteredPin.toString()) {
    return "Incorrect pin"
  }

  if (amount > balance) {
    return "Insufficient Funds"
  }

  if (amount % 100 !== 0) {
    return "Enter amount in multiples of 100"
  }

  balance -= amount
  return {
    finalBalance: balance,
    withdrawnAmount: amount
  };
}

console.log(atmWithdrawal(10000, 2000, 78658, 78658));
console.log(atmWithdrawal(10000, 20000, 78658, 78658));
console.log(atmWithdrawal(10000, 2021, 78658, 78658));

