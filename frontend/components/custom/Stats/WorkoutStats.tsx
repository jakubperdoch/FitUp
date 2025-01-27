// @ts-ignore
import Poppins from "@/assets/fonts/Poppins-Medium.ttf";
// @ts-ignore
import PoppinsSemiBold from "@/assets/fonts/Poppins-SemiBold.ttf";
import { useFont, Circle, Text as GraphText } from "@shopify/react-native-skia";
import { useCallback, useEffect, useState } from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { LinearGradient } from "expo-linear-gradient";
import GenericIcon from "@/components/custom/Icon";
import ButtonGroup from "@/components/custom/Button/ButtonGroup";

interface ComponentProps {
  stats: Partial<WorkoutStats>;
}

const Tooltip = ({
  x,
  y,
}: {
  x: SharedValue<number>;
  y: SharedValue<number>;
}) => {
  return <Circle r={5} cx={x} cy={y} color={"red"} opacity={0.5} />;
};

const WorkoutStatsComponent = (props: ComponentProps) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Weekly");
  const { state, isActive } = useChartPressState({ x: 0, y: { value: 0 } });

  const font = useFont(Poppins, 15);
  const titleFont = useFont(PoppinsSemiBold, 15);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (props.stats.totalWeightLifted?.length) {
      setData(props.stats.totalWeightLifted);
    } else {
      console.log("No data");
    }
  }, [props.stats.totalWeightLifted]);

  const titleValue = useDerivedValue(() => {
    return state.y.value.value.value.toFixed(2) + " kg";
  }, [state]);

  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0.1, y: 0.8 }}
      colors={["rgba(214, 40, 40, 0.3)", "rgba(247, 127, 0, 0.3)"]}
      style={{
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginHorizontal: 5,
      }}
    >
      <ButtonGroup
        activeOption={selectedOption}
        options={["Weekly", "Monthly"]}
        optionSelectHandler={(option: string) => setSelectedOption(option)}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-7"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text className="font-poppinsSemiBold text-xl">
          Your workout progress
        </Text>

        <View className="h-60">
          {data.length > 0 && (
            <CartesianChart
              domainPadding={20}
              data={data}
              xKey="label"
              yKeys={["value"]}
              xAxis={{
                font: font,
                labelColor: "#7B6F72",
                formatXLabel: (value) => {
                  const date = new Date(2023, value - 1);
                  return date.toLocaleString("default", { month: "short" });
                },
              }}
              yAxis={[{ axisSide: "right", font: font, labelColor: "#7B6F72" }]}
              chartPressState={state}
            >
              {({ points, chartBounds }) => (
                <>
                  <GraphText
                    x={chartBounds.left + 10}
                    y={40}
                    font={titleFont}
                    text={titleValue}
                  />
                  <Line
                    points={points.value}
                    color="#F77F00"
                    curveType={"natural"}
                    strokeJoin={"round"}
                    strokeWidth={3}
                    connectMissingData={true}
                    strokeCap={"round"}
                    animate={{ type: "timing", duration: 500 }}
                  ></Line>

                  {isActive && (
                    <Tooltip x={state.x.position} y={state.y.value.position} />
                  )}
                </>
              )}
            </CartesianChart>
          )}
        </View>
        <View className="gap-4">
          <View className="gap-3 border-b pb-3 border-black/30">
            <GenericIcon name="Repeat" size={17} />

            <Text className="font-poppins text-lg text-[#7B6F72]">
              <Text className="text-[#D62828]">
                {props.stats.mostFrequentExercise}
              </Text>{" "}
              most frequent exercise
            </Text>
          </View>

          <View className="gap-3 border-b pb-3 border-black/30">
            <GenericIcon name="Dumbbell" size={17} />

            <Text className="font-poppins text-lg text-[#7B6F72]">
              <Text className="text-[#D62828]">
                {props.stats.totalWorkouts}
              </Text>{" "}
              total workouts
            </Text>
          </View>

          <View className="gap-3 border-b pb-3 border-black/30">
            <GenericIcon name="Repeat" size={17} />

            <Text className="font-poppins text-lg text-[#7B6F72]">
              <Text className="text-[#D62828]">{props.stats.avgReps}</Text>{" "}
              average reps
            </Text>
          </View>

          <View className="gap-3 border-b pb-3 border-black/30">
            <GenericIcon name="Weight" size={17} />

            <Text className="font-poppins text-lg text-[#7B6F72]">
              <Text className="text-[#D62828]">{props.stats.avgWeight}</Text>{" "}
              average weight
            </Text>
          </View>

          <View className="gap-3 border-b pb-3 border-black/30">
            <GenericIcon name="Clock" size={17} />

            <Text className="font-poppins text-lg text-[#7B6F72]">
              <Text className="text-[#D62828]">
                {props.stats.totalWorkoutTime}
              </Text>{" "}
              total workout time
            </Text>
          </View>

          <View className="gap-3 pb-3 ">
            <GenericIcon name="Medal" size={17} />

            <Text className="font-poppins text-lg text-[#7B6F72]">
              <Text className="text-[#D62828]">
                {props.stats.personalBest?.exercise}
              </Text>{" "}
              was your personal best with{" "}
              <Text className="text-[#D62828]">
                {props.stats.personalBest?.weight}
              </Text>{" "}
              kg and{" "}
              <Text className="text-[#D62828]">
                {props.stats.personalBest?.reps}
              </Text>{" "}
              reps
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default WorkoutStatsComponent;
