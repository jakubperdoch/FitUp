import { Dimensions, Text, View, type ViewStyle } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useCallback, useEffect } from "react";
import { type AnimatedStyle, interpolate } from "react-native-reanimated";
import { useLayout } from "@/context/LayoutContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import WorkoutCard from "@/components/custom/Stats/WorkoutCard";

const workoutStats: Partial<WorkoutStats> = {
  totalWorkouts: 10,
  totalWorkoutTime: 100,
  totalWeightLifted: 1000,
  avgReps: 10,
  avgWeight: 100,
  mostFrequentExercise: "Bench Press",
  personalBest: {
    exercise: "Deadlift",
    weight: 500,
    reps: 5,
  },
};

const macroStats: Partial<MacroStats> = {
  totalCalories: 1000,
  totalProtein: 100,
  totalCarbs: 100,
  totalFat: 100,
  avgCalories: 100,
  avgProtein: 100,
  avgCarbs: 100,
  avgFat: 100,
  mostEatenFood: "Chicken",
};

const PAGE_WIDTH = Dimensions.get("window").width;
const itemSize = 300;
const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;

type TAnimationStyle = (value: number) => AnimatedStyle<ViewStyle>;

const StatsScreen = () => {
  const { setNavbarTitle } = useLayout();

  const macroStats = useSelector((state: RootState) => state.stats.macroStats);
  const workoutStats = useSelector(
    (state: RootState) => state.stats.workoutStats,
  );

  useEffect(() => {
    setNavbarTitle("Statistics");
  }, []);

  const animationStyle: TAnimationStyle = useCallback(
    (value: number) => {
      "worklet";

      const itemGap = interpolate(value, [-1, 0, 1], [-10, 0, 10]);

      const translateX =
        interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
        centerOffset -
        itemGap;

      const translateY = interpolate(value, [-1, 0, 1], [80, 40, 80]);

      const scale = interpolate(value, [-1, 0, 1], [0.85, 1.1, 0.85]);
      const opacity = interpolate(value, [-1, 0, 1], [0.75, 1, 0.75]);

      return {
        transform: [
          {
            translateX,
          } as { translateX: number },
          {
            translateY,
          } as { translateY: number },
          { scale } as { scale: number },
        ],
        opacity,
      };
    },
    [centerOffset],
  );

  return (
    <View>
      <WorkoutCard stats={workoutStats} />

      {/*<Carousel*/}
      {/*  width={itemSize}*/}
      {/*  height={itemSize}*/}
      {/*  style={{*/}
      {/*    width: PAGE_WIDTH,*/}
      {/*    height: "80%",*/}
      {/*    overflow: "visible",*/}
      {/*    alignItems: "flex-start",*/}
      {/*  }}*/}
      {/*  data={[...new Array(3).keys()]}*/}
      {/*  renderItem={({ index }) => (*/}
      {/*    <TouchableWithoutFeedback*/}
      {/*      key={index}*/}
      {/*      containerStyle={{ flex: 1 }}*/}
      {/*      style={{ flex: 1 }}*/}
      {/*    ></TouchableWithoutFeedback>*/}
      {/*  )}*/}
      {/*  customAnimation={animationStyle}*/}
      {/*/>*/}
    </View>
  );
};

export default StatsScreen;
