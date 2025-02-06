import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { useCallback, useEffect, useState } from "react";
import GenericIcon from "@/components/custom/Icon";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";
import { useLayout } from "@/context/LayoutContext";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";
import { openURL } from "expo-linking";
import MacroScroll from "@/components/custom/Meals/Details/MacroScroll";
import ServingSection from "@/components/custom/Meals/Details/ServingSection";
import TimeOfDaySection from "@/components/custom/Meals/Details/TimeOfDaySection";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useMeals from "@/hooks/meals";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

const DetailsScreen = () => {
  const { setShowFooter, setNavbarTitle, setShowBackButton } = useLayout();
  const insets = useSafeAreaInsets();
  const { id, date, food_id, eaten_at } = useLocalSearchParams();

  useEffect(() => {
    setShowFooter(false);
    setNavbarTitle(null);
    setShowBackButton(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowFooter(true);
        setShowBackButton(false);
      };
    }, []),
  );

  const {
    servingAmount,
    setServingAmount,
    selectedServingType,
    setSelectedServingType,
    meal,
    initMeal,
    nutritionData,
    partsOfDayData,
    selectedTimeOfDay,
    setSelectedTimeOfDay,
    addMeal,
    addMealError,
  } = useMeals();

  const { data, isLoading } = useQuery({
    queryKey: ["mealDetails", food_id, id],
    queryFn: () => apiFetch(`/meals/${food_id}/details${id ? `/${id}` : ""}`),
    enabled: !!food_id,
  });

  useEffect(() => {
    if (data?.meal?.servings?.length > 0 && !id) {
      setSelectedServingType(data?.meal?.servings[0]);
    } else if (data?.meal?.servings?.length > 0 && id) {
      setSelectedServingType(
        data?.meal?.servings.find(
          (serving) => serving.serving_id === data?.meal?.selected_serving_id,
        ),
      );
    }
  }, [isLoading]);

  useEffect(() => {
    if (data?.meal) {
      setSelectedTimeOfDay(
        partsOfDayData.find(
          (part) =>
            part.value === eaten_at ||
            part.value === data?.meal?.selected_eaten_at,
        ) || partsOfDayData[0],
      );
      initMeal(data?.meal, String(date));
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0.1, y: 0.8 }}
            colors={["#D62828", "#F77F00"]}
            style={{
              alignItems: "center",
              position: "absolute",
              width: "100%",
              height: 400,
              top: -insets.top,
              paddingTop: insets.top + 50,
              zIndex: -1,
            }}
          >
            {data?.meal?.image && (
              <Image
                style={{
                  width: "60%",
                  height: 210,
                  borderRadius: 50,
                }}
                source={{ uri: data?.meal?.image }}
              />
            )}
          </LinearGradient>

          <ScrollView
            style={[
              data?.meal?.image ? { marginTop: 200 } : { marginTop: 0 },
              {
                flex: 1,
                backgroundColor: "white",
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                paddingVertical: 40,
              },
            ]}
            className="border-r border-l border-t border-[#F77F00] rounded-t-3xl"
            contentContainerClassName="pb-10"
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={true}
          >
            <View>
              <Text className="font-poppinsBold text-2xl ms-6">
                {data?.meal.name}
              </Text>

              <MacroScroll nutritionData={nutritionData} />

              {data?.meal?.allergens?.length > 0 && (
                <View className="mt-10 ms-6">
                  <Text className="font-semibold font-poppins text-2xl mb-5">
                    Allergens
                  </Text>

                  <View className="flex flex-wrap flex-row gap-3 w-full">
                    {data?.meal?.allergens.map(
                      (allergen) =>
                        allergen.value === "1" && (
                          <View
                            key={allergen.id}
                            className="bg-[#E5E6E6] px-3 py-1 rounded-xl"
                          >
                            <Text className="text-lg font-poppins">
                              {allergen.name}
                            </Text>
                          </View>
                        ),
                    )}
                  </View>
                </View>
              )}

              <ServingSection
                data={data}
                servingAmount={servingAmount}
                setServingAmount={setServingAmount}
                selectedServingType={selectedServingType}
                setSelectedServingType={setSelectedServingType}
              />

              <TimeOfDaySection
                selectedTimeOfDay={selectedTimeOfDay}
                setSelectedTimeOfDay={setSelectedTimeOfDay}
                partsOfDayData={partsOfDayData}
              />

              <TouchableOpacity
                className="mt-10 mb-3 ms-6 flex-row items-center gap-2"
                activeOpacity={0.7}
                onPress={() => openURL(data?.meal?.url)}
              >
                <GenericIcon name={"Info"} color={"#F77F00"} size={23} />

                <Text className="font-poppins text-[#F77F00]">
                  Click here for more details
                </Text>
              </TouchableOpacity>

              {addMealError && (
                <Animated.View
                  entering={ZoomIn}
                  exiting={ZoomOut}
                  className="flex-row items-center gap-2"
                >
                  <GenericIcon
                    name={"OctagonAlert"}
                    color="#F77F00"
                    size={20}
                  />
                  <Text className="font-poppins text-[#F77F00]">
                    {addMealError instanceof Error
                      ? addMealError.message
                      : String(addMealError)}
                  </Text>
                </Animated.View>
              )}

              <View className="mt-10 mx-6">
                <GradientButtonComponent
                  size={"full"}
                  title={!id ? `Add to ${selectedTimeOfDay.name}` : "Save"}
                  handleSubmit={() => addMeal(meal)}
                />
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default DetailsScreen;
