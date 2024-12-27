import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type ComponentProps = {
  children: any;
  title: string;
  text: string;
};

const CarouselCardComponent = (props: ComponentProps) => {
  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0.1, y: 0.8 }}
      colors={["#D62828", "#F77F00"]}
      style={{
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingVertical: 100,
        marginHorizontal: 10,
      }}
    >
      <View>{props.children}</View>

      <Text className="text-white font-poppinsSemiBold text-xl">
        {props.title}
      </Text>

      <View className="bg-white/70 w-1/6 h-0.5 mt-2"></View>
      <Text className="text-white text-center font-poppins mt-4">
        {props.text}
      </Text>
    </LinearGradient>
  );
};

export default CarouselCardComponent;
