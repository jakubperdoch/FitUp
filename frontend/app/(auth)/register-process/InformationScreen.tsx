import { View, Text, ScrollView } from "react-native";
import InformationSVG from "@/assets/images/informations-image.svg";
import SelectComponent from "@/components/custom/Inputs/Select";
import DatePickerComponent from "@/components/custom/Inputs/DatePicker";
import ConversionInputComponent from "@/components/custom/Inputs/ConversionInput";
import { useState } from "react";
import { Ruler, Weight } from "lucide-react-native";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import {
  setGender,
  setBirthDate,
  setHeight as setReduxHeight,
  setWeight as setReduxWeight,
} from "@/store/user";
import { useResponsive } from "react-native-responsive-hook";
import Animated, { ZoomIn } from "react-native-reanimated";
import GenericIcon from "@/components/custom/Icon";
import { useTranslation } from "react-i18next";

const InformationScreen = () => {
  const dispatch = useDispatch();
  const { vh } = useResponsive();
  const { t } = useTranslation("onboarding");

  const [currentWeightIndex, setCurrentWeightIndex] = useState(0);
  const [currentHeightIndex, setCurrentHeightIndex] = useState(0);
  const [weightMetric, setWeightMetric] = useState("kg");
  const [heightMetric, setHeightMetric] = useState("cm");
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);

  const weightMetrics = ["kg", "lb"];
  const heightMetrics = ["cm", "in"];

  const genderOptions = [
    {
      label: t("genders.male"),
      value: "male",
    },
    {
      label: t("genders.female"),
      value: "female",
    },
    {
      label: t("genders.other"),
      value: "other",
    },
  ];

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

  const informationSchema = yup.object().shape({
    gender: yup.string().required("Gender is required"),
    birth: yup.date().required("Date of Birth is required"),
    weight: yup.number().required("Weight is required"),
    height: yup.number().required("Height is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(informationSchema),
  });

  const watchedFields = watch(["gender", "birth", "weight", "height"]);

  const submitHandler = () => {
    dispatch(setGender(watchedFields[0]));
    dispatch(setBirthDate(new Date(watchedFields[1]).toLocaleDateString()));
    dispatch(setReduxHeight(watchedFields[3]));
    dispatch(setReduxWeight(watchedFields[2]));
    router.push("/register-process/SelectingGoalsScreen");
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="justify-start items-center gap-2 px-7 pt-5 pb-3"
      automaticallyAdjustKeyboardInsets={true}
      showsVerticalScrollIndicator={false}
    >
      <Text className="self-start text-4xl font-bold">
        {t("information.title")}
      </Text>
      <InformationSVG height={vh(30)} width={"100%"} />
      <Text className="text-2xl font-bold mt-2 font-poppins">
        {t("information.description")}
      </Text>
      <Text className="font-poppins text-center text-[#7B6F72]">
        {t("information.text")}
      </Text>

      <View className="flex flex-col w-full  gap-5 mt-3 mb-2">
        <SelectComponent
          placeholder={t("genders.placeholder")}
          controllerName={"gender"}
          control={control}
          options={genderOptions}
        />

        {errors?.gender && (
          <Animated.View
            entering={ZoomIn}
            className="flex-row items-center gap-2"
          >
            <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
            <Text className="font-poppins text-[#F77F00]">
              {errors?.gender?.message}
            </Text>
          </Animated.View>
        )}

        <DatePickerComponent control={control} />

        {errors?.birth && (
          <Animated.View
            entering={ZoomIn}
            className="flex-row items-center gap-2"
          >
            <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
            <Text className="font-poppins text-[#F77F00]">
              {errors?.birth?.message}
            </Text>
          </Animated.View>
        )}

        <ConversionInputComponent
          placeholder={t("weightPlaceholder")}
          metric={weightMetric}
          inputValue={weight}
          control={control}
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

        {errors?.weight && (
          <Animated.View
            entering={ZoomIn}
            className="flex-row items-center gap-2"
          >
            <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
            <Text className="font-poppins text-[#F77F00]">
              {errors?.weight?.message}
            </Text>
          </Animated.View>
        )}

        <ConversionInputComponent
          control={control}
          controlName={"height"}
          placeholder={t("heightPlaceholder")}
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

        {errors?.height && (
          <Animated.View
            entering={ZoomIn}
            className="flex-row items-center gap-2"
          >
            <GenericIcon name={"OctagonAlert"} color="#F77F00" size={20} />
            <Text className="font-poppins text-[#F77F00]">
              {errors?.height?.message}
            </Text>
          </Animated.View>
        )}
      </View>

      <GradientButtonComponent
        handleSubmit={handleSubmit(submitHandler)}
        title={t("next")}
        size={"full"}
      />
    </ScrollView>
  );
};

export default InformationScreen;
9;
