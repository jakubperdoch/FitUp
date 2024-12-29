import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import useCurrentDateHandler from "@/utils/date";
import WorkoutTimerCard from "@/components/custom/Workouts/WorkoutTimerCard";
import useSortedWorkouts from "@/utils/workouts";

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
    },
    {
      id: 2,
      name: "Fullbody Workout",
      day: "Tuesday",
      timer: null,
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

          <TouchableOpacity>
            <Text className="text-[#ADA4A5] font-poppins text-lg ">
              See more
            </Text>
          </TouchableOpacity>
        </View>

        {sortedWorkouts.map((card, index) => (
          <WorkoutTimerCard
            key={index}
            id={card.id}
            title={card.name}
            day={card.day}
            timer={card.timer}
            finishWorkoutHandler={finishWorkoutHandler}
          />
        ))}
      </View>
    </View>
  );
};

export default WorkoutsPage;
