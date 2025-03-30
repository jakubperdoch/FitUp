import { Text, View, Dimensions } from "react-native";
import { useCallback, useState } from "react";
import { interpolate, type AnimatedStyle } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import type { ViewStyle } from "react-native";
import InformationCardFirst from "@/assets/images/information-card--first.svg";
import InformationCardSecond from "@/assets/images/information-card--second.svg";
import InformationCardThird from "@/assets/images/information-card--third.svg";
import GradientButtonComponent from "@/components/custom/Button/GradientButton";
import { router } from "expo-router";
import { setGoal } from "@/store/user";
import { useDispatch, useSelector } from "react-redux";
import CarouselCardComponent from "@/components/custom/Dashboard/CarouselCard";
import { useAuth } from "@/context/AuthContext";
import { RootState } from "@/store/store";
import { useTranslation } from "react-i18next";

const PAGE_WIDTH = Dimensions.get("window").width;
type TAnimationStyle = (value: number) => AnimatedStyle<ViewStyle>;

const SelectingGoalsScreen = () => {
  const dispatch = useDispatch();
  const { addToken } = useAuth();
  const user = useSelector((state: RootState) => state.user);
  const { t } = useTranslation("onboarding");

  const itemSize = 300;
  const centerOffset = PAGE_WIDTH / 2 - itemSize / 2;
  const [goalIndex, setGoalIndex] = useState(0);

  const animationStyle: TAnimationStyle = useCallback(
    (value: number) => {
      "worklet";

      const itemGap = interpolate(value, [-1, 0, 1], [-10, 0, 10]);

      const translateX =
        interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
        centerOffset -
        itemGap;

      const translateY = interpolate(value, [-1, 0, 1], [80, 40, 80]);

      const scale = interpolate(value, [-1, 0, 1], [0.85, 1.1, 0.85]);
      const opacity = interpolate(value, [-1, 0, 1], [0.75, 1, 0.75]);

      return {
        transform: [
          {
            translateX,
          } as { translateX: number },
          {
            translateY,
          } as { translateY: number },
          { scale } as { scale: number },
        ],
        opacity,
      };
    },
    [centerOffset],
  );

  const SwiperContent = [
    {
      title: t("muscleGain.title"),
      text: t("muscleGain.description"),
      image: <InformationCardFirst />,
    },
    {
      title: t("maintenance.title"),
      text: t("maintenance.description"),
      image: <InformationCardSecond />,
    },
    {
      title: t("fatLoss.title"),
      text: t("fatLoss.description"),
      image: <InformationCardThird />,
    },
  ];

  const onGaolChange = (index: number) => {
    setGoalIndex(index);
  };

  const submitHandler = (formData: any) => {
    switch (formData) {
      case 0:
        formData = "gain";
        break;
      case 1:
        formData = "lean";
        break;
      case 2:
        formData = "lose";
        break;
      default:
        break;
    }

    addToken(user.token);
    dispatch(setGoal(formData));
    router.replace("/register-process/SuccessScreen");
  };

  return (
    <View className="w-full h-full flex items-center pt-4 px-7">
      <Text className="text-2xl font-bold font-poppins">
        {t("selectingGoals.title")}
      </Text>
      <Text className="font-poppins text-[#7B6F72] w-2/3 text-center">
        {t("selectingGoals.description")}
      </Text>
      <Carousel
        width={itemSize}
        height={itemSize}
        style={{
          width: PAGE_WIDTH,
          height: "80%",
          overflow: "visible",
          alignItems: "flex-start",
        }}
        onSnapToItem={(index) => onGaolChange(index)}
        data={[...new Array(3).keys()]}
        renderItem={({ index }) => (
          <TouchableWithoutFeedback
            key={index}
            containerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
          >
            <CarouselCardComponent
              text={SwiperContent[index].text}
              title={SwiperContent[index].title}
            >
              {SwiperContent[index].image}
            </CarouselCardComponent>
          </TouchableWithoutFeedback>
        )}
        customAnimation={animationStyle}
      />
      <GradientButtonComponent
        handleSubmit={() => submitHandler(goalIndex)}
        title={t("confirm")}
        size={"full"}
      />
    </View>
  );
};

export default SelectingGoalsScreen;
