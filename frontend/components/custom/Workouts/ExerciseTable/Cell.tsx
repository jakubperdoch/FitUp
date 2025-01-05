import { Text, TouchableOpacity, View } from "react-native";
import GenericIcon from "@/components/custom/Icon";

type WorkoutExercise = Exercise | Superset;

interface ExerciseTableCellProps {
  index: number;
  exercise: WorkoutExercise;
}

const ExerciseTableCell = ({ exercise, index }: ExerciseTableCellProps) => {
  if (exercise.type === "exercise") {
    return (
      <View className="border-b mb-4 border-black/20 ">
        <Text className="font-poppins text-[#F77F00] text-lg">{index + 1}</Text>
        <Text className="text-xl capitalize font-poppinsMedium mb-6">
          {exercise.name}
        </Text>

        <View className="flex-row mb-6">
          <Text>Set</Text>
          <View className="flex-row ms-auto w-2/4 gap-10">
            <Text className="font-poppins w-16">Reps</Text>
            <Text className="font-poppins w-16">Weight</Text>
            <Text className="font-poppins w-16"></Text>
          </View>
        </View>

        {exercise.sets.map((set, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            className="flex-row items-center mb-4"
          >
            <Text className="font-poppins text-lg" numberOfLines={1}>
              Set {index + 1}
            </Text>
            {set.specialType && (
              <Text className="font-poppins ms-3 text-lg text-black/50">
                {set.specialType}
              </Text>
            )}

            <View className="flex-row items-center justify-end gap-5 w-2/4 ms-auto">
              <View className="bg-[#F7F8F8] w-14 py-1 px-2 items-end rounded-lg">
                <Text
                  className="font-poppins text-[#F77F00] text-lg"
                  numberOfLines={1}
                >
                  {set.reps ? set.reps : "reps"}
                </Text>
              </View>

              <View className="bg-[#F7F8F8] w-14 items-end py-1 px-2 overflow-scroll rounded-lg">
                <Text
                  className="font-poppins text-[#F77F00] text-lg"
                  numberOfLines={1}
                >
                  {set.weight ? set.weight : "kg"}
                </Text>
              </View>

              <TouchableOpacity className="py-1 px-2">
                <GenericIcon name={"Ellipsis"} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
};

export default ExerciseTableCell;
