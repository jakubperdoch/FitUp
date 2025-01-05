import { Text, View } from "react-native";
import ExerciseTableCell from "@/components/custom/Workouts/ExerciseTable/Cell";
const ExerciseTableComponent = (props: Workout) => {
  return (
    <View>
      <Text className="font-poppinsSemiBold  font- text-2xl mb-6">
        Exercises
      </Text>

      {props.exercises.map((exercise, index) => (
        <ExerciseTableCell key={index} index={index} exercise={exercise} />
      ))}
    </View>
  );
};

export default ExerciseTableComponent;
