interface MealDetails {
  id?: string | null;
  food_id?: string;
  name?: string;
  quantity?: number;
  serving_id?: string;
  eaten_at?: string;
  date?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  sugar?: number;
  fiber?: number;
  fat?: number;
}

interface ServingType {
  serving_id: string;
  calories: string;
  fat: string;
  protein: string;
  carbohydrate: string;
  sugar: string;
  fiber: string;
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
