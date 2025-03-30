// @ts-ignore
import Poppins from "@/assets/fonts/Poppins-Medium.ttf";
// @ts-ignore
import PoppinsSemiBold from "@/assets/fonts/Poppins-SemiBold.ttf";
import { useFont, Circle, Text as GraphText } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { LinearGradient } from "expo-linear-gradient";
import GenericIcon from "@/components/custom/Icon";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "react-i18next";

const Tooltip = ({
  x,
  y,
}: {
  x: SharedValue<number>;
  y: SharedValue<number>;
}) => {
  return <Circle r={5} cx={x} cy={y} color={"red"} opacity={0.5} />;
};

const totalWeightLifted = [
  {
    label: 9,
    value: 0,
  },
  {
    label: 10,
    value: 0,
  },
  {
    label: 11,
    value: 904,
  },
  {
    label: 12,
    value: 0,
  },
  {
    label: 13,
    value: 0,
  },
  {
    label: 14,
    value: 603,
  },
];

const WorkoutStatsComponent = () => {
  const { state, isActive } = useChartPressState({ x: 0, y: { value: 0 } });
  const [workoutData, setWorkoutData] = useState([]);

  const { t } = useTranslation("stats");
  const font = useFont(Poppins, 15);
  const titleFont = useFont(PoppinsSemiBold, 15);

  const titleValue = useDerivedValue(() => {
    return state.y.value.value.value.toFixed(2) + " kg";
  }, [state]);

  const { data, isFetching, isPending, isLoading, refetch } = useQuery({
    queryKey: ["workoutStats"],
    queryFn: () => apiFetch("/stats/workout/monthly", { method: "GET" }),
  });

  useEffect(() => {
    if (data) {
      setWorkoutData(data?.workout_stats?.totalWeightLifted);
    } else {
      setWorkoutData(totalWeightLifted);
    }
  }, [data]);

  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0.1, y: 0.8 }}
      colors={["rgba(214, 40, 40, 0.2)", "rgba(247, 127, 0, 0.2)"]}
      style={{
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginHorizontal: 5,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-7 "
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      >
        {isFetching || isLoading || isPending ? (
          <Spinner color={"#F77F00"} />
        ) : (
          <>
            <Text className="font-poppinsSemiBold text-xl">
              {t("title", { context: "meals" })}
            </Text>

            <View className="h-60">
              <CartesianChart
                domainPadding={20}
                data={workoutData}
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
                yAxis={[
                  { axisSide: "right", font: font, labelColor: "#7B6F72" },
                ]}
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
                      <Tooltip
                        x={state.x.position}
                        y={state.y.value.position}
                      />
                    )}
                  </>
                )}
              </CartesianChart>
            </View>
            <View className="gap-4">
              {data?.workout_stats?.mostFrequentExercise ? (
                <View className="gap-3 border-b pb-3 flex-row items-center border-black/30">
                  <GenericIcon name="Repeat" size={17} />

                  <Text className="font-poppins text-lg text-[#7B6F72]">
                    <Text className="text-[#D62828] capitalize">
                      {data?.workout_stats?.mostFrequentExercise}
                    </Text>{" "}
                    {t("mostFrequent", { context: "meals" })}
                  </Text>
                </View>
              ) : null}

              <View className="gap-3 border-b pb-3 flex-row items-center border-black/30">
                <GenericIcon name="Dumbbell" size={17} />

                <Text className="font-poppins text-lg text-[#7B6F72]">
                  <Text className="text-[#D62828]">
                    {Number(data?.workout_stats?.totalWorkouts).toFixed(0)}
                  </Text>{" "}
                  {t("workouts", { context: "meals" })}
                </Text>
              </View>

              <View className="gap-3 border-b pb-3 flex-row items-center border-black/30">
                <GenericIcon name="Repeat" size={17} />

                <Text className="font-poppins text-lg text-[#7B6F72]">
                  <Text className="text-[#D62828]">
                    {Number(data?.workout_stats?.avgReps).toFixed(0)}
                  </Text>{" "}
                  {t("reps", { context: "meals" })}
                </Text>
              </View>

              <View className="gap-3 border-b pb-3 flex-row items-center border-black/30">
                <GenericIcon name="Weight" size={17} />

                <Text className="font-poppins text-lg text-[#7B6F72]">
                  <Text className="text-[#D62828]">
                    {Number(data?.workout_stats?.avgWeight).toFixed(1)}
                  </Text>{" "}
                  {t("weight", { context: "meals" })}
                </Text>
              </View>

              <View className="gap-3 border-b pb-3 flex-row items-center border-black/30">
                <GenericIcon name="Clock" size={17} />

                <Text className="font-poppins text-lg  text-[#7B6F72]">
                  <Text className="text-[#D62828]">
                    {Number(
                      data?.workout_stats?.totalWorkoutTime / 360,
                    ).toFixed(1)}{" "}
                    {t("hours", { context: "meals" })}
                  </Text>{" "}
                  {t("time", { context: "meals" })}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default WorkoutStatsComponent;
