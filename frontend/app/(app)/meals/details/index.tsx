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

const DetailsScreen = () => {
  const { setShowFooter, setNavbarTitle, setShowBackButton } = useLayout();

  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

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

  const { data, isLoading } = useQuery({
    queryKey: ["mealDetails", params?.id],
    queryFn: () => apiFetch(`/meals/${params?.id}/details`),
    enabled: !!params?.id,
  });

  const [servingAmount, setServingAmount] = useState(1);
  const [selectedServingType, setSelectedServingType] = useState(null);

  const [nutritionData, setNutritionData] = useState([
    {
      icon: require("@/assets/icons/fire.png"),
      value: selectedServingType?.calories || 0,
      type: null,
      metric: "kCal",
    },
    {
      icon: require("@/assets/icons/trans-fats.png"),
      value: 30,
      type: "fats",
      metric: "g",
    },
    {
      icon: require("@/assets/icons/protein.png"),
      value: 20,
      type: "protein",
      metric: "g",
    },
    {
      icon: require("@/assets/icons/carbohydrates.png"),
      value: 50,
      type: "carbs",
      metric: "g",
    },
    {
      icon: require("@/assets/icons/sugar-cube.png"),
      value: 50,
      type: "sugar",
      metric: "g",
    },
    {
      icon: require("@/assets/icons/grain.png"),
      value: 10,
      type: "fiber",
      metric: "g",
    },
  ]);

  useEffect(() => {
    if (selectedServingType) {
      const amount = parseFloat(String(servingAmount)) || 1;

      const calories = parseFloat(selectedServingType.calories) * amount;
      const fats = parseFloat(selectedServingType.fat) * amount;
      const proteins = parseFloat(selectedServingType.protein) * amount;
      const carbs = parseFloat(selectedServingType.carbohydrate) * amount;
      const sugar = parseFloat(selectedServingType.sugar) * amount;
      const fiber = parseFloat(selectedServingType.fiber) * amount;

      setNutritionData([
        {
          icon: require("@/assets/icons/fire.png"),
          value: calories.toFixed(0),
          type: null,
          metric: "kCal",
        },
        {
          icon: require("@/assets/icons/trans-fats.png"),
          value: fats.toFixed(1),
          type: "fats",
          metric: "g",
        },
        {
          icon: require("@/assets/icons/protein.png"),
          value: proteins.toFixed(1),
          type: "protein",
          metric: "g",
        },
        {
          icon: require("@/assets/icons/carbohydrates.png"),
          value: carbs.toFixed(1),
          type: "carbs",
          metric: "g",
        },
        {
          icon: require("@/assets/icons/sugar-cube.png"),
          value: sugar.toFixed(1),
          type: "sugar",
          metric: "g",
        },
        {
          icon: require("@/assets/icons/grain.png"),
          value: fiber.toFixed(1),
          type: "fiber",
          metric: "g",
        },
      ]);
    }
  }, [selectedServingType, servingAmount]);

  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState({
    name: "Breakfast",
    value: "breakfast",
  });

  useEffect(() => {
    if (data?.meal?.servings && data?.meal?.servings?.length > 0) {
      setSelectedServingType(data?.meal?.servings[0]);
    }
  }, [isLoading]);

  const partsOfDayData = [
    {
      name: "Breakfast",
      value: "breakfast",
    },
    {
      name: "Morning Snack",
      value: "morningSnack",
    },
    {
      name: "Lunch",
      value: "lunch",
    },
    {
      name: "Afternoon Snack",
      value: "afternoonSnack",
    },
    {
      name: "Dinner",
      value: "dinner",
    },
    {
      name: "Late Night Snack",
      value: "lateNightSnack",
    },
  ];

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
            {data?.meal?.image ? (
              <Image
                style={{
                  width: "65%",
                  height: 210,
                  borderRadius: 50,
                }}
                source={{ uri: data?.meal?.image }}
              />
            ) : (
              <Image
                source={require("@/assets/images/meals-details--example.png")}
              />
            )}
          </LinearGradient>

          <ScrollView
            style={{
              flex: 1,
              backgroundColor: "white",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              paddingVertical: 40,
              marginTop: 200,
            }}
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

              <View className="mt-10 mx-6">
                <GradientButtonComponent
                  size={"full"}
                  title={
                    params?.isNew === "true"
                      ? `Add to ${selectedTimeOfDay.name}`
                      : "Save"
                  }
                  handleSubmit={() => console.log("Save")}
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
