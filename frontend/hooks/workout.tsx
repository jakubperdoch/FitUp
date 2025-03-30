import { useDispatch, useSelector } from "react-redux";
import { useWorkoutTimer } from "@/hooks/workouts";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { useTranslation } from "react-i18next";

import {
  addSet,
  removeExercise,
  removeSet,
  resetExercises,
  updateSet,
  addDays,
  addName,
  clearWorkoutPlan,
} from "@/store/workoutPlan";

import {
  clearWorkout,
  setTimer,
  setWorkout,
  updateActiveWorkoutSet,
} from "@/store/workout";

const useWorkoutDetails = () => {
  const { t } = useTranslation("workouts");
  const dispatch = useDispatch();
  const router = useRouter();
  const { startTimer, stopTimer } = useWorkoutTimer();

  const { workout, isTimerActive } = useSelector(
    (state: RootState) => state.workout,
  );

  const workoutPlan = useSelector(
    (state: RootState) => state.workoutPlan.workout,
  );

  const [data, setData] = useState<WorkoutDetails | null>(null);

  useEffect(() => {
    if (workoutPlan) {
      setData((prevData) => ({
        ...prevData,
        ...(workoutPlan.exercises &&
          workoutPlan.exercises.length > 0 && {
            exercises: workoutPlan.exercises,
          }),
        ...(workoutPlan.days &&
          workoutPlan.days.length > 0 && { days: workoutPlan.days }),
        ...(workoutPlan.name && { name: workoutPlan.name }),
        ...(workoutPlan?.number_of_exercises && {
          number_of_exercises: workoutPlan.number_of_exercises,
        }),
      }));
    }
  }, [workoutPlan]);

  const onNameChange = (name: string) => {
    setData((prevState) => ({
      ...prevState,
      name,
    }));

    dispatch(addName(name));
  };

  const changeDateHandler = (newValue: string) => {
    if (data?.days?.includes(newValue)) {
      const daysArr = data.days.filter((day) => day !== newValue);

      setData((prevState) => ({
        ...prevState,
        days: daysArr,
      }));

      dispatch(addDays(daysArr));
    } else {
      const daysArr = [...(data?.days || [])];
      daysArr.push(newValue);

      setData((prevState) => ({
        ...prevState,
        days: daysArr,
      }));

      dispatch(addDays(daysArr));
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
    special_type: string,
  ) => {
    updateSets(exerciseIndex, setIndex, superSetIndex, (sets) => {
      if (special_type === "normal") {
        if (sets[setIndex]) {
          const { specialType, ...rest } = sets[setIndex];
          sets[setIndex] = rest;
        }
      } else {
        if (!sets[setIndex]) {
          sets[setIndex] = {};
        }

        sets[setIndex] = { ...sets[setIndex], special_type: special_type };
      }
      return sets;
    });

    dispatch(
      updateSet({
        exerciseIndex,
        setIndex,
        superSetIndex: superSetIndex ?? undefined,
        special_type,
      }),
    );
  };

  const deleteSetHandler = (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number | null,
  ) => {
    Alert.alert(
      t("workoutDetails.deleteSetModal.title", { context: "workouts" }),
      t("workoutDetails.deleteSetModal.description", { context: "workouts" }),
      [
        {
          text: t("workoutDetails.deleteSetModal.cancelButton", {
            context: "workouts",
          }),
          style: "cancel",
        },
        {
          text: t("workoutDetails.deleteSetModal.deleteButton", {
            context: "workouts",
          }),
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
      ],
    );
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
      t("workoutDetails.deleteExerciseModal.title", { context: "workouts" }),
      t("workoutDetails.deleteExerciseModal.description", {
        context: "workouts",
      }),
      [
        {
          text: t("workoutDetails.deleteExerciseModal.cancelButton", {
            context: "workouts",
          }),
          style: "cancel",
        },
        {
          text: t("workoutDetails.deleteExerciseModal.deleteButton", {
            context: "workouts",
          }),
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
      updateActiveWorkoutSet({
        exerciseIndex,
        setIndex,
        superSetIndex: superSetIndex ?? undefined,
        repsValue,
        weightValue,
      }),
    );
  };

  const isCurrentWorkoutActive = isTimerActive && workout?.id === data?.id;
  const isOtherWorkoutActive = workout?.id !== data?.id && workout?.timer > 0;

  const buttonTitleHandler = () => {
    if (isCurrentWorkoutActive) {
      return t("workoutDetails.pauseWorkoutButton", {
        context: "workouts",
      });
    } else if (!isCurrentWorkoutActive && workout?.timer > 0) {
      return t("workoutDetails.resumeWorkoutButton", {
        context: "workouts",
      });
    } else {
      return t("workoutDetails.startWorkoutButton", {
        context: "workouts",
      });
    }
  };

  const buttonStateHandler = async () => {
    if (isOtherWorkoutActive) {
      Alert.alert(
        t("workoutDetails.activeWorkoutModal.title", {
          context: "workouts",
        }),
        t("workoutDetails.activeWorkoutModal.description", {
          context: "workouts",
        }),
      );
      return;
    }

    if (isTimerActive && workout?.id !== data.id) {
      return;
    }

    if (isCurrentWorkoutActive) {
      await stopTimer();
      dispatch(setTimer(false));
    } else {
      if (!workout?.id) {
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
    if (!workout?.id) {
      return;
    }
    if (isTimerClear) {
      setData((prevState) => ({
        ...prevState,
        timer: 0,
      }));
    }
    if (workout?.timer > 0) {
      addWorkout(workout);
    }
    await stopTimer();
    dispatch(setTimer(false));
    dispatch(clearWorkout());
  };

  const clearWorkoutHandler = (workout: any) => {
    Alert.alert(
      t("workoutDetails.deleteWorkoutModal.title", {
        context: "workouts",
      }),
      t("workoutDetails.deleteWorkoutModal.description", {
        context: "workouts",
      }),
      [
        {
          text: t("workoutDetails.deleteWorkoutModal.cancelButton", {
            context: "workouts",
          }),
          style: "cancel",
        },
        {
          text: t("workoutDetails.deleteWorkoutModal.deleteButton", {
            context: "workouts",
          }),
          style: "destructive",
          onPress: () => {
            if (workout?.id) {
              deletePlanWorkout({ id: workout?.id });
            } else {
              dispatch(resetExercises());
            }
          },
        },
      ],
    );
  };

  // api calls

  const { mutate: createWorkoutPlan, error: createWorkoutPlanError } =
    useMutation<any, Error, Partial<WorkoutDetails>>({
      mutationKey: ["createWorkoutPlan"],
      mutationFn: (workout) =>
        apiFetch("/workouts/plans/add", {
          method: "POST",
          body: workout,
        }),
      onSuccess: () => {
        dispatch(clearWorkoutPlan());
        router.replace("/workouts/layout");
      },
    });

  const { mutate: deletePlanWorkout, error: deleteWorkoutPlanError } =
    useMutation<any, Error, Partial<WorkoutDetails>>({
      mutationKey: ["deleteWorkoutPlan"],
      mutationFn: (workout) =>
        apiFetch(`/workouts/plans/${workout.id}/delete`, {
          method: "DELETE",
        }),
      onSuccess: () => {
        dispatch(clearWorkoutPlan());
        router.replace("/workouts/layout");
      },
    });

  const { mutate: updateWorkoutPlan, error: updateWorkoutPlanError } =
    useMutation<any, Error, Partial<WorkoutDetails>>({
      mutationKey: ["updateWorkoutPlan"],
      mutationFn: (workout) =>
        apiFetch(`/workouts/plans/${workout.id}/update`, {
          method: "PUT",
          body: workout,
        }),
      onSuccess: () => {
        dispatch(clearWorkoutPlan());
        router.replace("/workouts/layout");
      },
      onError: (error) => {
        console.error(error);
      },
    });

  const { mutate: addWorkout } = useMutation<
    any,
    Error,
    Partial<WorkoutDetails>
  >({
    mutationKey: ["addWorkout"],
    mutationFn: (workout: WorkoutDetails) =>
      apiFetch("/workouts/add", {
        method: "POST",
        body: workout,
      }),
  });

  return {
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
    createWorkoutPlan,
    createWorkoutPlanError,
    updateWorkoutPlan,
    updateWorkoutPlanError,
    onNameChange,
    addWorkout,
  };
};

export default useWorkoutDetails;
