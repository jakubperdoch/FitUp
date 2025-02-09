import { Text, View } from "react-native";
import ServingInputComponent from "@/components/custom/Inputs/ServingInput";

interface ComponentProps {
  data: any;
  selectedServingType: any;
  setSelectedServingType: any;
  servingAmount: number;
  setServingAmount: any;
}

const ServingSectionComponent = ({
  data,
  servingAmount,
  setServingAmount,
  setSelectedServingType,
  selectedServingType,
}: ComponentProps) => {
  return (
    <View className="mt-10 mx-6 flex flex-row items-center  justify-between">
      <Text className="font-semibold font-poppins  text-2xl">Serving Size</Text>
      <ServingInputComponent
        setSelectedServingType={setSelectedServingType}
        selectedServingType={selectedServingType}
        servingAmount={servingAmount}
        servingTypes={data?.meal?.servings}
        setServingAmount={setServingAmount}
      />
    </View>
  );
};

export default ServingSectionComponent;
