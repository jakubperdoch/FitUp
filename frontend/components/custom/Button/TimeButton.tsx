// components/TimeButton.jsx
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, View, Text } from "react-native";
import GenericIcon from "../Icon";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTimer, updateTimer } from "@/store/workout";
import { useWorkoutTimer } from "@/utils/workouts";

type ComponentProps = {
  id: number;
  workoutSelectHandler: (id: number) => void;
  finishWorkoutHandler: () => void;
};

const TimeButton = (props: ComponentProps) => {
  const dispatch = useDispatch();
  const { workout, isTimerActive } = useSelector(
    (state: RootState) => state.workout,
  );
  const { startTimer, stopTimer } = useWorkoutTimer();

  const isCurrentWorkoutActive = isTimerActive && workout?.id === props.id;

  const buttonStateHandler = async () => {
    if (isTimerActive && workout.id !== props.id) {
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
    props.finishWorkoutHandler();
    dispatch(setTimer(false));
  };

  const deleteWorkoutHandler = async () => {
    await stopTimer();
    props.finishWorkoutHandler();
    dispatch(setTimer(false));
    dispatch(updateTimer(0));
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
    </Animated.View>
  );
};

export default TimeButton;
