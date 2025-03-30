import { LinearGradient as CardGradient } from "expo-linear-gradient";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Pie, PolarChart } from "victory-native";
import { Canvas, Rect } from "@shopify/react-native-skia";
import GenericIcon from "@/components/custom/Icon";
import ButtonGroup from "@/components/custom/Button/ButtonGroup";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "react-i18next";

const MacroStatsComponent = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation("stats");

  const {
    data: stats,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["macroStats"],
    queryFn: () =>
      apiFetch("/stats/macros/monthly", {
        method: "GET",
      }),
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const colorGenerationHandler = (key: string) => {
    switch (key) {
      case "protein":
        return "#FF6347";
      case "carbs":
        return "#00FF7F";
      case "fat":
        return "#4682B4";
      case "sugar":
        return "#FF69B4";
      case "fiber":
        return "#FF4500";
      default:
        return "#000000";
    }
  };

  useEffect(() => {
    if (stats) {
      setData(
        Object.keys(stats?.macro_stats?.macros).map((key) => ({
          key,
          value: stats?.macro_stats?.macros[key],
          color: colorGenerationHandler(key),
        })),
      );
    }
  }, [stats]);

  return (
    <CardGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0.1, y: 0.8 }}
      colors={["rgba(247, 127, 0, .3)", "rgba(234, 226, 183, .3)"]}
      style={{
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 5,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-7"
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isFetching || isLoading ? (
          <Spinner color={"#F77F00"} />
        ) : (
          <>
            <Text className="font-poppinsSemiBold text-xl">
              {t("title2", { context: "meals" })}
            </Text>

            {data.length > 0 ? (
              <View className="h-40">
                <PolarChart
                  data={data}
                  labelKey={"key"}
                  valueKey={"value"}
                  colorKey={"color"}
                >
                  <Pie.Chart innerRadius={"50%"}>
                    {({ slice }) => {
                      return (
                        <>
                          <Pie.Slice animate={{ type: "spring" }}></Pie.Slice>
                          <Pie.SliceAngularInset
                            angularInset={{
                              angularStrokeWidth: 3,
                              angularStrokeColor: "white",
                            }}
                          />
                        </>
                      );
                    }}
                  </Pie.Chart>
                </PolarChart>
              </View>
            ) : (
              <Text className="font-poppins">
                {t("noData", { context: "meals" })}
              </Text>
            )}

            <View className="flex-row flex-wrap gap-2 justify-center">
              {data.map((d, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginRight: 8,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Canvas style={{ height: 12, width: 12, marginRight: 4 }}>
                      <Rect
                        rect={{ x: 0, y: 0, width: 12, height: 12 }}
                        color={d.color}
                      />
                    </Canvas>
                    <Text className="capitalize">{d.key}</Text>
                  </View>
                );
              })}
            </View>

            {stats?.macro_stats?.mostFrequentMeal ? (
              <View className="gap-3 pb-3 border-b flex-row items-center  border-black/30">
                <GenericIcon name="Beef" size={17} />

                <Text className="font-poppins text-lg text-[#7B6F72]">
                  <Text className="text-[#D62828]">
                    {stats?.macro_stats?.mostFrequentMeal}{" "}
                  </Text>
                  {t("mostFrequent2", { context: "meals" })}
                </Text>
              </View>
            ) : null}

            <View className="gap-3 border-b pb-3 flex-row items-center  border-black/30">
              <GenericIcon name="Flame" size={17} />

              <Text className="font-poppins text-lg text-[#7B6F72]">
                <Text className="text-[#D62828]">
                  {stats?.macro_stats?.totalCalories}kCal
                </Text>{" "}
                {t("calories", { context: "meals" })}
              </Text>
            </View>

            <View className="gap-3 border-b pb-3 flex-row items-center border-black/30">
              <GenericIcon name="Wheat" size={17} />

              <Text className="font-poppins text-lg text-[#7B6F72]">
                <Text className="text-[#D62828]">
                  {stats?.macro_stats?.macros.fiber}g
                </Text>{" "}
                {t("fiber", { context: "meals" })}
              </Text>
            </View>

            <View className="gap-3 border-b pb-3 flex-row items-center  border-black/30">
              <GenericIcon name="Candy" size={20} />

              <Text className="font-poppins text-lg text-[#7B6F72]">
                <Text className="text-[#D62828]">
                  {stats?.macro_stats?.macros.sugar}g
                </Text>{" "}
                {t("sugar", { context: "meals" })}
              </Text>
            </View>

            <View className="gap-3 border-b pb-3 flex-row items-center  border-black/30">
              <GenericIcon name="PiggyBank" size={20} />

              <Text className="font-poppins text-lg text-[#7B6F72]">
                <Text className="text-[#D62828]">
                  {stats?.macro_stats?.macros.fat}g
                </Text>{" "}
                {t("fat", { context: "meals" })}
              </Text>
            </View>

            <View className="gap-3 border-b pb-3 flex-row items-center  border-black/30">
              <GenericIcon name="Wheat" size={17} />

              <Text className="font-poppins text-lg text-[#7B6F72]">
                <Text className="text-[#D62828]">
                  {stats?.macro_stats?.macros.carbs}g
                </Text>{" "}
                {t("carbs", { context: "meals" })}
              </Text>
            </View>

            <View className="gap-3 pb-3 flex-row items-center  ">
              <GenericIcon name="Drumstick" size={18} />

              <Text className="font-poppins text-lg text-[#7B6F72]">
                <Text className="text-[#D62828]">
                  {stats?.macro_stats?.macros.protein}g
                </Text>{" "}
                {t("protein", { context: "meals" })}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </CardGradient>
  );
};

export default MacroStatsComponent;
