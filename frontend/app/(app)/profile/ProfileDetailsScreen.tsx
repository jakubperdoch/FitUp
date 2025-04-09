import { Text, View } from "react-native";
import ConversionInputComponent from "@/components/custom/Inputs/ConversionInput";
import { Ruler, Weight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectComponent from "@/components/custom/Inputs/Select";
import GradientButton from "@/components/custom/Button/GradientButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";
import { router, useFocusEffect } from "expo-router";
import { useLayout } from "@/context/LayoutContext";

const ProfileDetailsScreen = () => {
  const { t } = useTranslation(["onboarding", "profile"]);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [weightMetric, setWeightMetric] = useState("kg");
  const [heightMetric, setHeightMetric] = useState("cm");
  const [currentWeightIndex, setCurrentWeightIndex] = useState(0);
  const [currentHeightIndex, setCurrentHeightIndex] = useState(0);
  const { setNavbarTitle, setShowBackButton } = useLayout();

  useEffect(() => {
    setNavbarTitle(t("biometrics.title", { ns: "profile" }));
    setShowBackButton(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowBackButton(false);
      };
    }, []),
  );

  const weightMetrics = ["kg", "lb"];
  const heightMetrics = ["cm", "in"];

  const informationSchema = yup.object().shape({
    weight: yup.number().required("Weight is required"),
    height: yup.number().required("Height is required"),
    goal: yup.string().required("Goal is required"),
  });

  const {
    data: userBiometrics,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["userBiometric"],
    queryFn: () => apiFetch("/user/biometrics"),
  });

  const { mutate: updateUserBiometrics, error } = useMutation({
    mutationKey: ["updateBiometric"],
    mutationFn: (data: { weight: string; height: string; goal: string }) =>
      apiFetch("/user/biometrics", {
        method: "PUT",
        body: {
          weight: Number(data.weight),
          height: Number(data.height),
          goal: data.goal,
        },
      }),
    onSuccess: () => {
      router.replace("/profile");
    },
    onError: (error) => {
      console.log("Error updating biometrics:", error);
    },
  });

  const goalOptions = [
    {
      label: t("goal.lose", { ns: "profile" }),
      value: "lose",
    },
    {
      label: t("goal.gain", { ns: "profile" }),
      value: "gain",
    },
    {
      label: t("goal.maintain", { ns: "profile" }),
      value: "lean",
    },
  ];

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(informationSchema),
    defaultValues: {
      weight: 0,
      height: 0,
      goal: "",
    },
  });

  const metricChangeHandler = (
    metricsArray: string[],
    currentIndex: number,
    setMetric: (metric: string) => void,
    setIndex: (index: number) => void,
  ) => {
    const nextIndex =
      currentIndex === metricsArray.length - 1 ? 0 : currentIndex + 1;
    setIndex(nextIndex);
    setMetric(metricsArray[nextIndex]);
  };

  const submitHandler = (formData) => {
    updateUserBiometrics(formData);
  };

  useEffect(() => {
    if (userBiometrics) {
      reset({
        weight: userBiometrics.weight,
        height: userBiometrics.height,
        goal: userBiometrics.goal,
      });

      console.log(watch());

      setWeight(userBiometrics.weight);
      setHeight(userBiometrics.height);
    } else {
    }
  }, [reset, userBiometrics]);

  useEffect(() => {}, [watch()]);

  const isFetchingData = isFetching || isLoading;

  return (
    <View className="justify-start gap-5 px-7 pt-5 pb-3">
      {isFetchingData ? (
        <Spinner color={"#F77F00"} />
      ) : (
        <>
          <View className="gap-1">
            <Text className="font-poppinsSemiBold text-xl">
              {t("biometrics.title", { ns: "profile" })}
            </Text>
            <Text className="text-[#6B7280] font-poppins text-sm">
              {t("biometrics.description", { ns: "profile" })}
            </Text>
          </View>

          <ConversionInputComponent
            placeholder={t("weightPlaceholder", { ns: "onboarding" })}
            metric={weightMetric}
            control={control}
            inputValue={weight}
            controlName={"weight"}
            inputChangeHandler={setWeight}
            metricChangeHandler={() =>
              metricChangeHandler(
                weightMetrics,
                currentWeightIndex,
                setWeightMetric,
                setCurrentWeightIndex,
              )
            }
          >
            <Weight color={"#7B6F72"} size={20} />
          </ConversionInputComponent>

          <ConversionInputComponent
            control={control}
            controlName={"height"}
            placeholder={t("heightPlaceholder", { ns: "onboarding" })}
            metric={heightMetric}
            inputValue={height}
            inputChangeHandler={setHeight}
            metricChangeHandler={() =>
              metricChangeHandler(
                heightMetrics,
                currentHeightIndex,
                setHeightMetric,
                setCurrentHeightIndex,
              )
            }
          >
            <Ruler color={"#7B6F72"} size={20} />
          </ConversionInputComponent>

          <SelectComponent
            placeholder={t("goal.placeholder", { ns: "profile" })}
            controllerName={"goal"}
            control={control}
            options={goalOptions}
          />

          <View className="mt-8">
            <GradientButton
              size={"full"}
              title={t("biometrics.save", { ns: "profile" })}
              handleSubmit={handleSubmit(submitHandler)}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ProfileDetailsScreen;
