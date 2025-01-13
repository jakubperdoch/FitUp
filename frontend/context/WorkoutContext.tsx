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
};

export const WorkoutContext = createContext<WorkoutContextType | null>(null);
