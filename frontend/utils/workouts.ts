const useSortedWorkouts = (workoutsArr: Array<any>) => {
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

export default useSortedWorkouts;
