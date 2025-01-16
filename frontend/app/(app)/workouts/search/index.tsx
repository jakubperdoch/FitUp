import { View } from "react-native";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import GenericIcon from "@/components/custom/Icon";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import MuscleGroupAccordion from "@/components/custom/Workouts/Search/MuscleGroupAccordion";
import Animated, { ZoomIn } from "react-native-reanimated";
import SearchCard from "@/components/custom/Workouts/Search/SearchCard";
import { Spinner } from "@/components/ui/spinner";
import GradientButton from "@/components/custom/Button/GradientButton";

const exercisesData: Exercise[] = [
  {
    type: "exercise",
    exerciseId: "2gPfomN",
    name: "3/4 sit-up",
    targetMuscles: ["abs"],
  },
  {
    type: "exercise",
    exerciseId: "Hy9D21L",
    name: "45° side bend",
    targetMuscles: ["abs"],
  },
  {
    type: "exercise",
    exerciseId: "4IKbhHV",
    name: "alternate lateral pulldown",
    targetMuscles: ["lats"],
  },
  {
    type: "exercise",
    exerciseId: "PAgTVaK",
    name: "assisted chest dip (kneeling)",
    targetMuscles: ["pectorals"],
  },
];

const musclesData: string[] = ["abs", "lats", "pectorals"];

const WorkoutSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [exercises, setExercises] = useState<Array<Exercise>>([]);
  const [muscleGroups, setMuscleGroups] = useState<Array<string>>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim() === "") {
        setExercises([]);
        return;
      }

      try {
        setIsLoaded(false);
        const filteredExercises = exercisesData.filter((exercise) =>
          exercise.name.toLowerCase().includes(query.toLowerCase()),
        );
        setExercises(filteredExercises);
      } catch (err) {
        setIsError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoaded(true);
      }
    }, 1000),
    [],
  );

  const accordionSearch = useCallback(
    debounce((query: string) => {
      try {
        setIsLoaded(false);
        const filteredExercises = exercisesData.filter((exercise) =>
          exercise.targetMuscles.includes(query),
        );
        setExercises(filteredExercises);
        setIsError(null);
      } catch (err: any) {
        setIsError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoaded(true);
      }
    }, 500),
    [],
  );

  const handleAccordionSearch = (muscle: string) => {
    setIsLoaded(false);
    accordionSearch(muscle);
  };

  const handleExerciseSelection = (exercise: Exercise) => {
    setSelectedExercises((prev) => {
      if (prev.find((ex) => ex.exerciseId === exercise.exerciseId)) {
        return prev.filter((ex) => ex.exerciseId !== exercise.exerciseId);
      } else {
        return [...prev, exercise];
      }
    });
  };

  useEffect(() => {
    setMuscleGroups(musclesData);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    debouncedSearch(searchQuery);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  return (
    <View className="flex-col gap-7 px-7">
      <Input size="xl" variant="rounded">
        <InputSlot>
          <GenericIcon name="Search" size={20} color="#7B6F72" />
        </InputSlot>
        <InputField
          className="text-lg"
          value={searchQuery}
          onChangeText={setSearchQuery}
          type={"text"}
          placeholder="Search for exercises"
          autoCapitalize="words"
          autoCorrect={false}
        />
      </Input>

      {searchQuery ? (
        <Animated.View entering={ZoomIn} className="gap-5">
          {isLoaded ? (
            exercises.map((exercise) => (
              <SearchCard
                selectedExercises={selectedExercises}
                isSelected={selectedExercises.some(
                  (ex) => ex.exerciseId === exercise.exerciseId,
                )}
                key={exercise.exerciseId}
                handleExercisePress={handleExerciseSelection}
                exercise={exercise}
              />
            ))
          ) : (
            <Spinner className="mx-auto mb-3" size="small" color="#F77F00" />
          )}
        </Animated.View>
      ) : (
        <Animated.View entering={ZoomIn}>
          <MuscleGroupAccordion
            selectedExercises={selectedExercises}
            handleExercisePress={handleExerciseSelection}
            isLoaded={isLoaded}
            muscleGroups={muscleGroups}
            exercises={exercises}
            accordionSearch={handleAccordionSearch}
          />
        </Animated.View>
      )}

      {/*<GradientButton/>*/}
    </View>
  );
};

export default WorkoutSearchPage;
