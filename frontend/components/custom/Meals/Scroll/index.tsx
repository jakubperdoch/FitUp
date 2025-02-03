import { FlatList, Text, View } from "react-native";
import FoodScrollCardComponent from "./Card";
import { useEffect } from "react";

interface ComponentProps {
  meals: MealSearchCard[];
  onClick: (id: number) => void;
}

const FoodScrollComponent = ({ meals, onClick }: ComponentProps) => {
  return (
    <View className="h-full flex flex-col gap-5">
      <Text className="ms-7 text-2xl font-semibold font-poppins ">Meals</Text>
      <FlatList
        data={meals}
        className="px-7  h-full"
        contentContainerClassName="pt-3 pb-[40rem]"
        renderItem={({ item }) => (
          <FoodScrollCardComponent
            key={item.id}
            meal={item}
            onClick={onClick}
          />
        )}
        ListEmptyComponent={() => (
          <Text className="mx-auto text-[#ADA4A5]">No meals found.</Text>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default FoodScrollComponent;
