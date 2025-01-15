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
import { useEffect, useMemo } from "react";
import { Text } from "react-native";
import SearchCard from "@/components/custom/Workouts/Search/SearchCard";
import Animated, { ZoomIn } from "react-native-reanimated";

interface ComponentProps {
  muscleGroups: string[];
  exercises: Exercise[];
  accordionSearch: (query: string) => void;
  isLoaded: boolean;
  error?: string;
}

const MuscleGroupAccordionComponent = ({
  muscleGroups,
  exercises,
  accordionSearch,
  isLoaded,
}: ComponentProps) => {
  const groupedExercises = useMemo(() => {
    const groups: { [key: string]: Exercise[] } = {};

    muscleGroups.forEach((group) => {
      groups[group] = exercises.filter((exercise) =>
        exercise.targetMuscles.includes(group),
      );
    });

    return groups;
  }, [muscleGroups, exercises]);

  return (
    <Accordion
      size="md"
      type="single"
      className="bg-transparent shadow-soft-1"
      isCollapsible={true}
      onValueChange={(query) => accordionSearch(query[0])}
    >
      {muscleGroups.map((muscleGroup, index) => (
        <AccordionItem
          key={index}
          value={muscleGroup}
          className="mb-5 rounded-lg"
        >
          <AccordionHeader>
            <AccordionTrigger>
              <AccordionTitleText className="text-lg font-poppins capitalize font-semibold">
                {muscleGroup}
              </AccordionTitleText>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent className="gap-5 pt-4">
            {!isLoaded ? (
              <Spinner className="mx-auto  mb-3" size="small" color="#F77F00" />
            ) : (
              groupedExercises[muscleGroup].map((exercise) => (
                <Animated.View entering={ZoomIn}>
                  <SearchCard key={exercise.exerciseId} exercise={exercise} />
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
