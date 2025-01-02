import { Text, View } from "react-native";
import TimeButton from "@/components/custom/Button/TimeButton";
import { LinearGradient } from "expo-linear-gradient";
type ComponentProps = {
  id: number;
  name: string;
  day: string;
  timeOfWorkout: number;
  numberOfExercises: number;
  finishWorkoutHandler: (isTimerClear: boolean) => void;
  detailsHandler: (id: number) => void;
  workoutSelectHandler: (id: number) => void;
};

const ActiveWorkoutCardComponent = (props: ComponentProps) => {
  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0.1, y: 0.8 }}
      colors={["rgba(214, 40, 40, 0.3)", "rgba(247, 127, 0, 0.3)"]}
      style={{ borderRadius: 20 }}
    >
      <View className="gap-2 px-4 py-5 flex-row justify-between">
        <View className="flex-col gap-1">
          <Text className="text-lg font-poppins font-semibold">
            {props.name}
          </Text>

          <Text className="font-poppins  text-[#7B6F72]">{props.day}</Text>

          <Text className="font-poppins  text-[#7B6F72]">
            {props.numberOfExercises} Exercises | {props.timeOfWorkout}min
          </Text>
        </View>

        <TimeButton
          id={props.id}
          showTimer={true}
          workoutSelectHandler={props.workoutSelectHandler}
          finishWorkoutHandler={props.finishWorkoutHandler}
        />
      </View>
    </LinearGradient>
  );
};

export default ActiveWorkoutCardComponent;
