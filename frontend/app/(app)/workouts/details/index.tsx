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

const WorkoutDetailsScreen = () => {
  const params = useLocalSearchParams();
  const [isWorkoutEditable, setIsWorkoutEditable] = useState<boolean>(false);

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

  useEffect(() => {
    console.log(workoutPlan?.workout);
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
        <View className="px-8 flex-col gap-7">
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
                      pathname: "/workouts/create",
                      params: { id: data?.id },
                    })
                  }
                >
                  <Text className="font-poppinsSemiBold text-lg text-[#F77F00]">
                    Edit
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <Text className="font-poppins text-[#7B6F72]">
              {data?.exercises?.length} Exercises
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
          </Animated.View>

          {isCurrentWorkoutActive && (
            <Animated.View entering={ZoomIn} className="flex-col gap-5">
              <GradientButton
                size="full"
                colors={["#F2EA00", "#FF6F00"]}
                handleSubmit={finishWorkoutHandler}
                title="Finish Workout"
              />

              <GradientButton
                size="full"
                colors={["#D62828", "#D62828"]}
                handleSubmit={stopWorkoutHandler}
                title="Stop Workout"
              />
            </Animated.View>
          )}
        </View>
      )}
    </WorkoutContext.Provider>
  );
};

export default WorkoutDetailsScreen;
