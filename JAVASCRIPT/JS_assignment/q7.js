const applyCoupon = (orderAmount, couponCode) => {
  if (orderAmount > 500 && couponCode === "DISCOUNT10") {
  return `Final price : ${orderAmount - (orderAmount * 0.1)}`
  } else if (orderAmount > 200 && couponCode === "FREESHIP") {
    return `No shipping cost + ${orderAmount}`
  } else {
    return `${orderAmount} + Shipping cost`
}
  
}


