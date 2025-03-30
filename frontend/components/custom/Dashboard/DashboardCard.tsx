import { View, Text, TouchableOpacity } from "react-native";
import TimeButton from "../Button/TimeButton";
import Animated, { ZoomIn } from "react-native-reanimated";
import { shadows } from "@/styles/shadows";

type ComponentProps = {
  id: number;
  name: string;
  date?: {
    date: string;
    time: string;
  };
  calories?: number;
  numberOfExercises?: number;
  day?: string;
  showTimer?: boolean;
  finishWorkoutHandler?: (isTimerClear: boolean) => void;
  detailsHandler?: (id: number) => void;
  workoutSelectHandler?: (id: number) => void;
};

const DashboardCardComponent = (props: ComponentProps) => {
  return (
    <Animated.View entering={ZoomIn} className="w-full">
      <TouchableOpacity
        style={shadows.soft1}
        onPress={() => props.detailsHandler(props?.id)}
        className="w-full gap-2 bg-white px-4 py-5 rounded-3xl flex-row justify-between"
      >
        <View className="gap-1 w-44">
          <Text
            className="font-poppins text-lg w-60 truncate capitalize"
            numberOfLines={1}
          >
            {props?.name}
          </Text>
          <View className="flex-row gap-2">
            {props.day != null && props.numberOfExercises != null ? (
              <Text className="text-[#7B6F72] font-poppins">
                {props.day} | {props.numberOfExercises} Exercises
              </Text>
            ) : (
              <Text className="text-[#7B6F72] font-poppins">
                Today | {props.calories}kCal
              </Text>
            )}
          </View>
        </View>

        {props.showTimer && (
          <TimeButton
            id={props.id}
            workoutSelectHandler={props.workoutSelectHandler}
            finishWorkoutHandler={props.finishWorkoutHandler}
          />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DashboardCardComponent;
