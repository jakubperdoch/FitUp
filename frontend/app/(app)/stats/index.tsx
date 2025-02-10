import { Dimensions, View, type ViewStyle } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useCallback, useEffect } from "react";
import { type AnimatedStyle, interpolate } from "react-native-reanimated";
import { useLayout } from "@/context/LayoutContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import WorkoutStatsComponent from "@/components/custom/Stats/WorkoutStats";
import { setMacroStats, setWorkoutStats } from "@/store/stats";
import MacroStatsComponent from "@/components/custom/Stats/MacroStats";

const macroData: Partial<MacroStats> = {
  totalCalories: 1000,
  mostFrequentMeal: "Chicken",
  macros: {
    protein: 90,
    carbs: 120,
    fat: 30,
    sugar: 10,
    fiber: 90,
  },
};

const PAGE_WIDTH = Dimensions.get("window").width;
const itemSize = 300;
const itemHeight = 550;
const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;

type TAnimationStyle = (value: number) => AnimatedStyle<ViewStyle>;

const StatsScreen = () => {
  const { setNavbarTitle } = useLayout();

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
          <>
            {index === 0 ? (
              <WorkoutStatsComponent key={index} />
            ) : (
              <MacroStatsComponent key={index} />
            )}
          </>
        )}
        customAnimation={animationStyle}
      />
    </View>
  );
};

export default StatsScreen;
