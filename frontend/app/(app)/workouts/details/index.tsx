import { Text, View, Alert } from "react-native";
import { useState } from "react";
import ScheduleAccordion from "@/components/custom/Workouts/ScheduleAccordion";
import ExerciseTable from "@/components/custom/Workouts/ExerciseTable";
import GradientButton from "@/components/custom/Button/GradientButton";
import { WorkoutContext } from "@/context/WorkoutContext";
import { useDispatch, useSelector } from "react-redux";
import { setWorkout, clearWorkout, setTimer } from "@/store/workout";
import { useWorkoutTimer } from "@/hooks/workouts";
import { RootState } from "@/store/store";
import Animated, { ZoomIn } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const WorkoutDetailsScreen = () => {
  const dispatch = useDispatch();
  const { startTimer, stopTimer } = useWorkoutTimer();
  const { workout, isTimerActive } = useSelector(
    (state: RootState) => state.workout,
  );

  const [data, setData] = useState<WorkoutDetails>({
    id: 1,
    name: "fullbody workout",
    timeOfWorkout: 32,
    days: ["Monday"],
    numberOfExercises: 11,
    exercises: [
      {
        type: "exercise",
        exerciseId: "guT8YnS",
        name: "biceps pull-up",
        sets: [{ weight: 100 }, { reps: 8 }, { reps: 12, weight: 110 }],
      },
      {
        type: "exercise",
        exerciseId: "NbVPDMW",
        name: "dumbbell biceps curl",
        sets: [
          { reps: 10, weight: 100, specialType: "Warmup" },
          { reps: 8, weight: 120 },
          { reps: 12, weight: 110 },
        ],
      },
      {
        type: "superset",
        exercises: [
          {
            type: "exercise",
            exerciseId: "NbVPDMW",
            name: "dumbbell biceps curl",
            sets: [
              { reps: 10, weight: 100, specialType: "failure set" },
              { reps: 8, weight: 120 },
              { reps: 12, weight: 110, specialType: "Drop set" },
            ],
          },
          {
            type: "exercise",
            exerciseId: "guT8YnS",
            name: "biceps pull-up",
            sets: [{ weight: 100 }, { reps: 8 }, { reps: 12, weight: 110 }],
          },
        ],
      },
    ],
  });

  const changeDateHandler = (newValue: string) => {
    if (data?.days.includes(newValue)) {
      const daysArr = data.days.filter((day) => day !== newValue);

      setData((prevState) => ({
        ...prevState,
        days: daysArr,
      }));
    } else {
      const daysArr = [...data?.days];
      daysArr.push(newValue);

      setData((prevState) => ({
        ...prevState,
        days: daysArr,
      }));
    }
  };

  const updateSets = (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number | null,
    callback: (sets: any[]) => any[],
  ) => {
    setData((prevState) => {
      const exercises = [...prevState.exercises];
      const selectedExercise = { ...exercises[exerciseIndex] };

      if (selectedExercise.type === "superset" && superSetIndex !== null) {
        const supersetExercise = {
          ...selectedExercise.exercises[superSetIndex],
        };
        supersetExercise.sets = callback([...supersetExercise.sets]);
        selectedExercise.exercises[superSetIndex] = supersetExercise;
      } else if (selectedExercise.type === "exercise") {
        selectedExercise.sets = callback([...selectedExercise.sets]);
      }

      exercises[exerciseIndex] = selectedExercise;
      return { ...prevState, exercises };
    });
  };

  const specialTypeHandler = (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number | null,
    specialType: string,
  ) => {
    updateSets(exerciseIndex, setIndex, superSetIndex, (sets) => {
      if (specialType === "normal") {
        delete sets[setIndex].specialType;
      } else {
        sets[setIndex].specialType = specialType;
      }
      return sets;
    });
  };

  const deleteSetHandler = (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number | null,
  ) => {
    Alert.alert("Delete Set", "Are you sure you want to delete this set?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          updateSets(exerciseIndex, setIndex, superSetIndex, (sets) => {
            sets.splice(setIndex, 1);
            return sets;
          });
        },
      },
    ]);
  };

  const deleteExerciseHandler = (exerciseIndex: number) => {
    Alert.alert(
      "Delete Exercise",
      "Are you sure you want to delete this exercise?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setData((prevState) => {
              const exercises = [...prevState.exercises];
              exercises.splice(exerciseIndex, 1);
              return { ...prevState, exercises };
            });
          },
        },
      ],
    );
  };

  const workoutInputHandler = (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number | null,
    repsValue?: number,
    weightValue?: number,
  ) => {
    updateSets(exerciseIndex, setIndex, superSetIndex, (sets) => {
      sets[setIndex] = {
        ...sets[setIndex],
        reps: repsValue ?? sets[setIndex].reps,
        weight: weightValue ?? sets[setIndex].weight,
      };
      return sets;
    });
  };

  const isCurrentWorkoutActive = isTimerActive && workout?.id === data.id;
  const isOtherWorkoutActive = isTimerActive && workout.id !== data.id;

  const buttonTitleHandler = () => {
    if (isCurrentWorkoutActive) {
      return "Pause Workout";
    } else if (!isCurrentWorkoutActive && workout?.timer > 0) {
      return "Resume Workout";
    } else {
      return "Start Workout";
    }
  };

  const buttonStateHandler = async () => {
    if (isOtherWorkoutActive) {
      Alert.alert(
        "Workout Active",
        "Another workout is already active. Please finish or stop the current workout before starting a new one.",
      );
      return;
    }

    if (isTimerActive && workout.id !== data.id) {
      return;
    }

    if (isCurrentWorkoutActive) {
      await stopTimer();
      dispatch(setTimer(false));
    } else {
      if (!workout) {
        dispatch(setWorkout(data));
      }
      await startTimer();
      dispatch(setTimer(true));
    }
  };

  const stopWorkoutHandler = async () => {
    dispatch(clearWorkout());
    dispatch(setTimer(false));
    await stopTimer();
  };

  const finishWorkoutHandler = async (isTimerClear: boolean) => {
    if (!workout) {
      return;
    }
    if (isTimerClear) {
      setData((prevState) => ({
        ...prevState,
        timer: 0,
      }));
    }
    await stopTimer();
    dispatch(setTimer(false));
    dispatch(clearWorkout());
  };

  return (
    <WorkoutContext.Provider
      value={{
        specialTypeHandler,
        workoutInputHandler,
        deleteSetHandler,
        deleteExerciseHandler,
      }}
    >
      <View className="px-8 flex-col gap-7">
        <View>
          <Text className="capitalize font-poppinsBold text-2xl mb-1">
            {data?.name}
          </Text>
          <Text className="font-poppins text-[#7B6F72]">
            {data?.exercises.length} Exercises | {data?.timeOfWorkout} mins
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
    </WorkoutContext.Provider>
  );
};

export default WorkoutDetailsScreen;
