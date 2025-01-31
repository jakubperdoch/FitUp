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
import { useDispatch } from "react-redux";
import CarouselCardComponent from "@/components/custom/Dashboard/CarouselCard";

const PAGE_WIDTH = Dimensions.get("window").width;
type TAnimationStyle = (value: number) => AnimatedStyle<ViewStyle>;

const SelectingGoalsScreen = () => {
  const dispatch = useDispatch();
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
      title: "Improve Shape",
      text: "I have a low amount of body fat and want to build more muscle",
      image: <InformationCardFirst />,
    },
    {
      title: "Lean & Tone",
      text: "I’m “skinny fat”. Look thin but have no shape. I want to add learn muscle in the right way",
      image: <InformationCardSecond />,
    },
    {
      title: "Lose a Fat",
      text: "I have over 20 lbs to lose. I want to drop all this fat and gain muscle mass",
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
    dispatch(setGoal(formData));
    router.replace("/register-process/SuccessScreen");
  };

  return (
    <View className="w-full h-full flex items-center pt-4 px-7">
      <Text className="text-2xl font-bold font-poppins">
        What is your goal ?
      </Text>
      <Text className="font-poppins text-[#7B6F72] w-2/3 text-center">
        It will help us to choose a best program for you
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
        title={"Confirm"}
        size={"full"}
      />
    </View>
  );
};

export default SelectingGoalsScreen;
