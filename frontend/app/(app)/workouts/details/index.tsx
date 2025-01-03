import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useState } from "react";

const WorkoutDetailsScreen = () => {
  const params = useLocalSearchParams();

  const [data, fetchData] = useState({
    title: "fullbody workout",
    timeOfWorkout: 32,
    exercises: [
      {
        name: "biceps pull-up",
        sets: [
          {
            reps: 10,
            weight: 100,
          },
          {
            reps: 8,
            weight: 120,
          },
          {
            reps: 12,
            weight: 110,
          },
        ],
      },
    ],
  });

  return (
    <View className="px-8">
      <Text className="capitalize font-poppins text-2xl font-semibold">
        fullbody workout
      </Text>
      <Text></Text>
    </View>
  );
};
export default WorkoutDetailsScreen;
