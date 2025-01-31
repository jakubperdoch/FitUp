import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Divider } from "@/components/ui/divider";
import AppleLoginIcon from "@/assets/icons/apple-login--icon.svg";
import ValidationForm from "@/components/custom/Inputs/ValidationForm";
import { router } from "expo-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";
import { setPassword, setEmail, setFullName } from "@/store/user";
import { useDispatch } from "react-redux";
import { Controller } from "react-hook-form";
import startCase from "lodash/startCase";

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  let userSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must contain at least 8 characters"),
    checkBox: yup
      .boolean()
      .required()
      .oneOf([true], "You must accept the terms and conditions"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const watchFields = watch(["email", "name", "password", "checkBox"]);

  function validateFullName(fullName: string) {
    const fullNamePattern = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
    return fullNamePattern.test(fullName);
  }

  function splitCamelCaseName(fullName: string) {
    return startCase(fullName).split(" ");
  }

  const submitHandler = (formData) => {
    dispatch(setEmail(watchFields[0]));
    dispatch(setPassword(watchFields[2]));

    validateFullName(watchFields[1])
      ? dispatch(setFullName(watchFields[1]))
      : dispatch(setFullName(splitCamelCaseName(watchFields[1])));

    router.replace("/register-process/InformationScreen");
  };

  const handleState = () => setShowPassword((prev) => !prev);

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 items-strech grow flex-col gap-5 justify-center items-center px-5 pb-3">
        <View className="items-center mb-6 mt-4">
          <Text className="text-2xl text-primary-500 font-poppins">
            Hey there,
          </Text>
          <Text className="text-3xl font-bold font-poppins mt-2">
            Create an Account
          </Text>
        </View>

        <ValidationForm
          errors={errors}
          passwordVisibility={showPassword}
          showPasswordHandler={handleState}
          formType={"signup"}
          control={control}
        />

        <View className="flex flex-row px-4  w-full justify-center items-center gap-3 mt-5 mb-3">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <BouncyCheckbox
                fillColor="#F77F00"
                size={25}
                disableText
                className="max-w-8"
                iconStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#F77F00",
                }}
                innerIconStyle={{
                  borderWidth: 0,
                }}
                onPress={(isChecked: boolean) => {
                  onChange(isChecked);
                }}
              />
            )}
            name="checkBox"
          />
          <Text className="text-gray-500 text-sm font-poppins">
            By continuing you accept our Privacy Policy and Term of Use
          </Text>
        </View>

        <GradientButtonComponent
          size={"full"}
          handleSubmit={handleSubmit(submitHandler)}
          title={"Register"}
        />

        <View className="w-full flex flex-row items-center justify-center gap-2 mt-2">
          <Divider />
          <Text className="text-lg font-poppins">Or</Text>
          <Divider />
        </View>
        <TouchableOpacity activeOpacity={0.7}>
          <AppleLoginIcon width={50} height={50} />
        </TouchableOpacity>

        <View className="flex flex-col gap-2  items-center justify-center">
          <Text className="text-lg font-poppins">Already have an account?</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/SignInScreen")}
          >
            <Text className="text-xl font-poppins font-bold text-[#F77F00]">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
