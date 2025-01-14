import ActionSheetComponent from "@/components/custom/ActionSheet";
import { Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { WorkoutContext } from "@/context/WorkoutContext";

interface ComponentProps {
  exerciseIndex: number;
  superSetIndex: number;
  setIndex: number;
  setIsActive: any;
  isActive: boolean;
}

const SpecialTypeActionSheetComponent = (props: ComponentProps) => {
  const { specialTypeHandler, deleteSetHandler } = useContext(WorkoutContext);

  const specialTypeActions = [
    {
      name: "Mark as normal",
      action: "normal",
    },
    {
      name: "Mark as warmup",
      action: "warmup",
    },
    {
      name: "Mark as failure set",
      action: "failureSet",
    },
    {
      name: "Mark as drop set",
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
        <Text className="font-poppins text-red-700">Delete Set</Text>
      </TouchableOpacity>
    </ActionSheetComponent>
  );
};

export default SpecialTypeActionSheetComponent;
