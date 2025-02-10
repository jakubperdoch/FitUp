import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useSortedWorkouts } from "@/hooks/workouts";
import WorkoutPlanCardComponent from "@/components/custom/Workouts/WorkoutPlanCard";
import { router } from "expo-router";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwipeToDelete from "@/components/custom/SwipeToDelete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";
import Animated, { ZoomIn } from "react-native-reanimated";

const WorkoutsPage = () => {
  const [workoutCards, setWorkoutCards] = useState<Workout[]>([]);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["workouts"],
    queryFn: () =>
      apiFetch("/workouts/plans", {
        method: "GET",
      }),
  });

  const { mutate: deleteWorkout, error: deleteWorkoutError } = useMutation({
    mutationKey: ["deleteWorkout"],
    mutationFn: (id: number) =>
      apiFetch(`/workouts/plans/${id}/delete`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });

  useEffect(() => {
    if (data?.workouts) {
      const workouts = useSortedWorkouts(data?.workouts);
      setWorkoutCards(workouts);
    }
  }, [data]);

  const deleteWorkoutHandler = (id: number) => {
    deleteWorkout(id);
  };

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
              <Animated.View entering={ZoomIn} className="gap-7">
                {workoutCards?.length > 0 ? (
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
                ) : (
                  <Text className="text-center text-lg font-poppinsSemiBold">
                    No workouts found
                  </Text>
                )}
              </Animated.View>
            )}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default WorkoutsPage;
