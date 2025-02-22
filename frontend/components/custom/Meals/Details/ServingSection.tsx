import { Text, View } from "react-native";
import ServingInputComponent from "@/components/custom/Inputs/ServingInput";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("meals");

  return (
    <View className="mt-10 mx-6 flex flex-row items-center  justify-between">
      <Text className="font-semibold font-poppins  text-2xl">
        {t("servinSize", { context: "meals" })}
      </Text>
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
