const isEligibleForJob = (age, experience, qualification) => {
  let ageEligibility = age > 21 && age < 55
  let [number, unit] = experience.split(" ")
  number = parseInt(number)
  let experienceEligibility = number >= 2 && unit.toLowerCase() === "years"
  let qualificationEligibility = qualification.toLowerCase() === "bachelor's degree"


  if (ageEligibility && experienceEligibility && qualificationEligibility) {
    return "Eligible"
  } else {
    return "Not eligible"
  }


}
console.log(

  isEligibleForJob(29, "5 months", "Bachelor's Degree")
);
