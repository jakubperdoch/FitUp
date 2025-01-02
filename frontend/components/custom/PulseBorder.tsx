import React from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { useEffect } from "react";

const PulseBorder = ({ children }) => {
  const duration = 2000;
  const delayStep = 400;

  const scaleXs = [useSharedValue(1), useSharedValue(1), useSharedValue(1)];
  const scaleYs = [useSharedValue(1), useSharedValue(1), useSharedValue(1)];

  scaleXs.forEach((scaleX, index) => {
    useEffect(() => {
      scaleX.value = withDelay(
        index * delayStep,
        withRepeat(
          withTiming(1.1, {
            duration,
            easing: Easing.out(Easing.ease),
          }),
          -1,
          true,
        ),
      );
    }, [scaleX]);
  });

  scaleYs.forEach((scaleY, index) => {
    useEffect(() => {
      scaleY.value = withDelay(
        index * delayStep,
        withRepeat(
          withTiming(1.4, {
            duration,
            easing: Easing.out(Easing.ease),
          }),
          -1,
          true,
        ),
      );
    }, [scaleY]);
  });

  return (
    <View className="w-full">
      {[...Array(3).keys()].map((layerIndex) => {
        const animatedStyle = useAnimatedStyle(() => {
          const sX = scaleXs[layerIndex].value;
          const sY = scaleYs[layerIndex].value;

          const opacity = interpolate(
            sX,
            [1, 1.1],
            [0.4, 0],
            Extrapolation.CLAMP,
          );

          return {
            opacity,
            transform: [{ scaleX: sX }, { scaleY: sY }],
          };
        });

        return (
          <Animated.View
            key={layerIndex}
            style={animatedStyle}
            className="absolute border-4 border-[#F77F00] w-full h-full rounded-3xl"
          />
        );
      })}

      {children}
    </View>
  );
};

export default PulseBorder;
