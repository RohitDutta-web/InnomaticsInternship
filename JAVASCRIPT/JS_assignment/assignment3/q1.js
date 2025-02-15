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

