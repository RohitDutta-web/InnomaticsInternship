
const calculateTicketPrice = (age, showTime) => {
  let standardPrice = 12;
  let [hour, period] = showTime.split(" ");
  hour = parseInt(hour);
  let afterTimingDiscount = standardPrice * (hour < 5 && period.toLowerCase() === "pm" ? 0.8 : 1);
  if (age > 60) {
    return Math.round(afterTimingDiscount * 0.7);
  } else if (age <= 12) {
    return Math.round(afterTimingDiscount * 0.6);
  } else {
    return Math.round(afterTimingDiscount);
  }
}

console.log(calculateTicketPrice(20, "5 PM"));
console.log(calculateTicketPrice(70, "5 PM"));
console.log(calculateTicketPrice(2, "2 PM"));



