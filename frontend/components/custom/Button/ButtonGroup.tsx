import { Text, TouchableOpacity, View } from "react-native";

interface ComponentProps {
  options: string[];
  optionSelectHandler: (option: string) => void;
  activeOption: string;
}

const ButtonGroupComponent = ({
  options,
  activeOption,
  optionSelectHandler,
}: ComponentProps) => {
  return (
    <View className="flex-row gap-5 items-center mb-2">
      <TouchableOpacity onPress={() => optionSelectHandler(options[0])}>
        <Text
          className={`font-poppins transition-all duration-100 ${activeOption === options[0] ? "text-red-700" : ""}`}
        >
          {options[0]}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => optionSelectHandler(options[1])}>
        <Text
          className={`font-poppins transition-all duration-100 ${activeOption === options[1] ? "text-red-700" : ""}`}
        >
          {options[1]}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonGroupComponent;
