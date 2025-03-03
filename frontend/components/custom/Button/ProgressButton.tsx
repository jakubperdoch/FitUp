import Svg, { Circle, LinearGradient, Stop, Defs } from "react-native-svg";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient as ButtonGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedProps,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const strokeWidth = 2.5;
const circleLength = 200;
const radius = circleLength / (2 * Math.PI);

const ProgressButton = ({ progress, onPressHandler }) => {
  const progressBarValue = useSharedValue(progress);

  useEffect(() => {
    progressBarValue.value = withTiming(progress);
  }, [progress]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circleLength * progressBarValue.value,
    };
  });

  return (
    <View style={styles.button_container}>
      <Svg
        width={circleLength}
        height={circleLength}
        style={styles.button_outer}
      >
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#F77F00" stopOpacity="1" />
            <Stop offset="1" stopColor="#D62828" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <AnimatedCircle
          stroke="url(#grad)"
          fill="none"
          cx={circleLength / 2}
          cy={circleLength / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circleLength}
          animatedProps={animatedProps}
        />
      </Svg>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button_inner}
        onPress={onPressHandler}
      >
        <ButtonGradient
          colors={["#F77F00", "#D62828"]}
          style={styles.button_background}
        >
          <MaterialIcons name="arrow-forward-ios" size={17} color="white" />
        </ButtonGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button_container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    alignSelf: "flex-end",
    marginTop: "auto",
  },
  button_outer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button_background: {
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: 55,
    borderRadius: 50,
  },
  button_inner: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProgressButton;
