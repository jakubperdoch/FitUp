import { LinearGradient } from "expo-linear-gradient";
import RandomImageComponent from "@/components/custom/RandomImage";
import { View, Text, TouchableOpacity } from "react-native";
import TimeButton from "@/components/custom/Button/TimeButton";

type ComponentProps = {
  id: number;
  title: string;
  timeOfWorkout: number;
  numberOfExercises: string;
  detailsHandler: () => void;
  day: string;
  timer: number | null;
  finishWorkoutHandler: (timer: number, id: number) => void;
};

const WorkoutPlanCardComponent = (props: ComponentProps) => {
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
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <View className="flex flex-col gap-2">
        <Text className="text-lg font-poppins font-semibold">
          {props.title}
        </Text>

        <Text className="font-poppins  text-[#7B6F72]">{props.day}</Text>

        <Text className="font-poppins  text-[#7B6F72]">
          {props.numberOfExercises} Exercises | {props.timeOfWorkout}min
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-white/80 p-4 mt-2 flex items-center justify-center  rounded-full"
        >
          <Text className="text-[#D62828]">View more</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white/30 h-28 w-28 flex items-center justify-center  rounded-full">
        <RandomImageComponent width={110} height={110} />
      </View>
    </LinearGradient>
  );
};

export default WorkoutPlanCardComponent;
