interface MealDetails {
  food_id: number;
  api_id: number;
  name: string;
  quantity: number;
  serving: string;
  eaten_at: string;
  calories: number;
  protein: number;
  carbs: number;
  sugar: number;
  fiber: number;
  fat: number;
}

interface MealSearchCard {
  id: number;
  name: string;
  image: string;
  calories: number;
  serving: {
    description: string;
    calories: string;
  };
}
