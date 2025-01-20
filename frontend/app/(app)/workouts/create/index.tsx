import { Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import ScheduleAccordion from "@/components/custom/Workouts/ScheduleAccordion";
import ExerciseTable from "@/components/custom/Workouts/ExerciseTable";
import { WorkoutContext } from "@/context/WorkoutContext";
import useWorkoutDetails from "@/hooks/workout";
import { router, useLocalSearchParams } from "expo-router";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const WorkoutDetailsScreen = () => {
  const params = useLocalSearchParams();
  const [isWorkoutEditable, setIsWorkoutEditable] = useState<boolean>(true);
  const exercises = useSelector((state: RootState) => state.exercises);

  const {
    newData,
    data,
    setData,
    addSetHandler,
    specialTypeHandler,
    workoutInputHandler,
    deleteSetHandler,
    deleteExerciseHandler,
    clearWorkoutHandler,
    changeDateHandler,
  } = useWorkoutDetails();

  useEffect(() => {
    setData({
      id: 1,
      name: "fullbody workout",
      timeOfWorkout: 32,
      days: ["Monday"],
      numberOfExercises: 11,
      exercises: [],
    });

    if (exercises.length > 0) {
      setData({
        ...data,
        exercises: exercises,
      });
    }
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        specialTypeHandler,
        workoutInputHandler,
        deleteSetHandler,
        deleteExerciseHandler,
        isWorkoutEditable,
        addSetHandler,
      }}
    >
      <View className="px-8 flex-col gap-7">
        <View>
          <View className="mb-1 flex-row items-center justify-between">
            <Text className="capitalize font-poppinsBold text-2xl ">
              {data?.name}
            </Text>

            {!isWorkoutEditable ? (
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="font-poppinsSemiBold text-lg text-[#F77F00]">
                  Edit
                </Text>
              </TouchableOpacity>
            ) : (
              <GradientButtonComponent
                size={"sm"}
                title={"Clear"}
                handleSubmit={() => clearWorkoutHandler()}
              />
            )}
          </View>
          <Text className="font-poppins text-[#7B6F72]">
            {data?.exercises.length} Exercises | {data?.timeOfWorkout} mins
          </Text>
        </View>

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
                params: { type: "exercise" },
              })
            }
          />
          <GradientButtonComponent
            size={"md"}
            title="Add Superset"
            handleSubmit={() =>
              router.push({
                pathname: "/workouts/search",
                params: { type: "superset" },
              })
            }
          />
        </View>

        <GradientButtonComponent
          size={"full"}
          title={"Create Plan"}
          handleSubmit={() => console.log("submit")}
        />
      </View>
    </WorkoutContext.Provider>
  );
};

export default WorkoutDetailsScreen;
