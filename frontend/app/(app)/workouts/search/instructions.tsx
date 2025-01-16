import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

const Data: ExerciseDetails = {
  type: "exercise",
  exerciseId: "2gPfomN",
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
  const [exerciseId, setExerciseId] = useState<string | null>(null);
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.exerciseId) {
      if (Array.isArray(params.exerciseId)) {
        setExerciseId(params.exerciseId[0]);
      } else {
        setExerciseId(params.exerciseId);
      }
    }
  }, []);

  return (
    <View>
      <Text>Instructions</Text>
    </View>
  );
};

export default InstructionsPage;
