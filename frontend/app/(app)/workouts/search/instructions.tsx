import { Image, ScrollView, Text, View } from "react-native";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import InstructionsSteps from "@/components/custom/Workouts/Search/InstructionsSteps";
import GradientButton from "@/components/custom/Button/GradientButton";
import { useLayout } from "@/context/LayoutContext";
import { useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";

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
  const { setShowBackButton } = useLayout();

  useEffect(() => {
    setShowBackButton(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowBackButton(false);
      };
    }, []),
  );

  const { data, isFetching } = useQuery({
    queryKey: ["exerciseDetails", params?.id],
    queryFn: () => apiFetch(`/exercises/${params?.id}/details`),
    enabled: !!params?.id,
  });

  return (
    <ScrollView contentContainerClassName="gap-16 px-7 pb-32">
      {isFetching ? (
        <Spinner color={"#F77F00"} />
      ) : (
        <>
          <View className="flex-col gap-7">
            <View className="gap-1">
              <Text className="capitalize font-poppinsSemiBold text-xl">
                {data?.exercise?.name}
              </Text>
              <Text className="font-poppins capitalize text-[#7B6F72] text-lg">
                {data?.exercise?.target_muscles} | {data?.exercise?.equipments}
              </Text>
            </View>

            {data?.exercise?.gif && (
              <Image
                className="h-40 w-40 mx-auto"
                source={{
                  uri: `https://fitup.scriptbase.eu/public/gifs/${data?.exercise?.gif}`,
                }}
              />
            )}
          </View>
          {data?.exercise?.instructions && (
            <InstructionsSteps steps={data?.exercise?.instructions} />
          )}
        </>
      )}

      <GradientButton
        size={"full"}
        title={"Add Exercise"}
        handleSubmit={() => console.log("add")}
      />
    </ScrollView>
  );
};

export default InstructionsPage;
