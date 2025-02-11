const choosePlan = (planType, wantsTrainer, wantsDietPlan) => {
  switch (true) {
    case wantsDietPlan:
      return "VIP Plan - $80/month (Gym + Trainer + Diet Plan)";
    case wantsTrainer:
      return "Premium Plan - $50/month (Gym + Personal Trainer)";
    default:
      return "Basic Plan - $20/month (Gym Access Only)";
  } 
}


