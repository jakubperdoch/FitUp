import { Text, TouchableOpacity, View } from "react-native";
import GenericIcon from "@/components/custom/Icon";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface CategoryListProps {
  isExpanded: SharedValue<boolean>;
  selectedMuscle: string | null;
  setSelectedMuscle: (muscle: string) => void;
  viewKey: number;
  duration?: number;
  data?: any;
}

interface SearchFilterProps {
  exerciseQuery: string;
  setExerciseQuery: (query: string) => void;
  selectedMuscle: string | null;
  setSelectedMuscle: (muscle: string) => void;
}

const SearchFilter = ({
  setExerciseQuery,
  exerciseQuery,
  selectedMuscle,
  setSelectedMuscle,
}: SearchFilterProps) => {
  const { t } = useTranslation("workouts");
  const isAccordionOpen = useSharedValue(false);

  const onPressHandler = () => {
    isAccordionOpen.value = !isAccordionOpen.value;
  };

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiFetch("/exercises/muscles"),
  });

  const isLoadingOrFetching = isLoading || isFetching;

  return (
    <>
      <View className="mx-7 flex-row justify-between  gap-5">
        <Input size="lg" variant="rounded" className="flex-1">
          <InputSlot>
            <GenericIcon name="Search" size={17} color="#7B6F72" />
          </InputSlot>
          <InputField
            className="text-lg"
            value={exerciseQuery}
            onChangeText={setExerciseQuery}
            type={"text"}
            placeholder={t("search.searchPlaceholder", {
              context: "workouts",
            })}
            placeholderTextColor={"#7B6F72"}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </Input>

        <TouchableOpacity
          onPress={onPressHandler}
          activeOpacity={0.7}
          className="bg-[#F77F00] w-14 h-14 rounded-[0.875rem] flex items-center justify-center"
        >
          {isLoadingOrFetching ? (
            <Spinner color="white" />
          ) : (
            <GenericIcon name="Settings2" size={24} color="#FFF" />
          )}
        </TouchableOpacity>
      </View>

      <CategoryList
        selectedMuscle={selectedMuscle}
        setSelectedMuscle={setSelectedMuscle}
        data={data?.muscles}
        isExpanded={isAccordionOpen}
        viewKey={1}
      />
    </>
  );
};

export const CategoryList = ({
  selectedMuscle,
  setSelectedMuscle,
  isExpanded,
  viewKey,
  duration = 300,
  data,
}: CategoryListProps) => {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={bodyStyle}
      className="w-full overflow-hidden "
    >
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        className="absolute flex-row flex-wrap gap-2 px-7"
      >
        {data?.map((category) => (
          <TouchableOpacity
            key={category?.name}
            activeOpacity={0.7}
            onPress={() => {
              setSelectedMuscle(
                selectedMuscle === category?.name ? null : category?.name,
              );
            }}
            className={`bg-[#E5E6E6] px-4 py-2 rounded-3xl ${selectedMuscle === category?.name ? "bg-[#F77F00]" : ""}`}
          >
            <Text className="capitalize w-full">{category?.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

export default SearchFilter;
