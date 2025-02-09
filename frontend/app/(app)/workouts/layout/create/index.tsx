import { Text, TouchableOpacity, View, TextInput } from "react-native";
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

const WorkoutCreationScreen = () => {
  const params = useLocalSearchParams();
  const [isWorkoutEditable, setIsWorkoutEditable] = useState<boolean>(true);

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
    queryKey: ["workoutPlan", params.id],
    queryFn: () =>
      apiFetch(`/workouts/plans/${params?.id}/details`, {
        method: "GET",
      }),
    enabled: !!params.id,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (params?.id && !workout?.id) {
      dispatch(setWorkoutPlan(workoutPlan?.workout));
      setData(workoutPlan?.workout);
    }
  }, [workoutPlan?.workout]);

  const handleWorkoutSubmit = () => {
    if (params?.id) {
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
                    Edit
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <Text className="font-poppins text-[#7B6F72]">
              {data?.exercises?.length} Exercises
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => clearWorkoutHandler()}
            className="w-40"
          >
            <Text className="font-poppinsSemiBold  text-lg text-[#F77F00]">
              Clear Workout
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
              title="Add Exercise"
              handleSubmit={() =>
                router.push({
                  pathname: "/workouts/search",
                  params: { type: "exercise", id: params?.id },
                })
              }
            />
            <GradientButtonComponent
              size={"md"}
              title="Add Superset"
              handleSubmit={() =>
                router.push({
                  pathname: "/workouts/search",
                  params: { type: "superset", id: params?.id },
                })
              }
            />
          </View>

          {(createWorkoutPlanError || updateWorkoutPlanError) && (
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

                {updateWorkoutPlanError instanceof Error
                  ? updateWorkoutPlanError.message
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
            title={workout?.id ? "Update Workout" : "Create Workout"}
            handleSubmit={() => handleWorkoutSubmit()}
          />
        </Animated.View>
      )}
    </WorkoutContext.Provider>
  );
};

export default WorkoutCreationScreen;
