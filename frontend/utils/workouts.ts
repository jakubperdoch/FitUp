import BackgroundService from "react-native-background-actions";
import { useDispatch, useSelector } from "react-redux";
import { updateTimer } from "@/store/workout";
import { RootState, store } from "@/store/store";

// TODO: Place this file into hooks folder
export const useSortedWorkouts = (workoutsArr: Array<any>) => {
  const daysMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const todayIndex = new Date().getDay();

  const calculateDaysUntil = (currentDayIndex, workoutDayIndex) => {
    return (workoutDayIndex - currentDayIndex + 7) % 7;
  };

  const sortedWorkouts = workoutsArr
    .map((workout) => ({
      ...workout,
      daysUntil: calculateDaysUntil(todayIndex, daysMap[workout?.day]),
    }))
    .sort((a, b) => a.daysUntil - b.daysUntil);

  return { sortedWorkouts };
};

// Define a delay function using a Promise
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

// TODO: fix background counting
export const useWorkoutTimer = () => {
  const { workout } = useSelector((state: RootState) => state.workout);
  const dispatch = useDispatch();

  const options = {
    taskName: "Workout Timer",
    taskTitle: "Workout Timer Running",
    taskDesc: "Your workout timer is active.",
    taskIcon: {
      name: "ic_launcher",
      type: "drawable",
    },
    color: "#ff0000",
    parameters: {
      delay: 1000,
    },
  };

  const timerTask = async (taskData) => {
    const { delay } = taskData;

    while (BackgroundService.isRunning()) {
      const state = store.getState();
      const workout = state.workout.workout;

      if (workout && workout.timer !== null) {
        const newTimer = workout.timer + 1;
        store.dispatch(updateTimer(newTimer));
        console.log(newTimer);
      }
      await sleep(delay);
    }
  };

  const startTimer = async () => {
    await BackgroundService.start(timerTask, options);
  };

  const stopTimer = async () => {
    await BackgroundService.stop();
  };

  return { startTimer, stopTimer };
};
