import { Text, View } from "react-native";
import StepIcon from "@/assets/icons/step.svg";
import LineIcon from "@/assets/images/line.svg";

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
  return (
    <View>
      <View className="flex-row items-center justify-between mb-5">
        <Text className="capitalize font-poppinsSemiBold text-xl">
          How to do it
        </Text>
        <Text className="font-poppins capitalize text-[#ADA4A5] text-base">
          {steps.length} steps
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
