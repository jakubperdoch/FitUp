interface ExerciseSet {
  reps?: number;
  weight?: number;
  special_type?: string;
}

interface Superset {
  type: "superset";
  exercises: Array<Exercise>;
}

interface Exercise {
  id?: number;
  type?: "exercise";
  exercise_id: string;
  name: string;
  sets?: Array<ExerciseSet>;
  targetMuscles?: Array<string>;
}

interface ExerciseDetails extends Exercise {
  gifUrl: string;
  instructions: Array<string>;
  bodyParts: Array<string>;
  equipments: Array<string>;
  secondaryMuscles: Array<string>;
}

interface Workout {
  id: number;
  name: string;
  day?: string;
  timer?: number | null;
  number_of_exercises: number;
}

interface WorkoutDetails extends Workout {
  exercises: Array<Exercise | Superset>;
  days: Array<string>;
}
