import ActionSheetComponent from "@/components/custom/ActionSheet";
import { Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { WorkoutContext } from "@/context/WorkoutContext";
import { useTranslation } from "react-i18next";

interface ComponentProps {
  exerciseIndex: number;
  superSetIndex: number;
  setIndex: number;
  setIsActive: any;
  isActive: boolean;
}

const SpecialTypeActionSheetComponent = (props: ComponentProps) => {
  const { specialTypeHandler, deleteSetHandler } = useContext(WorkoutContext);
  const { t } = useTranslation("workouts");

  const specialTypeActions = [
    {
      name: t("workoutDetails.specialTypes.normal", { context: "workouts" }),
      action: "normal",
    },
    {
      name: t("workoutDetails.specialTypes.warmup", { context: "workouts" }),
      action: "warmup",
    },
    {
      name: t("workoutDetails.specialTypes.failure", { context: "workouts" }),
      action: "failureSet",
    },
    {
      name: t("workoutDetails.specialTypes.dropset", { context: "workouts" }),
      action: "dropSet",
    },
  ];

  return (
    <ActionSheetComponent
      showActionsheet={props.isActive}
      closeHandler={() => props.setIsActive(false)}
    >
      {specialTypeActions.map((action, index) => (
        <TouchableOpacity
          key={index}
          className="p-3 mb-1"
          onPress={() =>
            specialTypeHandler(
              props.exerciseIndex,
              props.setIndex,
              props.superSetIndex,
              action.action,
            )
          }
        >
          <Text
            className={`font-poppins ${action.action == "delete" ? "text-red-700" : ""}`}
          >
            {action.name}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        className="mb-5"
        onPress={() =>
          deleteSetHandler(
            props.exerciseIndex,
            props.setIndex,
            props.superSetIndex,
          )
        }
      >
        <Text className="font-poppins text-red-700">
          {t("workoutDetails.specialTypes.delete", { context: "workouts" })}
        </Text>
      </TouchableOpacity>
    </ActionSheetComponent>
  );
};

export default SpecialTypeActionSheetComponent;
