import { View, Text, TouchableOpacity, Image } from "react-native";

import GenericIcon from "../Icon";
import { router } from "expo-router";
import Animated, { ZoomIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";

type Food = {
  food_id: number;
  id: number;
  image: string;
  name: string;
  calories: string;
  quantity: string;
  serving_description: string;
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
  const { t } = useTranslation("meals");

  const formatWords = (str) => {
    const translation = t(str);
    return translation
      .replace(/([A-Z])/g, " $1")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" ");
  };

  return (
    <Animated.View entering={ZoomIn} className="px-7 mb-8 gap-4">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl font-semibold font-poppins">
          {formatWords(title)}
        </Text>
        <Text className="font-poppins text-[#ADA4A5]">
          {numberOfMeals}{" "}
          {numberOfMeals > 1 ? (
            <Text className="font-poppins">{t("meals")}</Text>
          ) : (
            <Text className="font-poppins">{t("meal")}</Text>
          )}{" "}
          | {numberOfCals} <Text className="font-poppins">{t("calories")}</Text>
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
              <Text
                className="font-poppins text-lg truncate max-w-40"
                numberOfLines={1}
              >
                {meal.name}
              </Text>
              <Text className="font-poppins text-[#ADA4A5] font-sm ">
                {meal.quantity} x {meal.serving_description}
              </Text>
            </View>

            <View className="flex flex-row ms-auto items-center gap-7">
              <Text className="text-lg font-poppins">{meal.calories}kCal</Text>

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
    </Animated.View>
  );
};

export default FoodCardComponent;
