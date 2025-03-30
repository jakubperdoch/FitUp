import { RootState } from "@/store/store";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import SuccessImage from "@/assets/images/success-image.svg";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { useTranslation } from "react-i18next";

const SuccessScreen = () => {
  const user = useSelector((state: RootState) => state.user);
  const { t } = useTranslation("onboarding");

  const { mutate: finishAccount } = useMutation<string, Error, Partial<User>>({
    mutationFn: (data: Partial<User>) =>
      apiFetch("/auth/finish-account", {
        method: "POST",
        body: {
          birth_date: data.userBiometrics.birthDate,
          weight: data.userBiometrics.weight,
          height: data.userBiometrics.height,
          gender: data.gender,
          goal: data.goal,
        },
      }),
    onSuccess: (response) => {
      router.replace("/home");
    },
    onError: (error) => {
      console.log(error);
      router.replace("/SignInScreen");
    },
  });

  const submitHandler = () => {
    finishAccount(user);
  };

  return (
    <View className=" flex flex-col items-center px-7 h-full pt-5">
      <View className="justify-start items-center  w-full">
        <SuccessImage height={"60%"} width={350} />
        <Text className="text-3xl mt-12 font-bold font-poppins">
          {t("success.title")}
        </Text>
        <Text className="font-poppins text-[#7B6F72] mt-2 w-2/3 text-center">
          {t("success.text")}
        </Text>
      </View>

      <View className="w-full mt-auto mb-6">
        <GradientButtonComponent
          size={"full"}
          handleSubmit={submitHandler}
          title={t("welcome")}
        />
      </View>
    </View>
  );
};

export default SuccessScreen;
