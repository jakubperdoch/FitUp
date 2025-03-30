import { useCallback, useState } from "react";
import { addSuperset, setExercises } from "@/store/workoutPlan";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { router, useLocalSearchParams } from "expo-router";

const useExercises = () => {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const dispatch = useDispatch();

  const exercises = useSelector(
    (state: RootState) => state.workoutPlan.workout?.exercises,
  );

  const handleExerciseSelection = useCallback((exercise: Exercise) => {
    setSelectedExercises((prev) => {
      const exists = prev.find((ex) => ex.exercise_id === exercise.exercise_id);
      return exists
        ? prev.filter((ex) => ex.exercise_id !== exercise.exercise_id)
        : [...prev, exercise];
    });
  }, []);

  const handleSubmit = (params: any) => {
    if (params?.type === "exercise") {
      if (exercises && exercises.length > 0) {
        const isExercise = (ex: Exercise | Superset): ex is Exercise => {
          return ex.type === "exercise";
        };
        const filteredExercises = exercises.filter(isExercise);

        dispatch(setExercises([...filteredExercises, ...selectedExercises]));
      } else {
        dispatch(setExercises(selectedExercises));
      }
    } else if (params?.type === "superset") {
      dispatch(
        addSuperset({
          type: "superset",
          exercises: selectedExercises,
        }),
      );
    }

    router.push({
      pathname: "/workouts/create",
    });
  };

  return {
    selectedExercises,
    handleExerciseSelection,
    handleSubmit,
    setSelectedExercises,
  };
};

export default useExercises;
