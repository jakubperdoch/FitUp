import { Image, ScrollView, Text, View } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useEffect, useCallback } from "react";
import InstructionsSteps from "@/components/custom/Workouts/Search/InstructionsSteps";
import GradientButton from "@/components/custom/Button/GradientButton";
import { useLayout } from "@/context/LayoutContext";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { setExercises } from "@/store/workoutPlan";
import { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";

const InstructionsPage = () => {
  const params = useLocalSearchParams();
  const { setShowBackButton } = useLayout();
  const { t } = useTranslation("workouts");
  const dispatch = useDispatch();

  const exercises = useSelector(
    (state: RootState) => state.workoutPlan.workout?.exercises,
  );

  useEffect(() => {
    setShowBackButton(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowBackButton(false);
      };
    }, []),
  );

  const { data, isFetching } = useQuery({
    queryKey: ["exerciseDetails", params?.id],
    queryFn: () => apiFetch(`/exercises/${params?.id}/details`),
    enabled: !!params?.id,
  });

  const handleAddExercise = (exercise: Exercise) => {
    dispatch(setExercises([exercise]));

    router.push({
      pathname: "/workouts/create",
    });
  };

  return (
    <ScrollView contentContainerClassName="gap-16 px-7 pb-32">
      {isFetching ? (
        <Spinner color={"#F77F00"} />
      ) : (
        <>
          <View className="flex-col gap-7">
            <View className="gap-1">
              <Text className="capitalize font-poppinsSemiBold text-xl">
                {data?.exercise?.name}
              </Text>
              <Text className="font-poppins capitalize text-[#7B6F72] text-lg">
                {data?.exercise?.target_muscles} | {data?.exercise?.equipments}
              </Text>
            </View>

            {data?.exercise?.gif && (
              <Image
                className="h-40 w-40 mx-auto"
                source={{
                  uri: `https://fitup.scriptbase.eu/public/gifs/${data?.exercise?.gif}`,
                }}
              />
            )}
          </View>
          {data?.exercise?.instructions && (
            <InstructionsSteps steps={data?.exercise?.instructions} />
          )}
        </>
      )}

      <GradientButton
        size={"full"}
        title={t("search.addExerciseButton", {
          context: "workouts",
        })}
        handleSubmit={() => handleAddExercise(data?.exercise)}
      />
    </ScrollView>
  );
};

export default InstructionsPage;
