import { ScrollView, Text, View } from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { router, useFocusEffect } from "expo-router";
import { useLayout } from "@/context/LayoutContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { Spinner } from "@/components/ui/spinner";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import GradientButton from "@/components/custom/Button/GradientButton";
import GenericIcon from "@/components/custom/Icon";
import { useTranslation } from "react-i18next";

const PreferencesScreen = () => {
  const { setNavbarTitle, setShowBackButton } = useLayout();
  const { t } = useTranslation("profile");

  const preferencesSchema = yup.object().shape({
    calories: yup.string().required("Calories is required"),
    protein: yup.string().required("Protein is required"),
    carbs: yup.string().required("Carbs is required"),
    fats: yup.string().required("Fats is required"),
    sugar: yup.string().required("Sugar is required"),
    fiber: yup.string().required("Fiber is required"),
  });

  const {
    data: userPreferences,
    isFetching,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userPreferences"],
    queryFn: () => apiFetch("/user/preferences"),
  });

  const {
    mutate: updateUserPreferences,
    error: updateError,
    isPending,
  } = useMutation({
    mutationKey: ["updatePreferences"],
    mutationFn: (data: {
      calories: string;
      protein: string;
      carbs: string;
      fats: string;
      sugar: string;
      fiber: string;
    }) =>
      apiFetch("/user/macros/update", {
        method: "PUT",
        body: {
          calories: Number(data.calories),
          protein: Number(data.protein),
          carbs: Number(data.carbs),
          fat: Number(data.fats),
          sugar: Number(data.sugar),
          fiber: Number(data.fiber),
        },
      }),
    onSuccess: () => {
      router.replace("/profile");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(preferencesSchema),
    defaultValues: {
      calories: "",
      protein: "",
      carbs: "",
      fats: "",
      sugar: "",
      fiber: "",
    },
  });

  useEffect(() => {
    if (userPreferences) {
      reset({
        calories: String(userPreferences.user_preferences.calories),
        protein: String(userPreferences.user_preferences.protein),
        carbs: String(userPreferences.user_preferences.carbs),
        fats: String(userPreferences.user_preferences.fat),
        sugar: String(userPreferences.user_preferences.sugar),
        fiber: String(userPreferences.user_preferences.fiber),
      });
    }
  }, [userPreferences, reset]);

  const submitHandler = (formData) => {
    updateUserPreferences(formData);
  };

  useEffect(() => {
    setNavbarTitle("Preferences");
    setShowBackButton(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowBackButton(false);
      };
    }, []),
  );

  const isFetchingData = isFetching || isLoading;

  return (
    <ScrollView contentContainerClassName="pb-32">
      {isFetchingData ? (
        <Spinner color={"#F77F00"} />
      ) : (
        <>
          <View className="gap-1 px-7 mb-3">
            <Text className="font-poppinsSemiBold text-xl">
              {t("preferences.title", { context: "profile" })}
            </Text>
            <Text className="text-[#6B7280] font-poppins text-sm">
              {t("preferences.description", { context: "profile" })}
            </Text>
          </View>

          <Animated.View
            entering={ZoomIn}
            className="gap-7 mt-5 mx-7 p-6 px-7 bg-white shadow-soft-1 rounded-2xl"
          >
            <View className="flex-row items-center flex-wrap justify-between gap-6 border-b border-[#E5E6E6] pb-7 ">
              <Text className="font-poppins text-lg">
                {t("preferences.calories", { context: "profile" })} (kCal)
              </Text>
              <Controller
                defaultValue={""}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="xl"
                    variant="rounded"
                    className="max-w-40 flex-1"
                  >
                    <InputField
                      className="text-lg"
                      value={value}
                      inputMode={"decimal"}
                      onChangeText={onChange}
                      placeholder="Calories"
                      autoCorrect={false}
                      autoCapitalize={"none"}
                    />
                  </Input>
                )}
                name={"calories"}
              />

              {errors?.calories && (
                <Animated.View
                  entering={ZoomIn}
                  className="flex-row items-center gap-2"
                >
                  <GenericIcon
                    name={"OctagonAlert"}
                    color="#F77F00"
                    size={20}
                  />
                  <Text className="font-poppins text-[#F77F00]">
                    {errors?.calories?.message}
                  </Text>
                </Animated.View>
              )}
            </View>

            <View className="flex-row items-center flex-wrap justify-between gap-4 border-b border-[#E5E6E6] pb-7 ">
              <Text className="font-poppins text-lg">
                {t("preferences.protein", { context: "profile" })} (g)
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="xl"
                    variant="rounded"
                    className="max-w-40 flex-1"
                  >
                    <InputField
                      className="text-lg"
                      value={value}
                      inputMode={"decimal"}
                      onChangeText={onChange}
                      placeholder="Protein"
                      autoCorrect={false}
                      autoCapitalize={"none"}
                    />
                  </Input>
                )}
                name={"protein"}
              />
            </View>

            {errors?.protein && (
              <Animated.View
                entering={ZoomIn}
                className="flex-row items-center gap-2"
              >
                <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
                <Text className="font-poppins text-[#F77F00]">
                  {errors?.protein?.message}
                </Text>
              </Animated.View>
            )}

            <View className="flex-row flex-wrap justify-between items-center gap-6 border-b border-[#E5E6E6] pb-7 ">
              <Text className="font-poppins text-lg">
                {t("preferences.carbs", { context: "profile" })} (g)
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="xl"
                    variant="rounded"
                    className="max-w-40 flex-1"
                  >
                    <InputField
                      className="text-lg"
                      value={value}
                      inputMode={"decimal"}
                      onChangeText={onChange}
                      placeholder="Carbs"
                      autoCorrect={false}
                      autoCapitalize={"none"}
                    />
                  </Input>
                )}
                name={"carbs"}
              />
            </View>

            {errors?.carbs && (
              <Animated.View
                entering={ZoomIn}
                className="flex-row items-center gap-2"
              >
                <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
                <Text className="font-poppins text-[#F77F00]">
                  {errors?.carbs?.message}
                </Text>
              </Animated.View>
            )}

            <View className="flex-row items-center flex-wrap justify-between gap-6 border-b border-[#E5E6E6] pb-7 ">
              <Text className="font-poppins text-lg">
                {t("preferences.fat", { context: "profile" })} (g)
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="xl"
                    variant="rounded"
                    className="max-w-40 flex-1"
                  >
                    <InputField
                      className="text-lg"
                      value={value}
                      inputMode={"decimal"}
                      onChangeText={onChange}
                      placeholder="Fats"
                      autoCorrect={false}
                      autoCapitalize={"none"}
                    />
                  </Input>
                )}
                name={"fats"}
              />
            </View>

            {errors?.fats && (
              <Animated.View
                entering={ZoomIn}
                className="flex-row items-center gap-2"
              >
                <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
                <Text className="font-poppins text-[#F77F00]">
                  {errors?.fats?.message}
                </Text>
              </Animated.View>
            )}

            <View className="flex-row items-center flex-wrap justify-between gap-6 border-b border-[#E5E6E6] pb-7 ">
              <Text className="font-poppins text-lg">
                {t("preferences.sugar", { context: "profile" })} (g)
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="xl"
                    variant="rounded"
                    className="max-w-40 flex-1"
                  >
                    <InputField
                      className="text-lg"
                      value={value}
                      inputMode={"decimal"}
                      onChangeText={onChange}
                      placeholder="Sugar"
                      autoCorrect={false}
                      autoCapitalize={"none"}
                    />
                  </Input>
                )}
                name={"sugar"}
              />
            </View>

            {errors?.sugar && (
              <Animated.View
                entering={ZoomIn}
                className="flex-row items-center gap-2"
              >
                <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
                <Text className="font-poppins text-[#F77F00]">
                  {errors?.sugar?.message}
                </Text>
              </Animated.View>
            )}

            <View className="flex-row items-center flex-wrap justify-between gap-6 ">
              <Text className="font-poppins text-lg">
                {t("preferences.fiber", { context: "profile" })} (g)
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    size="xl"
                    variant="rounded"
                    className="max-w-36 flex-1"
                  >
                    <InputField
                      className="text-lg"
                      value={value}
                      inputMode={"decimal"}
                      onChangeText={onChange}
                      placeholder="Fiber"
                      autoCorrect={false}
                      autoCapitalize={"none"}
                    />
                  </Input>
                )}
                name={"fiber"}
              />
            </View>

            {errors?.fiber && (
              <Animated.View
                entering={ZoomIn}
                className="flex-row items-center gap-2"
              >
                <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
                <Text className="font-poppins text-[#F77F00]">
                  {errors?.fiber?.message}
                </Text>
              </Animated.View>
            )}
          </Animated.View>
        </>
      )}

      {updateError && (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="flex-col items-center mt-7 gap-2  justify-center"
        >
          <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
          <Text className="font-poppins text-center text-[#F77F00]">
            {updateError instanceof Error ? updateError.message : updateError}
          </Text>
        </Animated.View>
      )}

      {error && (
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          className="flex-col items-center mt-7 gap-2 justify-center"
        >
          <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
          <Text className="font-poppins text-center text-[#F77F00]">
            {error instanceof Error ? error.message : String(error)}
          </Text>
        </Animated.View>
      )}

      <View className="mt-8 mx-7">
        <GradientButton
          size={"full"}
          title={t("preferences.save", { context: "profile" })}
          handleSubmit={handleSubmit(submitHandler)}
        />
      </View>
    </ScrollView>
  );
};

export default PreferencesScreen;
