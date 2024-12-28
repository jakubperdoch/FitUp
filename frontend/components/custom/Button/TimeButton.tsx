import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Text, View } from "react-native";
import GenericIcon from "../Icon";
import { useEffect, useState, useRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

type ComponentProps = {
  id: number;
  timer: number | null;
  timerHandler: (timer: number, id: number) => void;
};

const TimeButton = ({ timer, timerHandler, id }: ComponentProps) => {
  // variables
  const [isPaused, setIsPaused] = useState(false);
  const [buttonIcon, setButtonIcon] = useState("Play");
  const additionalButtons = useSharedValue(0);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const DURATION = 1000;
  const DELAY = 300;

  // handlers
  const buttonStateHandler = () => {
    setIsPaused((prevState) => !prevState);
  };

  const finishWorkoutHandler = () => {
    timer = time;
    timerHandler(timer, id);
  };

  const deleteWorkoutHandler = () => {
    timer = 0;
    setTime(0);
    setIsPaused(false);
  };

  const timeHandler = (timeValue: number) => {
    if (timeValue < 60) {
      return <Text>{timeValue}s</Text>;
    } else if (timeValue < 3600) {
      const minutes = Math.floor(timeValue / 60);
      return <Text>{minutes} min</Text>;
    } else {
      const hours = Math.floor(timeValue / 3600);
      const minutes = Math.floor((timeValue % 3600) / 60);
      return (
        <Text>
          {hours} hour{hours > 1 ? "s" : ""}{" "}
          {minutes > 0 ? `${minutes} min` : ""}{" "}
        </Text>
      );
    }
  };

  useEffect(() => {
    if (isPaused) {
      setButtonIcon("Pause");
      intervalRef.current = setInterval(() => {
        setTime((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      setButtonIcon("Play");
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const additionalButtonsHandler = () => {
    if (!isPaused && time > 0) {
      return (
        <Animated.View style={animatedStyle} className="flex-row gap-3">
          <TouchableOpacity onPress={() => deleteWorkoutHandler()}>
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

          <TouchableOpacity onPress={() => finishWorkoutHandler()}>
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
      );
    }
  };

  // animations
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: additionalButtons.value,
    };
  });

  useEffect(() => {
    if (!isPaused && time > 0) {
      additionalButtons.value = withDelay(
        0,
        withTiming(1, { duration: DURATION }),
      );
    } else {
      additionalButtons.value = withTiming(0, { duration: DURATION }); // Fade out
    }
  }, [isPaused, time]);

  return (
    <View className="flex flex-col items-center justify-center gap-3">
      <View className="flex-row gap-3">
        <TouchableOpacity onPress={buttonStateHandler}>
          <LinearGradient
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1.3, y: 0.25 }}
            colors={isPaused ? ["#D62828", "#D62828"] : ["#2CBF29", "#24E022"]}
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
        {additionalButtonsHandler()}
      </View>

      <Text>{timeHandler(time)}</Text>
    </View>
  );
};

export default TimeButton;
