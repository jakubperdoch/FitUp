import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useState } from "react";
import ScheduleAccordion from "@/components/custom/Workouts/ScheduleAccordion";
import ExerciseTable from "@/components/custom/Workouts/ExerciseTable";

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
        type: "exercise",
        exerciseId: "guT8YnS",
        name: "biceps pull-up",
        sets: [
          {
            weight: 100,
          },
          {
            reps: 8,
          },
          {
            reps: 12,
            weight: 110,
          },
        ],
      },
      {
        type: "exercise",
        exerciseId: "NbVPDMW",
        name: "dumbbell biceps curl",
        sets: [
          {
            reps: 10,
            weight: 100,
            specialType: "Warmup",
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
        <Text className="capitalize font-poppinsBold text-2xl mb-1">
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

      <ExerciseTable
        id={data?.id}
        name={data?.name}
        timeOfWorkout={data?.timeOfWorkout}
        days={data?.days}
        exercises={data?.exercises}
      />
    </View>
  );
};
export default WorkoutDetailsScreen;
