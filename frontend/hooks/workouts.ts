import BackgroundService from "react-native-background-actions";
import { updateTimer } from "@/store/workout";
import { store } from "@/store/store";

// TODO: Place this file into hooks folder
export const useSortedWorkouts = (workoutsArr: Array<any>) => {
  const daysMap = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
  };

  const todayIndex = new Date().getDay();

  const calculateDaysUntil = (currentDayIndex, workoutDayIndex) => {
    return (workoutDayIndex - currentDayIndex + 7) % 7;
  };

  return workoutsArr
    .map((workout) => ({
      ...workout,
      daysUntil: calculateDaysUntil(todayIndex, daysMap[workout?.day]),
    }))
    .sort((a, b) => a.daysUntil - b.daysUntil);
};

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

export const useWorkoutTimer = () => {
  const options = {
    taskName: "Workout Timer",
    taskTitle: "Workout Timer Running",
    taskDesc: "Your workout timer is active.",
    taskIcon: {
      name: "ic_launcher",
      type: "mipmap",
    },
    color: "#ff0000",
    parameters: {
      delay: 1000,
    },
    channelId: "workout-timer-channel",
    channelName: "Workout Timer Channel",
    foregroundServiceType: "dataSync",
  };

  const timerTask = async (taskData) => {
    const { delay } = taskData;

    while (BackgroundService.isRunning()) {
      const state = store.getState();
      const workout = state.workout.workout;

      if (workout && workout.timer !== null) {
        const newTimer = workout.timer + 1;
        store.dispatch(updateTimer(newTimer));
      }
      await sleep(delay);
    }
  };

  const startTimer = async () => {
    await BackgroundService.start(timerTask, options).catch((err) =>
      console.log(err),
    );
  };

  const stopTimer = async () => {
    await BackgroundService.stop().catch((err) => console.log(err));
  };

  return { startTimer, stopTimer };
};
