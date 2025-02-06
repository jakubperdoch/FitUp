import { ScrollView, Text } from "react-native";
import { useState, useEffect } from "react";
import DatePanelComponent from "@/components/custom/DatePanel";
import FoodCardComponent from "@/components/custom/Meals/FoodCard";
import MealDrawerComponent from "@/components/custom/Meals/MealDrawer";
import { useRouter } from "expo-router";
import { useLayout } from "@/context/LayoutContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useMutation } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";

const MealsPage = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [index, setIndex] = useState(3);
  const router = useRouter();
  const [meals, setMeals] = useState({});

  const { setNavbarTitle } = useLayout();

  useEffect(() => {
    setNavbarTitle("Meal Schedule");
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

  useEffect(() => {
    retrieveMeals();
  }, [selectedDate]);

  useEffect(() => {
    console.log(selectedDate.toLocaleDateString());
  }, [selectedDate]);

  const mealOptions = [
    {
      title: "Breakfast",
      value: "breakfast",
      route: "/meals/search/breakfast",
    },
    {
      title: "Morning Snack",
      value: "morningSnack",
      route: "/meals/search/morningSnack",
    },
    {
      title: "Lunch",
      value: "lunch",
      route: "/meals/search/lunch",
    },
    {
      title: "Afternoon Snack",
      value: "afternoonSnack",
      route: "/meals/search/afternoonSnack",
    },
    {
      title: "Dinner",
      value: "dinner",
      route: "/meals/search/dinner",
    },
    {
      title: "Late Night Snack",
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

  const deleteMealHandler = (id) => {
    console.log("Delete meal with id: ", id);
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
          <Spinner />
        ) : Object.keys(meals).length === 0 ||
          Object.values(meals).every(
            (mealGroup: any[]) => mealGroup?.length === 0,
          ) ? (
          <Text className="text-center mt-10 text-[#ADA4A5]">
            No meals found.
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
