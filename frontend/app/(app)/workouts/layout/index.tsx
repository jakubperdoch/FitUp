import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useSortedWorkouts } from "@/hooks/workouts";
import WorkoutPlanCardComponent from "@/components/custom/Workouts/WorkoutPlanCard";
import { router } from "expo-router";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwipeToDelete from "@/components/custom/SwipeToDelete";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";

const WorkoutsPage = () => {
  const [workoutCards, setWorkoutCards] = useState<Workout[]>([]);

  const deleteWorkoutHandler = (id: number) => {
    // const updatedArr = workoutCards.filter((card) => card.id !== id);
    // setWorkoutCards(updatedArr);
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["workouts"],
    queryFn: () =>
      apiFetch("/workouts/plans", {
        method: "GET",
      }),
  });

  useEffect(() => {
    if (data?.workouts) {
      const workouts = useSortedWorkouts(data?.workouts);
      setWorkoutCards(workouts);
    }
  }, [data]);

  return (
    <GestureHandlerRootView>
      <View className="px-8">
        <View>
          <View className="flex-row w-full items-center justify-between mb-6">
            <Text className="font-poppinsSemiBold text-2xl">
              Upcoming Workout
            </Text>

            <View className="flex items-center justify-center">
              <GradientButtonComponent
                size={"sm"}
                title="Create new"
                handleSubmit={() => router.push("/workouts/layout/create")}
              />
            </View>
          </View>

          <View className="flex flex-col gap-6 mb-12">
            {isLoading || isFetching ? (
              <Spinner color={"#F77F00"} />
            ) : (
              workoutCards.map((card, index) => (
                <SwipeToDelete
                  key={card.id}
                  id={card.id}
                  onDeleteHandler={deleteWorkoutHandler}
                  alert={{
                    title: "Workout Deletion",
                    desc: "Are you sure you want to delete this workout ?",
                  }}
                >
                  <WorkoutPlanCardComponent
                    id={card.id}
                    title={card.name}
                    day={card.day}
                    numberOfExercises={card.number_of_exercises}
                    detailsHandler={() =>
                      router.push({
                        pathname: "/workouts/layout/details",
                        params: { id: card.id },
                      })
                    }
                  />
                </SwipeToDelete>
              ))
            )}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default WorkoutsPage;
