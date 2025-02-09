import { View } from "react-native";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import GenericIcon from "@/components/custom/Icon";
import { useCallback, useEffect, useState } from "react";
import GradientButton from "@/components/custom/Button/GradientButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { router, useLocalSearchParams } from "expo-router";
import { addSuperset, setExercises } from "@/store/workoutPlan";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { useDebounce } from "@uidotdev/usehooks";
import ExerciseScroll from "@/components/custom/Workouts/ExerciseScroll";

interface FetchedExercises {
  exercises: Exercise[];
  total_results: number;
}

const WorkoutSearchPage = () => {
  const [exerciseQuery, setExerciseQuery] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [maxResults, setMaxResults] = useState(10);
  const [exerciseData, setExerciseData] = useState([]);

  const params = useLocalSearchParams();
  const dispatch = useDispatch();
  const exercises = useSelector(
    (state: RootState) => state.workoutPlan.workout?.exercises,
  );

  const exerciseSearch = useDebounce(exerciseQuery, 100);

  const { data: fetchedExercises, isFetching } = useQuery<FetchedExercises>({
    queryKey: ["exercises", exerciseSearch, maxResults],
    queryFn: () =>
      apiFetch(`/exercises?search=${exerciseSearch}&max=${maxResults}`),
  });

  const handleExerciseSelection = useCallback((exercise: Exercise) => {
    setSelectedExercises((prev) => {
      const exists = prev.find((ex) => ex.exercise_id === exercise.exercise_id);
      return exists
        ? prev.filter((ex) => ex.exercise_id !== exercise.exercise_id)
        : [...prev, exercise];
    });
  }, []);

  const handleSubmit = () => {
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
      pathname: "/workouts/layout/create",
      params: { id: params?.id },
    });
  };

  useEffect(() => {
    if (fetchedExercises) {
      setExerciseData((prev) => fetchedExercises?.exercises);
    }
  }, [fetchedExercises]);

  const loadMore = useCallback(() => {
    if (!isFetching) {
      if (fetchedExercises?.total_results > maxResults) {
        setMaxResults((prev) => prev + 10);
      }
    }
  }, [isFetching]);

  useEffect(() => {
    setMaxResults(10);
  }, [exerciseSearch]);

  useEffect(() => {
    setExerciseData([]);
    setMaxResults(0);
  }, [exerciseSearch]);

  return (
    <View className="flex-col gap-7 ">
      <Input size="xl" variant="rounded" className="mx-7">
        <InputSlot>
          <GenericIcon name="Search" size={20} color="#7B6F72" />
        </InputSlot>
        <InputField
          className="text-lg"
          value={exerciseQuery}
          onChangeText={setExerciseQuery}
          type={"text"}
          placeholder="Search for exercises"
          placeholderTextColor={"#7B6F72"}
          autoCapitalize="words"
          autoCorrect={false}
        />
      </Input>

      <ExerciseScroll
        exercises={exerciseData}
        selectedExercises={selectedExercises}
        handleExerciseSelection={handleExerciseSelection}
        loadMore={loadMore}
        isLoading={isFetching}
      />

      <View className="px-7 w-full">
        <GradientButton
          disabled={
            params?.type === "superset"
              ? selectedExercises.length < 2
              : selectedExercises.length < 1
          }
          size={"full"}
          title={params?.type === "superset" ? "Add Superset" : "Add Exercise"}
          handleSubmit={handleSubmit}
        />
      </View>
    </View>
  );
};

export default WorkoutSearchPage;
