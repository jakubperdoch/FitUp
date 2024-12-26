import { ScrollView, Text, View } from "react-native";
import FoodScrollCardComponent from "./Card";

type Meal = {
  id: number;
  name: string;
  calories: number;
};

type ComponentProps = {
  meals: Meal[];
  onClick: (id: number) => void;
};

const FoodScrollComponent = (props: ComponentProps) => {
  return (
    <View className="h-full flex flex-col gap-5">
      <Text className="ms-7 text-2xl font-semibold font-poppins ">Meals</Text>
      <ScrollView
        className="px-7  h-full"
        contentContainerClassName="pb-[40rem]"
      >
        {props.meals.length > 0 ? (
          props.meals.map((meal) => {
            return (
              <FoodScrollCardComponent
                key={meal.id}
                meal={meal}
                onClick={props.onClick}
              />
            );
          })
        ) : (
          <Text className="mx-auto text-[#ADA4A5]">Nothing to show</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FoodScrollComponent;
