import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import { useEffect, useState } from "react";
import GenericIcon from "@/components/custom/Icon";

type ComponentProps = {
  numberValue: number;
  type: string;
  exerciseIndex: number;
  superSetIndex: number;
  setIndex: number;
  workoutInputHandler: (
    exerciseIndex: number,
    setIndex: number,
    superSetIndex: number,
    repsValue?: number,
    weightValue?: number,
  ) => void;
};

const DigitInputComponent = ({
  numberValue,
  type,
  exerciseIndex,
  superSetIndex,
  setIndex,
  workoutInputHandler,
}: ComponentProps) => {
  const [number, setNumber] = useState<number>(numberValue ?? 0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNumber(numberValue ?? 0);
  }, [numberValue]);

  const updateNumber = (newValue: number) => {
    const clampedNumber =
      type === "Reps"
        ? Math.max(0, Math.min(Math.round(newValue), 900))
        : parseFloat(Math.max(0, Math.min(newValue, 900)).toFixed(1));

    setNumber(clampedNumber);

    if (type === "Reps") {
      workoutInputHandler(
        exerciseIndex,
        setIndex,
        superSetIndex,
        clampedNumber,
      );
    } else if (type === "Weight") {
      workoutInputHandler(
        exerciseIndex,
        setIndex,
        superSetIndex,
        undefined,
        clampedNumber,
      );
    }
  };

  const handleInputChange = (text: string) => {
    let sanitized = text.replace(/[^0-9]/g, "");
    if (type === "Weight") {
      sanitized = text.replace(/[^0-9.]/g, "");
    }
    const parsedNumber = parseFloat(sanitized) || 0;

    const clampedNumber = Math.min(Math.max(parsedNumber, 0), 900);
    setNumber(type === "Reps" ? Math.round(clampedNumber) : clampedNumber); // Ensure integer for "Reps"

    if (type === "Reps") {
      workoutInputHandler(
        exerciseIndex,
        setIndex,
        superSetIndex,
        Math.round(clampedNumber),
      );
    } else if (type === "Weight") {
      workoutInputHandler(
        exerciseIndex,
        setIndex,
        superSetIndex,
        undefined,
        clampedNumber,
      );
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    setNumber((prev) =>
      type === "Reps" ? Math.round(prev) : parseFloat(prev.toFixed(1)),
    );
  };

  const handleInputFocus = () => {
    setIsEditing(true);
  };

  return (
    <View className="items-center gap-2">
      <Text className="font-poppins">{type}</Text>

      <View className="flex-row items-center justify-between w-3/4">
        <TouchableOpacity
          className="bg-[#7B6F72]/20 p-3 rounded-xl"
          onPress={() => updateNumber(number - (type === "Reps" ? 1 : 0.1))}
        >
          <GenericIcon name="Minus" />
        </TouchableOpacity>

        <TextInput
          keyboardType="number-pad"
          className="text-lg font-poppins"
          returnKeyType="done"
          value={
            isEditing
              ? number.toString()
              : type === "Reps"
                ? Math.round(number).toString()
                : number.toFixed(1)
          }
          onSubmitEditing={() => Keyboard.dismiss()}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(text) => handleInputChange(text)}
        />

        <TouchableOpacity
          className="bg-[#7B6F72]/20 p-3 rounded-xl"
          onPress={() => updateNumber(number + (type === "Reps" ? 1 : 0.1))}
        >
          <GenericIcon name="Plus" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DigitInputComponent;
