import { View, Text } from "react-native";
import { useState } from "react";
import { useSortedWorkouts } from "@/hooks/workouts";
import WorkoutPlanCardComponent from "@/components/custom/Workouts/WorkoutPlanCard";
import { router } from "expo-router";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwipeToDelete from "@/components/custom/SwipeToDelete";

const WorkoutsPage = () => {
  const finishWorkoutHandler = (time: number, cardId: number) => {
    const workouts = [...workoutCards];

    workouts[cardId] = { ...workouts[cardId], timer: time };
    setWorkoutCards(workouts);
  };

  const deleteWorkoutHandler = (id: number) => {
    const updatedArr = workoutCards.filter((card) => card.id !== id);
    setWorkoutCards(updatedArr);
  };

  const [workoutCards, setWorkoutCards] = useState<Workout[]>([
    {
      id: 1,
      name: "Upperbody Workout",
      day: "Friday",
      timer: null,
      timeOfWorkout: 32,
      numberOfExercises: 11,
    },
    {
      id: 2,
      name: "Fullbody Workout",
      day: "Tuesday",
      timer: null,
      timeOfWorkout: 32,
      numberOfExercises: 11,
    },
  ]);

  const { sortedWorkouts } = useSortedWorkouts(workoutCards);

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
                handleSubmit={() => router.push("/workouts/search")}
              />
            </View>
          </View>

          <View className="flex flex-col gap-6 mb-12">
            {sortedWorkouts.map((card, index) => (
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
                  timeOfWorkout={card.timeOfWorkout}
                  numberOfExercises={card.numberOfExercises}
                  detailsHandler={() =>
                    router.push({
                      pathname: "/workouts/details",
                      params: { id: card.id },
                    })
                  }
                  finishWorkoutHandler={finishWorkoutHandler}
                />
              </SwipeToDelete>
            ))}
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default WorkoutsPage;
