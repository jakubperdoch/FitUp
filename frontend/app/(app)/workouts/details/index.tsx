import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useState } from "react";
import ScheduleAccordion from "@/components/custom/Workouts/ScheduleAccordion";
import workout from "@/store/workout";

const WorkoutDetailsScreen = () => {
  const params = useLocalSearchParams();

  const changeDateHandler = (newValue: string) => {
    if (data?.days.includes(newValue)) {
      const daysArr = data.days.filter((day) => day !== newValue);

      setData((prevState) => ({
        ...prevState,
        days: daysArr,
      }));
    } else {
      const daysArr = [...data?.days];
      daysArr.push(newValue);

      setData((prevState) => ({
        ...prevState,
        days: daysArr,
      }));
    }
  };

  const [data, setData] = useState<Workout>({
    id: 2,
    name: "fullbody workout",
    timeOfWorkout: 32,
    days: ["Monday"],
    exercises: [
      {
        exerciseId: "2kyz34",
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
      {
        exerciseId: "2kyz34",
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
    <View className="px-8 flex-col gap-7">
      <View>
        <Text className="capitalize font-poppins text-2xl font-semibold mb-1">
          {data?.name}
        </Text>
        <Text className="font-poppins  text-[#7B6F72]">
          {data?.exercises.length} Exercises | {data?.timeOfWorkout}mins
        </Text>
      </View>

      <ScheduleAccordion
        days={data?.days}
        changeDateHandler={changeDateHandler}
      />
    </View>
  );
};
export default WorkoutDetailsScreen;
