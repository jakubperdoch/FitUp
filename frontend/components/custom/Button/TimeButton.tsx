// components/TimeButton.jsx
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import GenericIcon from "../Icon";
import Animated, { ZoomIn } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTimer } from "@/store/workout";
import { useWorkoutTimer } from "@/hooks/workouts";

type ComponentProps = {
  id: number;
  workoutSelectHandler: (id: number) => void;
  finishWorkoutHandler: (isTimerClear: boolean) => void;
  showTimer?: boolean;
};

const TimeButton = (props: ComponentProps) => {
  const dispatch = useDispatch();
  const { workout, isTimerActive } = useSelector(
    (state: RootState) => state.workout,
  );
  const { startTimer, stopTimer } = useWorkoutTimer();

  const isCurrentWorkoutActive = isTimerActive && workout?.id === props.id;
  const isAnotherWorkoutActive = workout?.id !== props.id && workout?.timer > 0;

  const buttonStateHandler = async () => {
    if (isAnotherWorkoutActive) {
      Alert.alert(
        "Workout Active",
        "Another workout is already active. Please finish or stop the current workout before starting a new one.",
      );
      return;
    }

    if (isCurrentWorkoutActive) {
      await stopTimer();
      dispatch(setTimer(false));
    } else {
      props.workoutSelectHandler(props.id);
      await startTimer();
      dispatch(setTimer(true));
    }
  };

  const finishWorkoutHandler = async () => {
    await stopTimer();
    dispatch(setTimer(false));
    props.finishWorkoutHandler(false);
  };

  const deleteWorkoutHandler = async () => {
    await stopTimer();
    dispatch(setTimer(false));
    props.finishWorkoutHandler(true);
  };

  const timeHandler = (timeValue: number) => {
    if (timeValue <= 0) {
      return;
    } else if (timeValue < 60) {
      return <Text className="font-poppins">{timeValue}s</Text>;
    } else if (timeValue < 3600) {
      const minutes = Math.floor(timeValue / 60);
      return <Text className="font-poppins">{minutes} min</Text>;
    } else {
      const hours = Math.floor(timeValue / 3600);
      const minutes = Math.floor((timeValue % 3600) / 60);
      return (
        <Text className="h-min font-poppins">
          {hours} hour{hours > 1 ? "s" : ""}{" "}
          {minutes > 0 ? `${minutes} min` : ""}
        </Text>
      );
    }
  };

  const buttonIcon = isCurrentWorkoutActive ? "Pause" : "Play";

  return (
    <Animated.View className="flex flex-col items-center justify-center gap-1.5">
      <View className="flex-row gap-3">
        <TouchableOpacity activeOpacity={0.7} onPress={buttonStateHandler}>
          <LinearGradient
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1.3, y: 0.25 }}
            colors={
              isCurrentWorkoutActive
                ? ["#D62828", "#D62828"]
                : ["#2CBF29", "#24E022"]
            }
            style={{
              height: 35,
              width: 35,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
          >
            <GenericIcon
              name={buttonIcon}
              size={15}
              color="white"
              fill="white"
            />
          </LinearGradient>
        </TouchableOpacity>

        {isCurrentWorkoutActive && workout?.timer > 0 && (
          <Animated.View entering={ZoomIn} className="flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={deleteWorkoutHandler}
            >
              <LinearGradient
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1.3, y: 0.25 }}
                colors={["#D62828", "#D62828"]}
                style={{
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                }}
              >
                <GenericIcon name="X" size={23} color="white" fill="white" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={finishWorkoutHandler}
            >
              <LinearGradient
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1.3, y: 0.25 }}
                colors={["#F2EA00", "#FF6F00"]}
                style={{
                  height: 35,
                  width: 35,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                }}
              >
                <GenericIcon name="Check" size={23} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      {props.showTimer && workout && timeHandler(workout?.timer)}
    </Animated.View>
  );
};

export default TimeButton;
