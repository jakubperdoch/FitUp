import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { router } from "expo-router";

const icons = {
  fire: require("@/assets/icons/fire.png"),
  transFats: require("@/assets/icons/trans-fats.png"),
  protein: require("@/assets/icons/protein.png"),
  carbohydrates: require("@/assets/icons/carbohydrates.png"),
  sugarCube: require("@/assets/icons/sugar-cube.png"),
  grain: require("@/assets/icons/grain.png"),
};

const defaultNutritionData = [
  { icon: icons.fire, suffix: null, metric: "kCal", type: "calories" },
  { icon: icons.transFats, suffix: "fat", metric: "g", type: "fats" },
  { icon: icons.protein, suffix: "protein", metric: "g", type: "protein" },
  { icon: icons.carbohydrates, suffix: "carbs", metric: "g", type: "carbs" },
  { icon: icons.sugarCube, suffix: "sugar", metric: "g", type: "sugar" },
  { icon: icons.grain, suffix: "fiber", metric: "g", type: "fiber" },
];

const partsOfDayData = [
  { name: "Breakfast", value: "breakfast" },
  { name: "Morning Snack", value: "morningSnack" },
  { name: "Lunch", value: "lunch" },
  { name: "Afternoon Snack", value: "afternoonSnack" },
  { name: "Dinner", value: "dinner" },
  { name: "Late Night Snack", value: "lateNightSnack" },
];

const useMeals = () => {
  const [servingAmount, setServingAmount] = useState(1);
  const [selectedServingType, setSelectedServingType] =
    useState<ServingType | null>(null);
  const [meal, setMeal] = useState<Partial<MealDetails>>({});
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState(partsOfDayData[0]);

  const nutritionData = useMemo(() => {
    if (!selectedServingType) {
      return defaultNutritionData.map((item) => ({ ...item, value: 0 }));
    }

    const amount = parseFloat(String(servingAmount)) || 1;
    const calculated = {
      calories: +(parseFloat(selectedServingType.calories) * amount).toFixed(2),
      fats: +(parseFloat(selectedServingType.fat) * amount).toFixed(2),
      protein: +(parseFloat(selectedServingType.protein) * amount).toFixed(2),
      carbs: +(parseFloat(selectedServingType.carbohydrate) * amount).toFixed(
        2,
      ),
      sugar: +(parseFloat(selectedServingType.sugar) * amount).toFixed(2),
      fiber: +(parseFloat(selectedServingType.fiber) * amount).toFixed(2),
    };

    return [
      { ...defaultNutritionData[0], value: calculated.calories },
      { ...defaultNutritionData[1], value: calculated.fats },
      { ...defaultNutritionData[2], value: calculated.protein },
      { ...defaultNutritionData[3], value: calculated.carbs },
      { ...defaultNutritionData[4], value: calculated.sugar },
      { ...defaultNutritionData[5], value: calculated.fiber },
    ];
  }, [selectedServingType, servingAmount]);

  useEffect(() => {
    setMeal((prev) => ({
      ...prev,
      quantity: servingAmount,
      serving_id: selectedServingType?.serving_id,
      calories: nutritionData[0].value,
      fat: nutritionData[1].value,
      protein: nutritionData[2].value,
      carbs: nutritionData[3].value,
      sugar: nutritionData[4].value,
      fiber: nutritionData[5].value,
      eaten_at: selectedTimeOfDay.value,
    }));
  }, [selectedServingType, servingAmount, nutritionData, selectedTimeOfDay]);

  const initMeal = (mealData: any, date: string) => {
    setMeal({
      id: mealData.record_id || null,
      food_id: mealData.food_id,
      name: mealData.name,
      quantity: mealData?.selected_serving_quantity || servingAmount,
      serving_id:
        mealData.selected_serving_id || selectedServingType?.serving_id,
      eaten_at: mealData?.selected_serving_eaten_at || selectedTimeOfDay.value,
      date: date,
      calories: nutritionData[0].value,
      protein: nutritionData[2].value,
      carbs: nutritionData[3].value,
      sugar: nutritionData[4].value,
      fiber: nutritionData[5].value,
      fat: nutritionData[1].value,
    });
  };

  const { mutate: addMeal, error: addMealError } = useMutation<
    any,
    Error,
    Partial<MealDetails>
  >({
    mutationKey: ["addMeal"],
    mutationFn: (meal) =>
      apiFetch("/meals/add", {
        method: "POST",
        body: meal,
      }),
    onSuccess: () => {
      router.replace("/meals");
    },
  });

  return {
    servingAmount,
    setServingAmount,
    selectedServingType,
    setSelectedServingType,
    meal,
    setMeal,
    nutritionData,
    partsOfDayData,
    selectedTimeOfDay,
    setSelectedTimeOfDay,
    initMeal,
    addMeal,
    addMealError,
  };
};

export default useMeals;
