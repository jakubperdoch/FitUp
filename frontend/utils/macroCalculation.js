export const calculateMacros = (age, gender, weight, height, goal) => {
  const activityFactor = 1.55;

  const BMR =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const TDEE = BMR * activityFactor;

  const goalFactor = goal === "lose" ? 0.8 : goal === "gain" ? 1.1 : 1;

  const calories = TDEE * goalFactor;

  const macros = {
    lose: { protein: 0.4, fat: 0.3, carbs: 0.3 },
    maintain: { protein: 0.3, fat: 0.3, carbs: 0.4 },
    gain: { protein: 0.3, fat: 0.25, carbs: 0.45 },
  }[goal];

  return {
    calories: Math.round(calories),
    protein: Math.round((calories * macros.protein) / 4),
    fats: Math.round((calories * macros.fat) / 9),
    carbs: Math.round((calories * macros.carbs) / 4),
    fiber: Math.round((calories / 1000) * 14),
    sugar: Math.round((calories * 0.1) / 4),
  };
};
