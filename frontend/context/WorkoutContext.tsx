import { createContext } from "react";

type WorkoutContextType = {
  specialTypeHandler: (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number,
    specialType: string,
  ) => void;

  workoutInputHandler: (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number,
    repsValue?: number,
    weightValue?: number,
  ) => void;

  deleteSetHandler: (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number | null,
  ) => void;

  deleteExerciseHandler: (exerciseIndex: number) => void;
  isWorkoutEditable: boolean;
  isWorkoutImageVisible: boolean;
  setIsWorkoutImageVisible: (value: boolean) => void;
};

export const WorkoutContext = createContext<Partial<WorkoutContextType>>(null);
