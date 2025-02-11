const trafficLightControl = (density) => {
  if (density === "Heavy Traffic") {
    return "Green for 60 seconds";
  } else if (density === "Moderate Traffic") {
    return "Green for 40 seconds";
  } else {
    return "Green for 20 seconds";
  }
}


