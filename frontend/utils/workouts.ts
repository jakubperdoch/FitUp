import BackgroundService from "react-native-background-actions";

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

// export const workoutTimer = () => {
//   const options = {
//     taskName: "Workout Timer",
//     taskTitle: "Workout Timer Running",
//     taskDesc: "Your workout timer is active.",
//     taskIcon: {
//       name: "ic_launcher",
//       type: "drawable",
//     },
//     color: "#ff0000",
//     parameters: {
//       delay: 1000,
//     },
//   };
//
//   const timerTask = async (taskData) => {
//     const { delay } = taskData;
//
//     while (BackgroundService.isRunning()) {
//       await new Promise((resolve) => setTimeout(resolve, delay));
//     }
//   };
//
//   const startTimer = async () => {
//     await BackgroundService.start(timerTask, options);
//   };
//
//   const stopTimer = async () => {
//     await BackgroundService.stop();
//   };
//
//   return { startTimer, stopTimer };
// };
