import { Dimensions, View, type ViewStyle } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useCallback, useEffect } from "react";
import { type AnimatedStyle, interpolate } from "react-native-reanimated";
import { useLayout } from "@/context/LayoutContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import WorkoutCard from "@/components/custom/Stats/WorkoutCard";
import { setWorkoutStats } from "@/store/stats";

const workoutData: Partial<WorkoutStats> = {
  totalWorkouts: 10,
  totalWorkoutTime: 100,
  totalWeightLifted: [
    { label: 1, value: 100 },
    { label: 2, value: 220 },
    { label: 3, value: 90 },
    { label: 4, value: 450 },
    { label: 5, value: 400 },
    { label: 6, value: 300 },
  ],
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
const itemHeight = 500;
const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;

type TAnimationStyle = (value: number) => AnimatedStyle<ViewStyle>;

const StatsScreen = () => {
  const { setNavbarTitle } = useLayout();
  const dispatch = useDispatch();
  const macroStats = useSelector((state: RootState) => state.stats.macroStats);
  const workoutStats = useSelector(
    (state: RootState) => state.stats.workoutStats,
  );

  useEffect(() => {
    dispatch(setWorkoutStats(workoutData));
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
    <View className="h-full">
      <Carousel
        width={itemSize}
        height={itemHeight}
        style={{
          width: PAGE_WIDTH,
          height: "100%",
        }}
        data={[...new Array(2).keys()]}
        renderItem={({ index }) => (
          <WorkoutCard key={index} stats={workoutData} />
        )}
        customAnimation={animationStyle}
      />
    </View>
  );
};

export default StatsScreen;
