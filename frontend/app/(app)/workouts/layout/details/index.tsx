import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import ScheduleAccordion from "@/components/custom/Workouts/ScheduleAccordion";
import ExerciseTable from "@/components/custom/Workouts/ExerciseTable";
import GradientButton from "@/components/custom/Button/GradientButton";
import { WorkoutContext } from "@/context/WorkoutContext";
import useWorkoutDetails from "@/hooks/workout";
import Animated, { ZoomIn } from "react-native-reanimated";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "react-i18next";

const WorkoutDetailsScreen = () => {
  const params = useLocalSearchParams();
  const [isWorkoutEditable, setIsWorkoutEditable] = useState<boolean>(false);
  const { t } = useTranslation("workouts");

  const {
    data,
    setData,
    specialTypeHandler,
    workoutInputHandler,
    deleteSetHandler,
    deleteExerciseHandler,
    changeDateHandler,
    buttonStateHandler,
    buttonTitleHandler,
    finishWorkoutHandler,
    stopWorkoutHandler,
    isCurrentWorkoutActive,
    isOtherWorkoutActive,
  } = useWorkoutDetails();

  const {
    data: workoutPlan,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["workoutPlan", params.id],
    queryFn: () =>
      apiFetch(`/workouts/plans/${params?.id}/details`, {
        method: "GET",
      }),
  });

  useEffect(() => {
    if (workoutPlan?.workout) {
      setData(workoutPlan?.workout);
    }
  }, [workoutPlan?.workout]);

  return (
    <WorkoutContext.Provider
      value={{
        specialTypeHandler,
        workoutInputHandler,
        deleteSetHandler,
        deleteExerciseHandler,
        isWorkoutEditable,
        data: data,
      }}
    >
      {isFetching || isLoading ? (
        <Spinner color={"#F77F00"} />
      ) : (
        <Animated.View entering={ZoomIn} className="px-8 flex-col gap-7">
          <View>
            <View className="mb-1 flex-row items-center justify-between">
              <Text className="capitalize font-poppinsBold text-2xl ">
                {data?.name}
              </Text>

              {!isWorkoutEditable && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    router.push({
                      pathname: "/workouts/layout/create",
                      params: { id: data?.id },
                    })
                  }
                >
                  <Text className="font-poppinsSemiBold text-lg text-[#F77F00]">
                    {t("workoutDetails.editButton", { context: "workouts" })}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <Text className="font-poppins text-[#7B6F72]">
              {data?.number_of_exercises}{" "}
              {t("workoutDetails.exercises", { context: "workouts" })}
            </Text>
          </View>

          <ScheduleAccordion
            days={data?.days}
            changeDateHandler={changeDateHandler}
          />

          <ExerciseTable workout={data} />

          <Animated.View entering={ZoomIn} className="flex-col gap-5">
            <GradientButton
              size="full"
              colors={
                isCurrentWorkoutActive
                  ? ["rgba(214, 40, 40, 0.9)", "rgba(247, 127, 0, 0.8)"]
                  : ["#2CBF29", "#24E022"]
              }
              handleSubmit={buttonStateHandler}
              title={buttonTitleHandler()}
              disabled={isOtherWorkoutActive}
            />

            {isCurrentWorkoutActive && (
              <Animated.View entering={ZoomIn} className="flex-col gap-5">
                <GradientButton
                  size="full"
                  colors={["#F2EA00", "#FF6F00"]}
                  handleSubmit={finishWorkoutHandler}
                  title={t("workoutDetails.finishWorkoutButton", {
                    context: "workouts",
                  })}
                />

                <GradientButton
                  size="full"
                  colors={["#D62828", "#D62828"]}
                  handleSubmit={stopWorkoutHandler}
                  title={t("workoutDetails.stopWorkoutButton", {
                    context: "workouts",
                  })}
                />
              </Animated.View>
            )}
          </Animated.View>
        </Animated.View>
      )}
    </WorkoutContext.Provider>
  );
};

export default WorkoutDetailsScreen;
