const calculateFinalAmount = (price) => {
  let finalAmount = 0;
  let shippingCharge = 10;
  switch (true) {
    case price <= 50:
      finalAmount += price + shippingCharge;
      break;
    case price > 50 && price < 500:
      finalAmount += price;
      break;
    case price >= 500 && price <= 1000:
      finalAmount += (price - (price * (10 / 100)))
      break;
    case price > 1000:
      finalAmount += (price - (price * (20 / 100)))
      break;
  }
  return finalAmount;
}

