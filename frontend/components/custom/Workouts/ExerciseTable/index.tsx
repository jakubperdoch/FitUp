import { Text, View } from "react-native";
import ExerciseTableCell from "@/components/custom/Workouts/ExerciseTable/Cell";

type ComponentProps = {
  workout: Workout;
};

const ExerciseTableComponent = (props: ComponentProps) => {
  return (
    <View>
      <Text className="font-poppinsSemiBold  font- text-2xl mb-6">
        Exercises
      </Text>

      {props.workout.exercises.map((exercise, exerciseIndex) =>
        exercise?.type === "exercise" ? (
          <View className="border-b mb-4 border-black/20 " key={exerciseIndex}>
            <Text className="font-poppins text-[#F77F00] text-lg">
              {exerciseIndex + 1}
            </Text>
            <ExerciseTableCell
              exerciseIndex={exerciseIndex}
              exercise={exercise}
            />
          </View>
        ) : (
          <View className="border-b mb-4 border-black/20" key={exerciseIndex}>
            <Text className="font-poppins text-[#F77F00] text-lg">
              {exerciseIndex + 1} Superset
            </Text>
            {exercise.exercises.map((exercise, superSetIndex) => (
              <View className="mb-4" key={superSetIndex}>
                <ExerciseTableCell
                  superSetIndex={superSetIndex}
                  exerciseIndex={exerciseIndex}
                  exercise={exercise}
                />
              </View>
            ))}
          </View>
        ),
      )}
    </View>
  );
};

export default ExerciseTableComponent;
