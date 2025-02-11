const calculateElectricityBill = (units, timeOfDay) => {
  let [hour, unit] = timeOfDay.split(" ");
  hour = parseInt(hour);
  
  if (unit.toLowerCase() === "pm" && hour !== 12) {
    hour += 12;
  } else if (unit.toLowerCase() === "am" && hour === 12) {
    hour = 0;
  }

  let total;
  if (units < 100) {
    total = units * 5;
  } else if (units >= 100 && units <= 300) {
    total = units * 4;
  } else {
    total = units * 3;
  }

  if (hour >= 20 || hour < 8) {
    return total + total * 0.1;
  }

  return total;
}


