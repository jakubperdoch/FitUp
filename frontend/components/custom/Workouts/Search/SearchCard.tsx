import { Text, TouchableOpacity, View } from "react-native";
import GenericIcon from "@/components/custom/Icon";

interface ComponentProps {
  exercise: Exercise;
}

const SearchCardComponent = ({ exercise }: ComponentProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="shadow-soft-1 w-full p-6 bg-white rounded-xl flex-row justify-between items-center"
    >
      <Text className="text-lg font-poppins capitalize font-semibold">
        {exercise?.name}
      </Text>

      <TouchableOpacity activeOpacity={0.7}>
        <GenericIcon name={"Info"} color="#F77F00" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SearchCardComponent;
