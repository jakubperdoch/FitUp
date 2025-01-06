import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useCallback, useEffect, useState } from "react";
import DashboardPanel from "@/components/custom/Dashboard/DashboardPanel";
import GenericIcon from "@/components/custom/Icon";
import GradientSelectComponent from "@/components/custom/Inputs/GradientSelect";
import DashboardCard from "@/components/custom/Dashboard/DashboardCard";
import useCurrentDateHandler from "@/hooks/date";
import { router } from "expo-router";
import { useLayout } from "@/context/LayoutContext";
import { useSortedWorkouts } from "@/hooks/workouts";
import { clearWorkout, setWorkout } from "@/store/workout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ActiveWorkoutCardComponent from "@/components/custom/Workouts/ActiveWorkoutCard";
import PulseBorder from "@/components/custom/PulseBorder";
import Animated, { ZoomIn } from "react-native-reanimated";

// TODO: make global interfaces & types

const HomeScreen = () => {
  const { currentDate } = useCurrentDateHandler();
  const { setNavbarTitle } = useLayout();
  const { workout } = useSelector((state: RootState) => state.workout);

  const dispatch = useDispatch();

  useEffect(() => {
    setNavbarTitle("Fit Up");
  }, []);

  //TODO: Move all like this data to jsons
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
      name: "Upper body Workout",
      day: "Friday",
      timer: null,
      timeOfWorkout: 22,
      numberOfExercises: 11,
    },
    {
      id: 2,
      name: "Full body Workout",
      day: "Wednesday",
      timer: null,
      timeOfWorkout: 12,
      numberOfExercises: 11,
    },
  ]);

  const { sortedWorkouts } = useSortedWorkouts(workoutCards);
  const [workouts, setWorkouts] = useState(sortedWorkouts);

  const workoutSelectHandler = useCallback(
    (id: number) => {
      {
        const selectedWorkout = workouts.find((item) => item?.id === id);
        if (selectedWorkout) {
          dispatch(setWorkout(selectedWorkout));
        }
      }
    },
    [workouts, workout],
  );

  const finishWorkoutHandler = (isTimerClear: boolean) => {
    if (!workout) {
      return;
    }

    const workoutsArr = isTimerClear
      ? [
          {
            ...workout,
            timer: 0,
          },
          ...workouts,
        ]
      : [...workouts, workout];
    setWorkouts(workoutsArr);
    dispatch(clearWorkout());
  };

  useEffect(() => {
    if (workout) {
      const filteredArr = workouts.filter((item) => item?.id !== workout?.id);
      setWorkouts(filteredArr);
    }
  }, [workout]);

  const [mealCards, setMealCards] = useState([
    {
      id: 10,
      name: "Salmon Nigiri",
      date: currentDate,
    },
    {
      id: 11,
      name: "Lowfat Milk",
      date: currentDate,
    },
  ]);

  return (
    <ScrollView>
      <View className="flex flex-col h-full items-center px-7 pt-5 w-full gap-6 mb-20">
        <Text className="self-start font-poppinsSemiBold text-2xl">
          Overview
        </Text>

        <DashboardPanel />

        {workout && (
          <Animated.View className="w-full" entering={ZoomIn}>
            <PulseBorder>
              <ActiveWorkoutCardComponent
                key={workout.id}
                id={workout.id}
                name={workout.name}
                day={workout.day}
                numberOfExercises={workout.numberOfExercises}
                timeOfWorkout={workout.timeOfWorkout}
                finishWorkoutHandler={finishWorkoutHandler}
                workoutSelectHandler={workoutSelectHandler}
                detailsHandler={() =>
                  router.push({
                    pathname: "/workouts/details",
                    params: { id: workout.id },
                  })
                }
              />
            </PulseBorder>
          </Animated.View>
        )}

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
                date={meal.date}
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
            {workouts.map((workout) => (
              <DashboardCard
                key={workout.id}
                id={workout.id}
                showTimer={true}
                name={workout.name}
                day={workout.day}
                timeOfWorkout={workout.timeOfWorkout}
                finishWorkoutHandler={finishWorkoutHandler}
                workoutSelectHandler={workoutSelectHandler}
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
