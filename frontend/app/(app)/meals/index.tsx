import { Alert, ScrollView, Text } from "react-native";
import { useState, useEffect } from "react";
import DatePanelComponent from "@/components/custom/DatePanel";
import FoodCardComponent from "@/components/custom/Meals/FoodCard";
import MealDrawerComponent from "@/components/custom/Meals/MealDrawer";
import { useRouter } from "expo-router";
import { useLayout } from "@/context/LayoutContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "react-i18next";

const MealsPage = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [index, setIndex] = useState(3);
  const router = useRouter();
  const [meals, setMeals] = useState({});
  const { t } = useTranslation(["headers", "meals"]);
  const { setNavbarTitle } = useLayout();
  const queryClient = useQueryClient();

  useEffect(() => {
    setNavbarTitle(t("mealsSchedule", { ns: "headers" }));
  }, []);

  const {
    mutate: retrieveMeals,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["retrieveMeals"],
    mutationFn: () =>
      apiFetch("/meals/all", {
        method: "POST",
        body: {
          date: selectedDate.toLocaleDateString(),
        },
      }),
    onSuccess: (data) => {
      setMeals(data.meals);
    },
  });

  const { mutate: deleteMeal, error: deleteMealError } = useMutation({
    mutationKey: ["deleteMeal"],
    mutationFn: (id: string) =>
      apiFetch(`/meals/${id}/delete`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retrieveMeals"] });
    },
  });

  useEffect(() => {
    retrieveMeals();
  }, [selectedDate]);

  const mealOptions = [
    {
      title: t("breakfast", { ns: "meals" }),
      value: "breakfast",
      route: "/meals/search/breakfast",
    },
    {
      title: t("morningSnack", { ns: "meals" }),
      value: "morningSnack",
      route: "/meals/search/morningSnack",
    },
    {
      title: t("lunch", { ns: "meals" }),
      value: "lunch",
      route: "/meals/search/lunch",
    },
    {
      title: t("afternoonSnack", { ns: "meals" }),
      value: "afternoonSnack",
      route: "/meals/search/afternoonSnack",
    },
    {
      title: t("dinner", { ns: "meals" }),
      value: "dinner",
      route: "/meals/search/dinner",
    },
    {
      title: t("lateNightSnack", { ns: "meals" }),
      value: "lateNightSnack",
      route: "/meals/search/lateNightSnack",
    },
  ];

  const pressHandler = (option) => {
    router.push({
      pathname: option.route,
      params: { date: String(selectedDate.toLocaleDateString()) },
    });
  };

  const deleteMealHandler = (id: number) => {
    Alert.alert("Delete Meal", "Are you sure you want to delete this meal?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          deleteMeal(String(id));
          retrieveMeals();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView contentContainerClassName="pb-32" className="!mt-0">
      <GestureHandlerRootView>
        <DatePanelComponent
          dates={dates}
          selectedDate={selectedDate}
          index={index}
          setDates={setDates}
          setSelectedDate={setSelectedDate}
          setIndex={setIndex}
        />

        {isPending ? (
          <Spinner color={"#F77F00"} />
        ) : Object.keys(meals).length === 0 ||
          Object.values(meals).every(
            (mealGroup: any[]) => mealGroup?.length === 0,
          ) ? (
          <Text className="text-center mt-10 text-[#ADA4A5]">
            {t("empty", { ns: "meals" })}
          </Text>
        ) : (
          Object.keys(meals).map((key, id) => (
            <FoodCardComponent
              key={id}
              title={key}
              deleteMealHandler={deleteMealHandler}
              numberOfCals={meals[key].reduce(
                (acc, meal) => acc + meal.calories,
                0,
              )}
              numberOfMeals={meals[key].length}
              meals={meals[key]}
            />
          ))
        )}

        <MealDrawerComponent
          drawerOptions={mealOptions}
          pressHandler={pressHandler}
        />
      </GestureHandlerRootView>
    </ScrollView>
  );
};

export default MealsPage;
