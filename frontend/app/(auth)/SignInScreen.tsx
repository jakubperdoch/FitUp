import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import GenericIcon from "@/components/custom/Icon";

const SignInScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { logIn } = useAuth();
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

  const {
    mutate: loginMutation,
    status,
    error,
  } = useMutation<LoginResponse, Error, { email: string; password: string }>({
    mutationFn: (formData: { email: string; password: string }) =>
      logIn(formData.email, formData.password),
    onSuccess: (response) => {
      if (!response) return;

      if (response.user.onboarding !== "true") {
        router.replace("/register-process/InformationScreen");
      } else {
        router.replace("/home");
      }
    },
    onError: (error) => {
      setLocalError(error.message);
    },
  });

  const submitHandler = (formData: { email: string; password: string }) => {
    loginMutation(formData);
    dispatch(setEmail(watchFields[0]));
    dispatch(setPassword(watchFields[1]));
  };

  useEffect(() => {
    if (localError) {
      const timer = setTimeout(() => {
        setLocalError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [localError]);

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
        errors={errors}
        passwordVisibility={showPassword}
        showPasswordHandler={handleState}
        formType={"signin"}
      />

      {localError && (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="flex-row items-center gap-2"
        >
          <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
          <Text className="font-poppins text-[#F77F00]">{localError}</Text>
        </Animated.View>
      )}

      <GradientButtonComponent
        size={"full"}
        handleSubmit={handleSubmit(submitHandler)}
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
          <Text className="font-poppins text-xl font-bold text-[#F77F00]">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;
