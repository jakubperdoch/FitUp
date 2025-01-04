interface ExerciseSet {
  reps: number;
  weight: number;
  specialType?: string;
}

interface Exercise {
  exerciseId: string;
  name: string;

  sets?: Array<ExerciseSet>;
}

interface ExerciseDetails extends Exercise {
  giftUrl: string;
  instructions: Array<string>;
  targetMuscles: Array<string>;
  bodyParts: Array<string>;
  equipments: Array<string>;
  secondaryMuscles: Array<string>;
}

interface Workout {
  id: number;
  name: string;
  timeOfWorkout: number;
  days: Array<string>;
  timer?: number | null;

  exercises: Array<Exercise>;
}
