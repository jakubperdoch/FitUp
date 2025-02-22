import { Text, View } from "react-native";
import StepIcon from "@/assets/icons/step.svg";
import LineIcon from "@/assets/images/line.svg";
import { useTranslation } from "react-i18next";

interface ComponentProps {
  steps: string[];
}

const parseStep = (step: string) => {
  const regex = /^Step[:\-]?(\d+)\s+(.*)$/i;
  const match = step.match(regex);

  if (match) {
    const stepNumber = `Step ${match[1]}`;
    const stepContent = match[2];
    return { stepNumber, stepContent };
  }

  return { stepNumber: "Step", stepContent: step };
};

const InstructionsStepsComponent = ({ steps }: ComponentProps) => {
  const { t } = useTranslation("workouts");

  return (
    <View>
      <View className="flex-row items-center justify-between mb-5">
        <Text className="capitalize font-poppinsSemiBold text-xl">
          {t("search.howTo", {
            context: "workouts",
          })}
        </Text>
        <Text className="font-poppins capitalize text-[#ADA4A5] text-base">
          {steps.length}{" "}
          {t("search.steps", {
            context: "workouts",
          })}
        </Text>
      </View>

      {steps.map((step, index) => {
        const { stepNumber, stepContent } = parseStep(step);
        const isLastStep = index === steps.length - 1;

        return (
          <View key={index} className="flex-row items-start gap-3 mb-2">
            <View className="flex-col items-center mt-1 gap-2">
              <StepIcon />
              {!isLastStep && <LineIcon />}
            </View>

            <View className="flex-col w-full">
              <Text className="font-poppins text-lg text-[#F77F00]">
                {stepNumber}
              </Text>

              <Text className="w-3/4 font-poppins text-base text-[#ADA4A5]">
                {stepContent}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default InstructionsStepsComponent;
