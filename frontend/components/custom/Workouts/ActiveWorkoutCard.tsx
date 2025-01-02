import { Text, View } from "react-native";
import PulseBorder from "@/components/custom/PulseBorder";
import TimeButton from "@/components/custom/Button/TimeButton";

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
    <PulseBorder>
      <View className="w-full bg-white shadow-soft-1 rounded-3xl ">
        <View className="gap-2 px-4 py-5 flex-row justify-between">
          <View className="flex-col">
            <Text>{props.name}</Text>
            <Text>{props.day}</Text>
            <Text>{props.timeOfWorkout}</Text>
          </View>

          <TimeButton
            id={props.id}
            workoutSelectHandler={props.workoutSelectHandler}
            finishWorkoutHandler={props.finishWorkoutHandler}
          />
        </View>
      </View>
    </PulseBorder>
  );
};

export default ActiveWorkoutCardComponent;
