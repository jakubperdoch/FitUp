import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
} from "@/components/ui/accordion";
import { Spinner } from "@/components/ui/spinner";
import { useMemo } from "react";
import SearchCard from "@/components/custom/Workouts/Search/SearchCard";
import Animated, { ZoomIn } from "react-native-reanimated";
import { shadows } from "@/styles/shadows";

interface ComponentProps {
  muscleGroups: { id: number; name: string }[];
  exercises: Exercise[];
  handleExercisePress: (exercise: Exercise) => void;
  selectedExercises: Exercise[];
  accordionSearch: (name: string) => void;
  isLoading: boolean;
  error?: string;
}

const MuscleGroupAccordionComponent = ({
  muscleGroups,
  exercises,
  handleExercisePress,
  selectedExercises,
  accordionSearch,
  isLoading,
}: ComponentProps) => {
  return (
    <Accordion
      size="md"
      type="single"
      style={shadows.soft1}
      className="bg-transparent"
      isCollapsible={true}
      onValueChange={(query) => accordionSearch(query[0])}
    >
      {muscleGroups?.map((muscleGroup, index) => (
        <AccordionItem
          key={index}
          value={muscleGroup.name}
          className="mb-5 rounded-lg"
        >
          <AccordionHeader>
            <AccordionTrigger>
              <AccordionTitleText className="text-lg font-poppins capitalize font-semibold">
                {muscleGroup?.name}
              </AccordionTitleText>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent className="gap-5 pt-4">
            {isLoading ? (
              <Spinner className="mx-auto  mb-3" size="small" color="#F77F00" />
            ) : (
              exercises?.map((exercise) => (
                <Animated.View key={exercise.exercise_id} entering={ZoomIn}>
                  <SearchCard
                    selectedExercises={selectedExercises}
                    isSelected={selectedExercises.some(
                      (ex) => ex.exercise_id === exercise.exercise_id,
                    )}
                    handleExercisePress={handleExercisePress}
                    key={exercise.exercise_id}
                    exercise={exercise}
                  />
                </Animated.View>
              ))
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default MuscleGroupAccordionComponent;
