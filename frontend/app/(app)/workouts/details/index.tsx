import { useLocalSearchParams } from "expo-router";
import { Text, View, Alert } from "react-native";
import { useState } from "react";
import ScheduleAccordion from "@/components/custom/Workouts/ScheduleAccordion";
import ExerciseTable from "@/components/custom/Workouts/ExerciseTable";
import GradientButton from "@/components/custom/Button/GradientButton";
import { WorkoutContext } from "@/context/WorkoutContext";

const WorkoutDetailsScreen = () => {
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
        sets: [{ weight: 100 }, { reps: 8 }, { reps: 12, weight: 110 }],
      },
      {
        type: "exercise",
        exerciseId: "NbVPDMW",
        name: "dumbbell biceps curl",
        sets: [
          { reps: 10, weight: 100, specialType: "Warmup" },
          { reps: 8, weight: 120 },
          { reps: 12, weight: 110 },
        ],
      },
      {
        type: "superset",
        exercises: [
          {
            type: "exercise",
            exerciseId: "NbVPDMW",
            name: "dumbbell biceps curl",
            sets: [
              { reps: 10, weight: 100, specialType: "failure set" },
              { reps: 8, weight: 120 },
              { reps: 12, weight: 110, specialType: "Drop set" },
            ],
          },
        ],
      },
    ],
  });

  const updateSets = (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number | null,
    callback: (sets: any[]) => any[],
  ) => {
    setData((prevState) => {
      const exercises = [...prevState.exercises];
      const selectedExercise = { ...exercises[exerciseIndex] };

      if (selectedExercise.type === "superset" && superSetIndex !== null) {
        const supersetExercise = {
          ...selectedExercise.exercises[superSetIndex],
        };
        supersetExercise.sets = callback([...supersetExercise.sets]);
        selectedExercise.exercises[superSetIndex] = supersetExercise;
      } else if (selectedExercise.type === "exercise") {
        selectedExercise.sets = callback([...selectedExercise.sets]);
      }

      exercises[exerciseIndex] = selectedExercise;
      return { ...prevState, exercises };
    });
  };

  const specialTypeHandler = (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number | null,
    specialType: string,
  ) => {
    if (specialType === "delete") {
      Alert.alert("Set deletion", "Are you sure you want to delete this set?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: () =>
            updateSets(exerciseIndex, setIndex, superSetIndex, (sets) =>
              sets.filter((_, index) => index !== setIndex),
            ),
        },
      ]);
    } else {
      updateSets(exerciseIndex, setIndex, superSetIndex, (sets) => {
        if (specialType === "normal") {
          delete sets[setIndex].specialType;
        } else {
          sets[setIndex].specialType = specialType;
        }
        return sets;
      });
    }
  };

  const workoutInputHandler = (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number | null,
    repsValue?: number,
    weightValue?: number,
  ) => {
    updateSets(exerciseIndex, setIndex, superSetIndex, (sets) => {
      sets[setIndex] = {
        ...sets[setIndex],
        reps: repsValue ?? sets[setIndex].reps,
        weight: weightValue ?? sets[setIndex].weight,
      };
      return sets;
    });
  };

  return (
    <WorkoutContext.Provider
      value={{ specialTypeHandler, workoutInputHandler }}
    >
      <View className="px-8 flex-col gap-7">
        <View>
          <Text className="capitalize font-poppinsBold text-2xl mb-1">
            {data?.name}
          </Text>
          <Text className="font-poppins text-[#7B6F72]">
            {data?.exercises.length} Exercises | {data?.timeOfWorkout} mins
          </Text>
        </View>

        <ScheduleAccordion days={data?.days} changeDateHandler={() => {}} />
        <ExerciseTable workout={data} />

        <GradientButton
          size="full"
          handleSubmit={() => console.log("Start workout")}
          title="Start the Workout"
        />
        <GradientButton
          size="full"
          colors={["#F2EA00", "#FF6F00"]}
          handleSubmit={() => console.log("Pause workout")}
          title="Pause the Workout"
        />
        <GradientButton
          size="full"
          colors={["#D62828", "#D62828"]}
          handleSubmit={() => console.log("Stop workout")}
          title="Stop the Workout"
        />
      </View>
    </WorkoutContext.Provider>
  );
};

export default WorkoutDetailsScreen;
