import { Text, TouchableOpacity, View } from "react-native";
import GenericIcon from "@/components/custom/Icon";
import Animated, { ZoomIn } from "react-native-reanimated";
import { router } from "expo-router";

interface ComponentProps {
  exercise: Exercise;
  handleExercisePress: (exercise: Exercise) => void;
  isSelected: boolean;
  selectedExercises: Exercise[];
}

const SearchCardComponent = ({
  exercise,
  handleExercisePress,
  isSelected,
  selectedExercises,
}: ComponentProps) => {
  const exerciseIndex =
    selectedExercises.findIndex((ex) => ex.exerciseId === exercise.exerciseId) +
    1;
  return (
    <TouchableOpacity
      onPress={() => handleExercisePress(exercise)}
      activeOpacity={0.7}
      className={`shadow-soft-1 w-full p-6 bg-white rounded-xl flex-row justify-between items-center ${isSelected ? "!bg-[#F77F00]/20" : ""}`}
    >
      <View className="gap-3 flex-row items-center">
        {isSelected && (
          <Animated.View
            entering={ZoomIn}
            className="bg-black/10  w-8 h-8 rounded-full justify-center items-center"
          >
            <Text className="font-poppins capitalize font-semibold">
              {exerciseIndex}
            </Text>
          </Animated.View>
        )}

        <Text className="text-lg font-poppins capitalize font-semibold">
          {exercise?.name}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          router.push({
            pathname: "/workouts/search/instructions",
            params: { exerciseId: exercise.exerciseId },
          })
        }
      >
        <GenericIcon name={"Info"} color="#F77F00" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SearchCardComponent;
