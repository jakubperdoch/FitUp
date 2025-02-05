import { ActivityIndicator, FlatList, Text, View } from "react-native";
import FoodScrollCardComponent from "./Card";
import { useCallback, useRef } from "react";
import debounce from "lodash/debounce";

interface ComponentProps {
  meals: MealSearchCard[];
  onClick: (id: number) => void;
  isLoading: boolean;
  onRefresh: () => void;
  loadMore: () => void;
}

const FoodScrollComponent = ({
  meals,
  onClick,
  isLoading,
  onRefresh,
  loadMore,
}: ComponentProps) => {
  const flatListRef = useRef<FlatList>(null);

  const debouncedLoadMore = useCallback(
    debounce(() => {
      if (flatListRef.current && meals?.length > 0) {
        const margin = 2;
        const index = Math.max(0, meals.length - margin);

        flatListRef.current.scrollToIndex({
          animated: true,
          index: index,
          viewPosition: 0.5,
        });
      }
      loadMore();
    }, 300),
    [loadMore, meals],
  );

  return (
    <View className="h-full flex flex-col gap-5">
      <Text className="ms-7 text-2xl font-semibold font-poppins ">Meals</Text>

      <FlatList
        ref={flatListRef}
        data={meals}
        className="px-7  h-full"
        refreshing={isLoading && meals.length === 0}
        onRefresh={() => onRefresh}
        contentContainerClassName="pt-3 pb-[40rem]"
        renderItem={({ item }) => (
          <FoodScrollCardComponent
            key={item.id}
            meal={item}
            onClick={onClick}
          />
        )}
        ListEmptyComponent={() =>
          !isLoading && (
            <Text className="mx-auto text-[#ADA4A5]">No meals found.</Text>
          )
        }
        onEndReachedThreshold={0.05}
        onEndReached={() => debouncedLoadMore()}
        ListFooterComponent={() =>
          isLoading && <ActivityIndicator color={"#F77F00"} />
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default FoodScrollComponent;
