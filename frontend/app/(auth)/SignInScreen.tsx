import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { Divider } from "@/components/ui/divider";
import AppleLoginIcon from "@/assets/icons/apple-login--icon.svg";
import ValidationForm from "@/components/custom/Inputs/ValidationForm";
import { router } from "expo-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { setPassword, setEmail } from "@/store/user";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";

const SignInScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useDispatch();

  let userSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must contain at least 8 characters"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const watchFields = watch(["email", "password"]);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const submitHandler = (formData) => {
    // push formData to the backend
    // TODO: Implement the backend logic

    dispatch(setEmail(watchFields[0]));
    dispatch(setPassword(watchFields[1]));
    router.replace("/register-process/InformationsScreen");
  };

  const onError = (errors) => {
    let errorMessage = "";

    if (errors.name) {
      errorMessage += `Name: ${errors.name.message}\n`;
    }
    if (errors.email) {
      errorMessage += `Email: ${errors.email.message}\n`;
    }
    if (errors.password) {
      errorMessage += `Password: ${errors.password.message}\n`;
    }

    if (errorMessage) {
      Alert.alert("Validation Errors", errorMessage);
    }
  };

  return (
    <View className="flex flex-col gap-5 justify-center items-center px-5 h-full">
      <View className="d-flex items-center mb-6 mt-4">
        <Text className="text-2xl text-primary-500 font-poppins">
          Hey there,
        </Text>
        <Text className="text-3xl font-bold font-poppins mt-2">
          Welcome Back
        </Text>
      </View>

      <ValidationForm
        control={control}
        passwordVisibility={showPassword}
        showPasswordHandler={handleState}
        formType={"signin"}
      />

      <GradientButtonComponent
        size={"full"}
        handleSubmit={handleSubmit(submitHandler, onError)}
        title={"Login"}
      />

      <View className="w-full flex flex-row items-center justify-center gap-2 mt-2">
        <Divider />
        <Text className="text-lg">Or</Text>
        <Divider />
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <AppleLoginIcon width={60} height={60} />
      </TouchableOpacity>

      <View className="flex flex-col gap-2 mt-5  items-center justify-center">
        <Text className="text-lg font-poppins">Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/SignUpScreen")}>
          <Text className=" text-xl font-bold text-[#F77F00]">Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;
