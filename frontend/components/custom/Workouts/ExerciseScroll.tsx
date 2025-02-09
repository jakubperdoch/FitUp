import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import SearchCard from "@/components/custom/Workouts/Search/SearchCard";
import Animated from "react-native-reanimated";

interface ComponentProps {
  exercises: Exercise[];
  selectedExercises: Exercise[];
  handleExerciseSelection: (exercise: Exercise) => void;
  loadMore: () => void;
  isLoading: boolean;
}

const FoodScrollComponent = ({
  selectedExercises,
  exercises,
  handleExerciseSelection,
  loadMore,
  isLoading,
}: ComponentProps) => {
  const flatListRef = useRef<FlatList>(null);

  const debouncedLoadMore = useCallback(
    debounce(() => {
      if (flatListRef.current && exercises?.length > 0) {
        const margin = 2;
        const index = Math.max(0, exercises?.length - margin);

        flatListRef.current.scrollToIndex({
          animated: true,
          index: index,
          viewPosition: 0.5,
        });
      }
      loadMore();
    }, 300),
    [loadMore, exercises],
  );

  return (
    <Animated.View className="h-full flex flex-col gap-5">
      <Text className="ms-7 text-2xl font-semibold font-poppins ">
        Exercises
      </Text>

      <FlatList
        ref={flatListRef}
        data={exercises}
        className="px-7  h-full"
        contentContainerClassName="pt-3 pb-[40rem]"
        renderItem={({ item }) => (
          <SearchCard
            key={item.id}
            exercise={item}
            handleExercisePress={handleExerciseSelection}
            isSelected={selectedExercises.some(
              (ex) => ex.exercise_id === item.exercise_id,
            )}
            selectedExercises={selectedExercises}
          />
        )}
        ListEmptyComponent={() =>
          !isLoading && (
            <Text className="mx-auto text-[#ADA4A5]">No exercises found.</Text>
          )
        }
        onEndReachedThreshold={0.05}
        onEndReached={() => debouncedLoadMore()}
        ListFooterComponent={() =>
          isLoading && <ActivityIndicator color={"#F77F00"} />
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </Animated.View>
  );
};

export default FoodScrollComponent;
