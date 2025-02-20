import { LinearGradient } from "expo-linear-gradient";
import RandomImageComponent from "@/components/custom/RandomImage";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

type ComponentProps = {
  id: number;
  title: string;
  numberOfExercises: number;
  detailsHandler: () => void;
  day: string;
};

const WorkoutPlanCardComponent = (props: ComponentProps) => {
  const { t } = useTranslation("workouts");
  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0.1, y: 0.8 }}
      colors={["rgba(214, 40, 40, 0.3)", "rgba(247, 127, 0, 0.3)"]}
      style={{
        borderRadius: 30,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 20,
        justifyContent: "space-around",
        padding: 20,
      }}
    >
      <View className="flex flex-col gap-1 w-2/4">
        <Text
          className="text-lg font-poppins font-semibold w-full max-w-44 truncate capitalize"
          numberOfLines={1}
        >
          {props.title}
        </Text>

        <Text className="font-poppins  text-[#7B6F72]">{props.day}</Text>

        <Text className="font-poppins  text-[#7B6F72]">
          {props.numberOfExercises}{" "}
          {t("workoutCard.exercise", { context: "workouts" })}
        </Text>

        <TouchableOpacity
          onPress={props.detailsHandler}
          activeOpacity={0.7}
          className="bg-white/80 p-4 mt-2 flex items-center justify-center  rounded-full"
        >
          <Text className="text-[#D62828] font-poppins">
            {t("workoutCard.viewMore", { context: "workouts" })}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white/30 h-28 w-28 flex items-center justify-center  rounded-full">
        <RandomImageComponent width={130} height={130} />
      </View>
    </LinearGradient>
  );
};

export default WorkoutPlanCardComponent;
