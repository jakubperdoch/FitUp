import { View, Text, TouchableOpacity, Image } from "react-native";
import GenericIcon from "../../Icon";

interface ComponentProps {
  onClick: (id: number) => void;
  meal: MealSearchCard;
}

const FoodScrollCardComponent = ({ onClick, meal }: ComponentProps) => {
  return (
    <TouchableOpacity
      onPress={() => onClick(meal.id)}
      className="shadow-soft-0 mb-6 rounded-3xl bg-white p-5 flex flex-row gap-3 items-center"
    >
      {meal.image && (
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: meal.image,
          }}
        />
      )}

      <View className="flex flex-col gap-1">
        <Text
          className="font-poppins text-lg truncate max-w-60"
          numberOfLines={1}
        >
          {meal.name.replace(/\s*\(.*?\)\s*/g, "")}
        </Text>
        <Text
          className="font-poppins text-[#ADA4A5] font-sm truncate max-w-60"
          numberOfLines={1}
        >
          {meal?.serving?.description} | {meal?.serving?.calories} kCal
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => onClick(meal.id)}
        className="border border-[#F77F00] rounded-full p-1 ms-auto"
      >
        <GenericIcon name="ChevronRight" color="#F77F00" size={22} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default FoodScrollCardComponent;
