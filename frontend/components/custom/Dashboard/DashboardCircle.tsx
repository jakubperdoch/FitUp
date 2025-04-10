import { View, Text, Image, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated from "react-native-reanimated";
import { useAnimatedProps, withTiming } from "react-native-reanimated";
import { useEffect, useState } from "react";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DashBoardCircle = ({
  value,
  colorVariation,
  title,
  icon,
  type,
  circlesPerRow = 3,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const horizontalPadding = 32;
  const gap = 16 * (circlesPerRow + 1);
  const availableWidth = screenWidth - horizontalPadding - gap;

  const containerSize = availableWidth / circlesPerRow;
  const size = containerSize * 2.5;
  const strokeWidth = size / 40;
  const radius = size / (2 * Math.PI);

  const [progress, setProgress] = useState(value);

  useEffect(() => {
    setProgress(value);
  }, [value]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(size * progress),
    };
  });

  const contentHandler = () => (
    <View className="absolute items-center gap-1">
      <Image
        source={icon}
        style={{
          width: type === "calories" ? 40 : 32,
          height: type === "calories" ? 40 : 32,
        }}
      />
      <Text className={`font-poppinsLight text-xs`}>{title}</Text>
    </View>
  );

  return (
    <View
      className="rounded-full relative items-center justify-center"
      style={{
        backgroundColor: colorVariation[2],
        height: containerSize,
        width: containerSize,
      }}
    >
      <Svg width={size} height={size}>
        <AnimatedCircle
          stroke={colorVariation[1]}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <AnimatedCircle
          stroke={colorVariation[0]}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={size}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>

      {contentHandler()}
    </View>
  );
};

export default DashBoardCircle;
