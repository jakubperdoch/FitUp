import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import DashboardPanel from "@/components/custom/Dashboard/DashboardPanel";
import GenericIcon from "@/components/custom/Icon";
import GradientSelectComponent from "@/components/custom/Inputs/GradientSelect";
import DashboardCard from "@/components/custom/Dashboard/DashboardCard";
import useCurrentDateHandler from "@/utils/date";
import { router } from "expo-router";
import { useLayout } from "@/context/LayoutContext";

const HomeScreen = () => {
  const { currentDate } = useCurrentDateHandler();
  const { setNavbarTitle } = useLayout();

  useEffect(() => {
    setNavbarTitle("Fit Up");
  }, []);

  const finishWorkoutHandler = (time: number, cardId: number) => {
    const workouts = [...workoutCards];

    workouts[cardId] = { ...workouts[cardId], timer: time };
    setWorkoutCards(workouts);
  };

  const foodOptions = [
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

  const [workoutCards, setWorkoutCards] = useState([
    {
      id: 1,
      name: "Upperbody Workout",
      date: currentDate,
      showTimer: true,
      timer: null,
    },
    {
      id: 2,
      name: "Fullbody Workout",
      date: currentDate,
      showTimer: true,
      timer: null,
    },
  ]);

  const [mealCards, setMealCards] = useState([
    {
      id: 10,
      name: "Salmon Nigiri",
      totalCals: "300kCal",
      quantity: "200g",
    },
    {
      id: 11,
      name: "Lowfat Milk",
      totalCals: "300kCal",
      quantity: "200g",
    },
  ]);

  return (
    <ScrollView>
      <View className="flex flex-col h-full items-center px-7 pt-5 w-full gap-6 mb-20">
        <Text className="self-start font-poppinsSemiBold text-2xl">
          Overview
        </Text>
        <DashboardPanel />

        {/*Today's meals*/}
        <View className="self-start w-full flex-col mb-4">
          <View className="flex-row w-full items-center justify-between gap-3 mt-4">
            <View className="flex-row items-center gap-3">
              <Text className="font-poppinsSemiBold text-2xl">
                Today's Meals
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <GenericIcon name="Plus" color="#F77F00" size={25} />
              </TouchableOpacity>
            </View>

            <GradientSelectComponent
              placeholder={"Choose Gender"}
              controllerName={null}
              control={null}
              options={foodOptions}
            />
          </View>

          <View className="gap-5 mt-6 justify-center flex-col items-center">
            {mealCards.map((meal) => (
              <DashboardCard
                key={meal.id}
                id={meal.id}
                name={meal.name}
                totalCal={meal.totalCals}
                quantity={meal.quantity}
                detailsHandler={() =>
                  router.push({
                    pathname: "/meals/details",
                    params: { id: meal.id, isNew: String(false) },
                  })
                }
              />
            ))}
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-[#ADA4A5] font-poppins text-lg mt-2">
                See More
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*Upcoming Workouts*/}

        <View className="self-start w-full flex-col mb-4">
          <View className="flex-row w-full items-center justify-between gap-3 mt-4">
            <View className="flex-row items-center gap-3">
              <Text className="font-poppinsSemiBold text-2xl">
                Upcoming Workouts
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <GenericIcon name="Plus" color="#F77F00" size={25} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="gap-5 mt-6 justify-center flex-col items-center">
            {workoutCards.map((workout) => (
              <DashboardCard
                key={workout.id}
                id={workout.id}
                showTimer={workout.showTimer}
                name={workout.name}
                date={workout.date}
                timer={workout.timer}
                timerHandler={finishWorkoutHandler}
                detailsHandler={() =>
                  router.push({
                    pathname: "/workouts/details",
                    params: { id: workout.id },
                  })
                }
              />
            ))}
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-[#ADA4A5] font-poppins text-lg mt-2">
                See More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
