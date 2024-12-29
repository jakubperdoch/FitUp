import { View, Text, Image } from "react-native";
import TimeButton from "@/components/custom/Button/TimeButton";
import RandomImageComponent from "@/components/custom/RandomImage";
import { LinearGradient } from "expo-linear-gradient";
import useSortedWorkouts from "@/utils/workouts";

type ComponentProps = {
  id: number;
  title: string;
  day: any;
  timer: number;
  finishWorkoutHandler: (timer: number, id: number) => void;
};

const WorkoutTimerCardComponent = (props: ComponentProps) => {
  return (
    <View className="flex-row items-center justify-between shadow-sm mb-6 rounded-3xl bg-white p-5">
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0.1, y: 0.8 }}
        colors={["#D62828", "#F77F00"]}
        style={{
          height: 70,
          width: 70,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "100%",
        }}
      >
        <RandomImageComponent height={55} width={55} />
      </LinearGradient>

      <View>
        <Text>{props.title}</Text>
        <Text className="capitalize">{props.day}</Text>
      </View>

      <TimeButton
        id={props.id}
        timer={props.timer}
        timerHandler={props.finishWorkoutHandler}
      />
    </View>
  );
};

export default WorkoutTimerCardComponent;
