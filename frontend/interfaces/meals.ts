interface MealDetails {
  id?: string | null;
  food_id?: string;
  name?: string;
  image?: string;
  quantity?: number;
  serving_description?: string;
  serving_id?: string;
  eaten_at?: string;
  date?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  sugar?: number;
  fiber?: number;
  fat?: number;
  selected_eaten_at?: string;
  selected_serving_quantity?: number;
  selected_serving_id?: string;
}

interface ServingType {
  serving_description: string;
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
