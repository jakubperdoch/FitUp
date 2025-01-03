interface Exercise {
  exerciseId: number;
  name: string;
  giftUrl: string;
  instructions: Array<string>;
  targetMuscles: Array<string>;
  bodyParts: Array<string>;
  equipments: Array<string>;
  secondaryMuscles: Array<string>;
}

interface Workout {
  id: string;
  timeOfWorkout: number;
  day: string;
  timer: number | null;
}
