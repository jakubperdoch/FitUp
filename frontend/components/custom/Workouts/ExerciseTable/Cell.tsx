import { Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import ActionSheetComponent from "@/components/custom/ActionSheet";
import GenericIcon from "@/components/custom/Icon";
import SpecialTypeActionSheet from "@/components/custom/Workouts/ExerciseTable/SpecialTypeActionSheet";
import ExerciseModalComponent from "@/components/custom/Workouts/ExerciseTable/Modal";
import { WorkoutContext } from "@/context/WorkoutContext";

interface ExerciseTableCellProps {
  exercise: Exercise;
  exerciseIndex: number;
  superSetIndex?: number;
}

interface SetType {
  reps: number;
  weight: number;
  specialType: string;
}

const ExerciseTableCell = (props: ExerciseTableCellProps) => {
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeSet, setActiveSet] = useState<Partial<SetType> | null>(null);
  const { deleteExerciseHandler, isWorkoutEditable } =
    useContext(WorkoutContext);

  const handleSetPress = (set: Partial<SetType>) => {
    setActiveSet(set);
    setShowModal(true);
  };

  return (
    <>
      <View className="flex-row items-center  justify-between mb-6">
        <Text className="text-xl capitalize font-poppinsMedium ">
          {props.exercise.name}
        </Text>

        {isWorkoutEditable && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => deleteExerciseHandler(props.exerciseIndex)}
          >
            <GenericIcon name={"Trash"} size={20} color={"#F77F00"} />
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row mb-6">
        <Text className="font-poppins text-sm text-black/50">Set</Text>
        <View
          className={`flex-row ms-auto gap-10 ${isWorkoutEditable ? "w-2/4" : ""}`}
        >
          <Text className="font-poppins text-sm text-black/50">Reps</Text>
          <Text className="font-poppins text-sm text-black/50">Weight</Text>
        </View>
      </View>

      {props.exercise.sets.map((set, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={index}
          onPress={() => {
            handleSetPress(set);
            setActiveIndex(index);
          }}
          className="flex-row items-center mb-4"
        >
          <Text className="font-poppins text-lg" numberOfLines={1}>
            Set {index + 1}
          </Text>
          {set.specialType && set.specialType !== "normal" && (
            <Text className="font-poppins ms-3 text-lg capitalize  text-black/50">
              {set.specialType}
            </Text>
          )}

          <View className="flex-row  items-center justify-end gap-5  ms-auto">
            <View className="bg-[#F7F8F8] w-16 py-1 px-2 items-end rounded-lg">
              <Text
                className="font-poppins text-[#F77F00] text-lg"
                numberOfLines={1}
              >
                {set.reps ? set.reps : "reps"}
              </Text>
            </View>

            <View className="bg-[#F7F8F8] w-16 items-end py-1 px-2 overflow-scroll rounded-lg">
              <Text
                className="font-poppins text-[#F77F00] text-lg"
                numberOfLines={1}
              >
                {set.weight ? set.weight : "kg"}
              </Text>
            </View>

            {isWorkoutEditable && (
              <TouchableOpacity
                className="py-1 px-2"
                onPress={() => {
                  setActiveIndex(index);
                  setIsActionSheetVisible(true);
                }}
              >
                <GenericIcon name={"Ellipsis"} />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      ))}

      {activeSet && (
        <ExerciseModalComponent
          setIndex={activeIndex}
          exerciseIndex={props.exerciseIndex}
          superSetIndex={props.superSetIndex}
          numberValue={[activeSet.reps, activeSet.weight]}
          showModal={showModal}
          setShowModal={() => setShowModal(false)}
        />
      )}

      <SpecialTypeActionSheet
        setIndex={activeIndex}
        exerciseIndex={props.exerciseIndex}
        superSetIndex={props.superSetIndex}
        setIsActive={setIsActionSheetVisible}
        isActive={isActionSheetVisible}
      />
    </>
  );
};

export default ExerciseTableCell;
