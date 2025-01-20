import { useDispatch, useSelector } from "react-redux";
import { useWorkoutTimer } from "@/hooks/workouts";
import { useState } from "react";
import { RootState } from "@/store/store";
import { Alert } from "react-native";
import { clearWorkout, setTimer, setWorkout } from "@/store/workout";
import {
  addSet,
  removeExercise,
  removeSet,
  resetExercises,
  updateSet,
} from "@/store/workoutCreation";
import { useRouter } from "expo-router";

const useWorkoutDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { startTimer, stopTimer } = useWorkoutTimer();
  const { workout, isTimerActive } = useSelector(
    (state: RootState) => state.workout,
  );

  const [data, setData] = useState<WorkoutDetails>({
    id: 1,
    name: "fullbody workout",
    timeOfWorkout: 32,
    days: ["Monday"],
    numberOfExercises: 11,
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
          {
            type: "exercise",
            exerciseId: "guT8YnS",
            name: "biceps pull-up",
            sets: [{ weight: 100 }, { reps: 8 }, { reps: 12, weight: 110 }],
          },
        ],
      },
    ],
  });

  const [newData, setNewData] = useState<Partial<WorkoutDetails>>({});

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
        selectedExercise.exercises = [...selectedExercise.exercises];

        const supersetExercise = {
          ...selectedExercise.exercises[superSetIndex],
        };

        supersetExercise.sets = callback([...(supersetExercise.sets || [])]);
        selectedExercise.exercises[superSetIndex] = supersetExercise;
      } else if (selectedExercise.type === "exercise") {
        selectedExercise.sets = callback([...(selectedExercise.sets || [])]);
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
    updateSets(exerciseIndex, setIndex, superSetIndex, (sets) => {
      if (specialType === "normal") {
        delete sets[setIndex].specialType;
      } else {
        sets[setIndex].specialType = specialType;
      }
      return sets;
    });
  };

  const deleteSetHandler = (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number | null,
  ) => {
    Alert.alert("Delete Set", "Are you sure you want to delete this set?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          updateSets(exerciseIndex, setIndex, superSetIndex, (sets) => {
            sets.splice(setIndex, 1);
            return sets;
          });

          dispatch(
            removeSet({
              exerciseIndex,
              setIndex,
              supersetIndex: superSetIndex ?? undefined,
            }),
          );
        },
      },
    ]);
  };

  const addSetHandler = (
    exerciseIndex: number,
    superSetIndex: number | null,
  ) => {
    updateSets(exerciseIndex, 0, superSetIndex, (sets) => {
      sets.push({});
      return sets;
    });
    if (superSetIndex !== null) {
      dispatch(
        addSet({ exerciseIndex: exerciseIndex, supersetIndex: superSetIndex }),
      );
    } else {
      dispatch(addSet({ exerciseIndex: exerciseIndex }));
    }
  };

  const deleteExerciseHandler = (exerciseIndex: number) => {
    Alert.alert(
      "Delete Exercise",
      "Are you sure you want to delete this exercise?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setData((prevState) => {
              const exercises = [...prevState.exercises];
              exercises.splice(exerciseIndex, 1);
              return { ...prevState, exercises };
            });

            dispatch(removeExercise(exerciseIndex));
          },
        },
      ],
    );
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

    dispatch(
      updateSet({
        exerciseIndex,
        setIndex,
        superSetIndex: superSetIndex ?? undefined,
        repsValue,
        weightValue,
      }),
    );
  };

  const isCurrentWorkoutActive = isTimerActive && workout?.id === data.id;
  const isOtherWorkoutActive = isTimerActive && workout.id !== data.id;

  const buttonTitleHandler = () => {
    if (isCurrentWorkoutActive) {
      return "Pause Workout";
    } else if (!isCurrentWorkoutActive && workout?.timer > 0) {
      return "Resume Workout";
    } else {
      return "Start Workout";
    }
  };

  const buttonStateHandler = async () => {
    if (isOtherWorkoutActive) {
      Alert.alert(
        "Workout Active",
        "Another workout is already active. Please finish or stop the current workout before starting a new one.",
      );
      return;
    }

    if (isTimerActive && workout.id !== data.id) {
      return;
    }

    if (isCurrentWorkoutActive) {
      await stopTimer();
      dispatch(setTimer(false));
    } else {
      if (!workout) {
        dispatch(setWorkout(data));
      }
      await startTimer();
      dispatch(setTimer(true));
    }
  };

  const stopWorkoutHandler = async () => {
    dispatch(clearWorkout());
    dispatch(setTimer(false));
    await stopTimer();
  };

  const finishWorkoutHandler = async (isTimerClear: boolean) => {
    if (!workout) {
      return;
    }
    if (isTimerClear) {
      setData((prevState) => ({
        ...prevState,
        timer: 0,
      }));
    }
    await stopTimer();
    dispatch(setTimer(false));
    dispatch(clearWorkout());
  };

  const clearWorkoutHandler = () => {
    Alert.alert(
      "Delete Workout",
      "Are you sure you want to delete this workout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            dispatch(resetExercises());
            router.push("/workouts");
          },
        },
      ],
    );
  };

  return {
    newData,
    data,
    setData,
    addSetHandler,
    specialTypeHandler,
    workoutInputHandler,
    deleteSetHandler,
    deleteExerciseHandler,
    changeDateHandler,
    buttonStateHandler,
    buttonTitleHandler,
    finishWorkoutHandler,
    stopWorkoutHandler,
    clearWorkoutHandler,
    isCurrentWorkoutActive,
    isOtherWorkoutActive,
  };
};

export default useWorkoutDetails;
