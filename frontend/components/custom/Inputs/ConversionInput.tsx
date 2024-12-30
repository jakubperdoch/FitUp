import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Controller } from "react-hook-form";

const ConversionInputComponent = ({
  placeholder,
  inputValue,
  metric,
  inputChangeHandler,
  metricChangeHandler,
  children,
  control,
  controlName,
}) => {
  return (
    <View className="flex flex-row w-full justify-between ">
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <View className="w-4/5 h-16 flex-row items-center rounded-xl bg-[#F7F8F8] px-6 gap-4">
            {children}
            <TextInput
              value={inputValue}
              onChangeText={(value) => {
                inputChangeHandler(value);
                onChange(value);
              }}
              placeholder={placeholder}
              placeholderClassName="opacity-40"
              className="w-10/12 font-semibold font-poppins text-lg text-[#7B6F72]"
              inputMode={"numeric"}
              keyboardType={"number-pad"}
            />
          </View>
        )}
        name={controlName}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={metricChangeHandler}
        className="w-16 h-16 items-center justify-center"
      >
        <LinearGradient
          start={{ x: 0, y: 0.75 }}
          end={{ x: 1.3, y: 0.25 }}
          colors={["#F77F00", "#D62828"]}
          style={{
            width: 60,
            height: 60,
            borderRadius: 14,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="uppercase text-white text-lg font-poppins">
            {metric}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ConversionInputComponent;
