import { View, Text, TouchableOpacity, Image } from "react-native";

import GenericIcon from "../Icon";
import { router } from "expo-router";

type Food = {
  food_id: number;
  id: number;
  image: string;
  foodName: string;
  totalCals: string;
  quantity: string;
};

type ComponentProps = {
  title: string;
  numberOfMeals: number;
  numberOfCals: number;
  deleteMealHandler: (id: number) => void;
  meals: Food[];
};

const FoodCardComponent = ({
  title,
  numberOfMeals,
  numberOfCals,
  meals,
  deleteMealHandler,
}: ComponentProps) => {
  return (
    <View className="px-7 mb-8 gap-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-2xl font-semibold font-poppins">{title}</Text>
        <Text className="font-poppins text-[#ADA4A5]">
          {numberOfMeals} meals | {numberOfCals} calories
        </Text>
      </View>

      <View className="flex flex-col gap-4">
        {meals.map((meal, id) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "/meals/details",
                params: {
                  id: meal.id,
                  food_id: meal.food_id,
                  isNew: String(false),
                },
              })
            }
            key={id}
            className="flex flex-row w-full gap-4 items-center"
          >
            <Image
              className="h-16 w-16 rounded-2xl"
              source={{ uri: meal.image }}
            />

            <View className="flex flex-col gap-1">
              <Text className="font-poppins text-lg ">{meal.foodName}</Text>
              <Text className="font-poppins text-[#ADA4A5] font-sm ">
                {meal.quantity}
              </Text>
            </View>

            <View className="flex flex-row ms-auto items-center gap-7">
              <Text className="text-lg font-poppins">{meal.totalCals}</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                className="rounded-full p-1"
                onPress={() => deleteMealHandler(meal.id)}
              >
                <GenericIcon name={"Trash"} color="#F77F00" size={22} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FoodCardComponent;
