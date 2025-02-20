import { View, Text, Image } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated from "react-native-reanimated";
import { useAnimatedProps, withTiming } from "react-native-reanimated";
import { useEffect, useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DashBoardCircle = ({
  value,
  colorVariation,
  title,
  size,
  icon,
  type,
}) => {
  const strokeWidth = size / 40;
  const circleLength = size;
  const radius = circleLength / (2 * Math.PI);
  const [progress, setProgress] = useState(value);

  useEffect(() => {
    setProgress(value);
  }, [value]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(circleLength * progress),
    };
  });

  const contentHandler = () => {
    if (type === "calories") {
      return (
        <View className="absolute items-center gap-1">
          <Image source={icon} className="h-10 w-10" />
          <Text className="font-poppinsLight text-sm">{title}</Text>
        </View>
      );
    } else {
      return (
        <View className="absolute items-center gap-1">
          <Image source={icon} className="h-8 w-8" />
          <Text className="font-poppinsLight text-sm">{title}</Text>
        </View>
      );
    }
  };

  return (
    <View
      className={`rounded-full relative items-center justify-center`}
      style={{
        backgroundColor: colorVariation[2],
        height: size / 2.5,
        width: size / 2.5,
      }}
    >
      <Svg width={circleLength} height={circleLength}>
        <AnimatedCircle
          stroke={colorVariation[1]}
          fill="none"
          cx={circleLength / 2}
          cy={circleLength / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap={"round"}
        />
        <AnimatedCircle
          stroke={colorVariation[0]}
          fill="none"
          cx={circleLength / 2}
          cy={circleLength / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circleLength}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
        />
      </Svg>

      {contentHandler()}
    </View>
  );
};

export default DashBoardCircle;
