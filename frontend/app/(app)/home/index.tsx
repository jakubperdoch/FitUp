import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useCallback, useEffect, useState } from "react";
import DashboardPanel from "@/components/custom/Dashboard/DashboardPanel";
import GenericIcon from "@/components/custom/Icon";
import DashboardCard from "@/components/custom/Dashboard/DashboardCard";
import { router } from "expo-router";
import { useLayout } from "@/context/LayoutContext";
import { useSortedWorkouts } from "@/hooks/workouts";
import { clearWorkout, setWorkout } from "@/store/workout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ActiveWorkoutCardComponent from "@/components/custom/Workouts/ActiveWorkoutCard";
import PulseBorder from "@/components/custom/PulseBorder";
import Animated, { ZoomIn } from "react-native-reanimated";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";

const HomeScreen = () => {
  const [workouts, setWorkouts] = useState([]);

  const { setNavbarTitle } = useLayout();
  const { workout, isTimerActive } = useSelector(
    (state: RootState) => state.workout,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setNavbarTitle("Fit Up");
  }, []);

  const {
    data: workoutsData,
    isLoading: workoutsLoading,
    isFetching: workoutsFetching,
  } = useQuery({
    queryKey: ["workouts"],
    queryFn: () =>
      apiFetch("/workouts/plans?max=2", {
        method: "GET",
      }),
  });

  const {
    data: mealsData,
    isLoading: mealsLoading,
    isFetching: mealsFetching,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: () =>
      apiFetch("/meals/today?max=2", {
        method: "GET",
      }),
  });

  const {
    data: macrosData,
    isLoading: macrosLoading,
    isFetching: macrosFetching,
  } = useQuery({
    queryKey: ["macros"],
    queryFn: () =>
      apiFetch("/stats/macros/today", {
        method: "GET",
      }),
  });

  useEffect(() => {
    if (workoutsData?.workouts) {
      const sortedWorkouts = useSortedWorkouts(workoutsData?.workouts);
      setWorkouts(sortedWorkouts);
    }
  }, [workoutsData]);

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
    if (workout.id) {
      const filteredArr = workouts.filter((item) => item?.id !== workout?.id);
      setWorkouts(filteredArr);
    }
  }, [workout]);

  return (
    <ScrollView>
      <View className="flex flex-col h-full items-center px-7 pt-5 w-full gap-6 mb-20">
        <Text className="self-start font-poppinsSemiBold text-2xl">
          Overview
        </Text>

        {macrosLoading || macrosFetching ? (
          <Spinner color={"#F77F00"} />
        ) : (
          <DashboardPanel macros={macrosData?.macros} />
        )}

        {workout?.id && (
          <Animated.View className="w-full" entering={ZoomIn}>
            <PulseBorder>
              <ActiveWorkoutCardComponent
                key={workout.id}
                id={workout.id}
                name={workout.name}
                day={workout.day}
                numberOfExercises={workout.number_of_exercises}
                finishWorkoutHandler={finishWorkoutHandler}
                workoutSelectHandler={workoutSelectHandler}
                detailsHandler={() =>
                  router.push({
                    pathname: "/workouts/layout/details",
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
            </View>
          </View>

          {mealsLoading || mealsFetching ? (
            <Spinner className="mt-6" color={"#F77F00"} />
          ) : (
            <View className="gap-5 mt-6 justify-center flex-col items-center">
              {mealsData?.meals?.map((meal) => (
                <DashboardCard
                  key={meal.id}
                  id={meal.id}
                  name={meal.name}
                  date={meal.date}
                  calories={meal.calories}
                  detailsHandler={() =>
                    router.push({
                      pathname: "/meals/details",
                      params: {
                        id: meal.id,
                        food_id: meal.food_id,
                      },
                    })
                  }
                />
              ))}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  router.push({ pathname: "/meals" });
                }}
              >
                <Text className="text-[#ADA4A5] font-poppins text-lg mt-2">
                  See More
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/*Upcoming Workouts*/}

        <View className="self-start w-full flex-col mb-4">
          <View className="flex-row w-full items-center justify-between gap-3 mt-4">
            <View className="flex-row items-center gap-3">
              <Text className="font-poppinsSemiBold text-2xl">
                Upcoming Workouts
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  router.push({ pathname: "/workouts/layout/create" });
                }}
              >
                <GenericIcon name="Plus" color="#F77F00" size={25} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="gap-5 mt-6 justify-center flex-col items-center">
            {workoutsLoading || workoutsFetching ? (
              <Spinner className="mt-6" color={"#F77F00"} />
            ) : (
              <>
                {workouts.map((workout) => (
                  <DashboardCard
                    key={workout.id}
                    id={workout.id}
                    showTimer={true}
                    name={workout.name}
                    day={workout.day}
                    numberOfExercises={workout.number_of_exercises}
                    finishWorkoutHandler={finishWorkoutHandler}
                    workoutSelectHandler={workoutSelectHandler}
                    detailsHandler={() =>
                      router.push({
                        pathname: "/workouts/layout/details",
                        params: { id: workout.id },
                      })
                    }
                  />
                ))}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    router.push({ pathname: "/workouts/layout" });
                  }}
                >
                  <Text className="text-[#ADA4A5] font-poppins text-lg mt-2">
                    See More
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
