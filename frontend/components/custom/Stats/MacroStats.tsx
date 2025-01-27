import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text } from "react-native";

const MacroStatsComponent = () => {
  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0.1, y: 0.8 }}
      colors={["rgba(247, 127, 0, .3)", "rgba(234, 226, 183, .3)"]}
      style={{
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 5,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-7"
      >
        <Text className="font-poppinsSemiBold text-xl">Your diet progress</Text>
      </ScrollView>
    </LinearGradient>
  );
};

export default MacroStatsComponent;
