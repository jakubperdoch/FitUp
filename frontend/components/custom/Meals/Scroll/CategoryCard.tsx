import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Category = {
  id: number;
  name: string;
};

type ComponentProps = {
  onClick: (name: string) => void;
  category: Category;
};

const CategoryCardComponent = (props: ComponentProps) => {
  return (
    <TouchableOpacity onPress={() => props.onClick(props.category.name)}>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0.1, y: 0.8 }}
        colors={["rgba(214, 40, 40, 0.3)", "rgba(247, 127, 0, 0.3)"]}
        style={{
          height: 55,

          borderRadius: 10,
          paddingHorizontal: 15,
          justifyContent: "center",
          alignItems: "center",
          marginEnd: 15,
        }}
      >
        <Text className="font-poppins text-center">{props.category.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CategoryCardComponent;
