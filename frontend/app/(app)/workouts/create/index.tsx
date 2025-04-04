import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import ScheduleAccordion from "@/components/custom/Workouts/ScheduleAccordion";
import ExerciseTable from "@/components/custom/Workouts/ExerciseTable";
import { WorkoutContext } from "@/context/WorkoutContext";
import useWorkoutDetails from "@/hooks/workout";
import { router, useLocalSearchParams } from "expo-router";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import GenericIcon from "@/components/custom/Icon";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { setWorkoutPlan } from "@/store/workoutPlan";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "react-i18next";

const WorkoutCreationScreen = () => {
  const params = useLocalSearchParams();
  const [isWorkoutEditable, setIsWorkoutEditable] = useState<boolean>(true);
  const { t } = useTranslation("workouts");
  const workout = useSelector((state: RootState) => state.workoutPlan.workout);
  const dispatch = useDispatch();

  const {
    data,
    setData,
    addSetHandler,
    specialTypeHandler,
    workoutInputHandler,
    deleteSetHandler,
    deleteExerciseHandler,
    clearWorkoutHandler,
    changeDateHandler,
    createWorkoutPlanError,
    createWorkoutPlan,
    updateWorkoutPlanError,
    updateWorkoutPlan,
    onNameChange,
  } = useWorkoutDetails();

  const {
    data: workoutPlan,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["workoutPlanCreate", params.id],
    queryFn: () =>
      apiFetch(`/workouts/plans/${params?.id}/details`, {
        method: "GET",
      }),
    enabled: !!params.id,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (workoutPlan?.workout) {
      dispatch(setWorkoutPlan(workoutPlan?.workout));
    }
  }, [workoutPlan?.workout]);

  const handleWorkoutSubmit = () => {
    if (workout?.id) {
      updateWorkoutPlan(workout);
    } else {
      createWorkoutPlan(workout);
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        specialTypeHandler,
        workoutInputHandler,
        deleteSetHandler,
        deleteExerciseHandler,
        isWorkoutEditable,
        addSetHandler,
        data: data,
      }}
    >
      {isFetching || isLoading ? (
        <Spinner color={"#F77F00"} />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          <Animated.View entering={ZoomIn} className="px-8 flex-col gap-7">
            <View>
              <View className="mb-1 flex-row items-center justify-between">
                <TextInput
                  placeholder={"Enter name of workout"}
                  className="font-poppinsBold text-2xl"
                  placeholderTextColor={"#1D1617"}
                  value={data?.name}
                  onChangeText={(text) => onNameChange(text)}
                  autoCapitalize={"words"}
                  autoCorrect={false}
                  maxLength={15}
                />

                {!isWorkoutEditable && (
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text className="font-poppinsSemiBold text-lg text-[#F77F00]">
                      {t("workoutDetails.editButton", { context: "workouts" })}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text className="font-poppins text-[#7B6F72]">
                {data?.number_of_exercises} Exercises
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => clearWorkoutHandler(workout)}
              className="w-40"
            >
              <Text className="font-poppinsSemiBold  text-lg text-[#F77F00]">
                {t("workoutDetails.clearButton", { context: "workouts" })}
              </Text>
            </TouchableOpacity>

            <ScheduleAccordion
              days={data?.days}
              changeDateHandler={changeDateHandler}
            />

            <ExerciseTable workout={data} />

            <View className="flex-row justify-center gap-8 w-full mt-5 mb-4">
              <GradientButtonComponent
                size={"md"}
                title={t("workoutDetails.addExerciseButton", {
                  context: "workouts",
                })}
                handleSubmit={() =>
                  router.push({
                    pathname: "/workouts/search",
                    params: { type: "exercise", id: params?.id },
                  })
                }
              />
              <GradientButtonComponent
                size={"md"}
                title={t("workoutDetails.addSupersetButton", {
                  context: "workouts",
                })}
                handleSubmit={() =>
                  router.push({
                    pathname: "/workouts/search",
                    params: { type: "superset", id: params?.id },
                  })
                }
              />
            </View>

            {updateWorkoutPlanError && (
              <Animated.View
                entering={ZoomIn}
                exiting={ZoomOut}
                className="flex-col items-center gap-2 justify-center"
              >
                <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
                <Text className="font-poppins text-[#F77F00]">
                  {updateWorkoutPlanError &&
                  updateWorkoutPlanError instanceof Error
                    ? updateWorkoutPlanError.message
                    : String(updateWorkoutPlanError)}
                </Text>
              </Animated.View>
            )}

            {createWorkoutPlanError && (
              <Animated.View
                entering={ZoomIn}
                exiting={ZoomOut}
                className="flex-col items-center gap-2 justify-center"
              >
                <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
                <Text className="font-poppins text-[#F77F00]">
                  {createWorkoutPlanError instanceof Error
                    ? createWorkoutPlanError.message
                    : String(createWorkoutPlanError)}
                </Text>
              </Animated.View>
            )}

            <GradientButtonComponent
              disabled={
                !workout.exercises ||
                workout?.exercises?.length === 0 ||
                workout?.days?.length === 0
              }
              size={"full"}
              title={
                workout?.id
                  ? t("workoutDetails.updateWorkoutButton", {
                      context: "workouts",
                    })
                  : t("workoutDetails.createWorkoutButton", {
                      context: "workouts",
                    })
              }
              handleSubmit={() => handleWorkoutSubmit()}
            />
          </Animated.View>
        </ScrollView>
      )}
    </WorkoutContext.Provider>
  );
};

export default WorkoutCreationScreen;
