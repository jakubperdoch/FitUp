import { View } from "react-native";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import GenericIcon from "@/components/custom/Icon";
import { useCallback, useEffect, useState } from "react";
import GradientButton from "@/components/custom/Button/GradientButton";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { useDebounce } from "@uidotdev/usehooks";
import ExerciseScroll from "@/components/custom/Workouts/ExerciseScroll";
import useExercises from "@/hooks/exercises";
import { useTranslation } from "react-i18next";
import SearchFilter from "@/components/custom/Workouts/Search/SearchFilter";

interface FetchedExercises {
  exercises: Exercise[];
  total_results: number;
}

const WorkoutSearchPage = () => {
  const [exerciseQuery, setExerciseQuery] = useState<string>("");
  const [maxResults, setMaxResults] = useState(10);
  const [exerciseData, setExerciseData] = useState([]);
  const { t } = useTranslation("workouts");
  const params = useLocalSearchParams();
  const exerciseSearch = useDebounce(exerciseQuery, 100);

  const { handleSubmit, handleExerciseSelection, selectedExercises } =
    useExercises();

  const { data, isFetching, isLoading, isPending } = useQuery<FetchedExercises>(
    {
      queryKey: ["exercises", exerciseSearch, maxResults],
      queryFn: () =>
        apiFetch(`/exercises?search=${exerciseSearch}&max=${maxResults}`),
    },
  );

  useEffect(() => {
    if (data) {
      setExerciseData((prev) => data?.exercises);
    }
  }, [data]);

  const isFetchingExercises = isFetching || isLoading || isPending;

  const loadMore = useCallback(() => {
    if (!isFetching) {
      if (data?.total_results > maxResults) {
        setMaxResults((prev) => prev + 10);
      }
    }
  }, [isFetching]);

  useEffect(() => {
    setMaxResults(10);
    setExerciseData([]);
  }, [exerciseSearch]);

  return (
    <View className="flex-col gap-7">
      <SearchFilter
        setExerciseQuery={setExerciseQuery}
        exerciseQuery={exerciseQuery}
      />

      <View className="h-3/5">
        <ExerciseScroll
          exercises={exerciseData}
          selectedExercises={selectedExercises}
          handleExerciseSelection={handleExerciseSelection}
          loadMore={loadMore}
          isLoading={isFetchingExercises}
        />
      </View>

      <View className="px-7 w-full mt-4">
        <GradientButton
          disabled={
            params?.type === "superset"
              ? selectedExercises.length < 2
              : selectedExercises.length < 1
          }
          size={"full"}
          title={
            params?.type === "superset"
              ? t("search.addSupersetButton", {
                  context: "workouts",
                })
              : t("search.addExerciseButton", {
                  context: "workouts",
                })
          }
          handleSubmit={() => handleSubmit(params)}
        />
      </View>
    </View>
  );
};

export default WorkoutSearchPage;
