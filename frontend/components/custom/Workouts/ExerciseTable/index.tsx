import { Text, View } from "react-native";
import ExerciseTableCell from "@/components/custom/Workouts/ExerciseTable/Cell";
import { useTranslation } from "react-i18next";
type ComponentProps = {
  workout: Partial<WorkoutDetails>;
};

const ExerciseTableComponent = ({ workout }: ComponentProps) => {
  const { t } = useTranslation("workouts");

  return (
    <View>
      <Text className="font-poppinsSemiBold text-2xl mb-6">
        {t("workoutDetails.exercises", { context: "workouts" })}
      </Text>

      {workout?.exercises?.length > 0 ? (
        workout.exercises.map((exercise, exerciseIndex) =>
          exercise?.type === "exercise" ? (
            <View
              className="border-b mb-4 border-black/20 "
              key={exerciseIndex}
            >
              <Text className="font-poppins text-[#F77F00] text-lg">
                {exerciseIndex + 1}
              </Text>
              <ExerciseTableCell
                exerciseIndex={exerciseIndex}
                exercise={exercise}
              />
            </View>
          ) : (
            <View className="border-b mb-4 border-black/20" key={exerciseIndex}>
              <Text className="font-poppins text-[#F77F00] text-lg">
                {exerciseIndex + 1}{" "}
                {t("workoutDetails.superset", { context: "workouts" })}
              </Text>
              {exercise.exercises.map((exercise, superSetIndex) => (
                <View className="mb-4" key={superSetIndex}>
                  <ExerciseTableCell
                    superSetIndex={superSetIndex}
                    exerciseIndex={exerciseIndex}
                    exercise={exercise}
                  />
                </View>
              ))}
            </View>
          ),
        )
      ) : (
        <Text className="font-poppins text-[#7B6F72] text-center text-lg">
          {t("workoutDetails.empty.workoutPlan", { context: "workouts" })}
        </Text>
      )}
    </View>
  );
};

export default ExerciseTableComponent;
