import { View, Text, TouchableOpacity, TextInput } from "react-native";
import ActionSheetComponent from "../ActionSheet";
import { SetStateAction, useState, Dispatch } from "react";

interface ServingType {
  serving_id: string;
  serving_description: string;
  metric_serving_amount: string;
  metric_serving_unit: string;
}

interface ComponentProps {
  servingTypes: ServingType[];
  servingAmount: number;
  selectedServingType: ServingType;
  setSelectedServingType: Dispatch<SetStateAction<object>>;
  setServingAmount: Dispatch<SetStateAction<number>>;
}

const ServingInputComponent = (props: ComponentProps) => {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);
  const [inputValue, setInputValue] = useState(props.servingAmount.toString());

  const modifiedServingUnit = (type: ServingType) =>
    type.serving_description.replace(/\s*\([^)]*\)/g, "");

  const handleBlur = () => {
    const amount = parseFloat(inputValue);
    let validatedAmount = amount;

    if (isNaN(amount)) {
      validatedAmount = 1;
    }

    if (validatedAmount <= 0) {
      validatedAmount = 1;
    } else if (validatedAmount > 255) {
      validatedAmount = 255;
    }

    props.setServingAmount(validatedAmount);
    setInputValue(validatedAmount.toString());
  };

  return (
    <>
      <View className="flex flex-row items-center h-14">
        <TextInput
          autoComplete="off"
          value={inputValue}
          autoCorrect={false}
          onChangeText={(text) => {
            setInputValue(text);
          }}
          onBlur={handleBlur}
          inputMode="decimal"
          defaultValue="1"
          keyboardType="decimal-pad"
          className="h-full flex-row items-center rounded-l-xl bg-[#F7F8F8] text-xl px-6 gap-4 font-poppins"
        />

        <View className="bg-[#F7F8F8] h-full flex-row items-center">
          <Text className="font-poppins text-xl ">x</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowActionsheet(true)}
          className="h-14 rounded-r-xl bg-[#F7F8F8]  items-center justify-center"
        >
          <View className="px-5">
            {props.selectedServingType && (
              <Text
                className="text-xl font-poppins truncate  max-w-24"
                numberOfLines={1}
              >
                {modifiedServingUnit(props.selectedServingType)}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <ActionSheetComponent
        showActionsheet={showActionsheet}
        closeHandler={handleClose}
      >
        <View className="flex flex-col items-center justify-center w-full gap-7 my-5">
          {props.servingTypes.map((type) => (
            <TouchableOpacity
              key={type.serving_id}
              onPress={() => {
                props.setSelectedServingType(type);
                handleClose();
              }}
            >
              <Text className="font-poppins text-lg">
                {type.serving_description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ActionSheetComponent>
    </>
  );
};

export default ServingInputComponent;
