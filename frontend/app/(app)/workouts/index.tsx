import { View, Text } from "react-native";
import { useState } from "react";
import { useSortedWorkouts } from "@/utils/workouts";
import WorkoutPlanCardComponent from "@/components/custom/Workouts/WorkoutPlanCard";
import { router } from "expo-router";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";

const WorkoutsPage = () => {
  const finishWorkoutHandler = (time: number, cardId: number) => {
    const workouts = [...workoutCards];

    workouts[cardId] = { ...workouts[cardId], timer: time };
    setWorkoutCards(workouts);
  };

  const [workoutCards, setWorkoutCards] = useState([
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
              handleSubmit={() => console.log("Add new Workout Plan")}
            />
          </View>
        </View>

        <View className="flex flex-col gap-6 mb-12">
          {sortedWorkouts.map((card, index) => (
            <WorkoutPlanCardComponent
              key={index}
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
          ))}
        </View>
      </View>
    </View>
  );
};

export default WorkoutsPage;
