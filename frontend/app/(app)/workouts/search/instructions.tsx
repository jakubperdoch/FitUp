import { Image, Text, View } from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { WorkoutContext } from "@/context/WorkoutContext";
import InstructionsSteps from "@/components/custom/Workouts/Search/InstructionsSteps";
import GradientButton from "@/components/custom/Button/GradientButton";

const Data: ExerciseDetails = {
  type: "exercise",
  exercise_id: "2gPfomN",
  name: "3/4 sit-up",
  gifUrl: "2gPfomN.gif",
  targetMuscles: ["abs"],
  bodyParts: ["waist"],
  equipments: ["body weight"],
  secondaryMuscles: ["hip flexors", "lower back"],
  instructions: [
    "Step:1 Lie flat on your back with your knees bent and feet flat on the ground.",
    "Step:2 Place your hands behind your head with your elbows pointing outwards.",
    "Step:3 Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
    "Step:4 Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
    "Step:5 Repeat for the desired number of repetitions.",
  ],
};
const InstructionsPage = () => {
  const params = useLocalSearchParams();

  const [data, setData] = useState<ExerciseDetails | null>(null);
  const [exerciseId, setExerciseId] = useState<string | null>(null);

  useEffect(() => {
    if (params.exerciseId) {
      if (Array.isArray(params.exerciseId)) {
        setExerciseId(params.exerciseId[0]);
      } else {
        setExerciseId(params.exerciseId);
      }

      setData(Data);
    }
  }, []);

  return (
    <View className="px-7 gap-16">
      <View className="flex-row items-start justify-between">
        <View className="gap-2">
          <Text className="capitalize font-poppinsSemiBold text-xl">
            {data?.name}
          </Text>
          <Text className="font-poppins capitalize text-[#7B6F72] text-lg">
            {data?.targetMuscles} | {data?.equipments}
          </Text>
        </View>

        <Image
          className="h-24 w-40"
          source={require(`@/assets/animations/gifs/2gPfomN.gif`)}
        />
      </View>

      {data?.instructions && <InstructionsSteps steps={data?.instructions} />}

      <GradientButton
        size={"full"}
        title={"Add Exercise"}
        handleSubmit={() => console.log("add")}
      />
    </View>
  );
};

export default InstructionsPage;
