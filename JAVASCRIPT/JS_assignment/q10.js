const calculateFlightFare = (classType, luggageWeight, isStudent, isSenior) => {
  let finalFare = 300

  if (classType === "Business class") {
    finalFare += 200
  } else if(classType === "First class") {
    finalFare += 500
  }

  if (luggageWeight > 20) {
    finalFare += 50 * (luggageWeight - 20);
  }

  if (isStudent) {
    finalFare = finalFare - (finalFare * 0.15)
  } else if (isSenior) {
    finalFare = finalFare - (finalFare * 0.10)
  }

  return finalFare
}