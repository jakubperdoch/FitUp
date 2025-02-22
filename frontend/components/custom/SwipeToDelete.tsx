import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Dimensions, Alert } from "react-native";
import GenericIcon from "@/components/custom/Icon";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";

const WIDTH_SCREEN = Dimensions.get("window").width;
const ITEM_HEIGHT = 120;

type ComponentProps = {
  id: number;
  onDeleteHandler: (id: number) => void;
  children: any;
  alert: {
    title: string;
    desc: string;
  };
};

const SwipeToDeleteComponent = (props: ComponentProps) => {
  const { t } = useTranslation("workouts");
  const swipeTranslateX = useSharedValue(0);
  const pressed = useSharedValue(false);
  const marginVertical = useSharedValue(20);
  const itemHeight = useSharedValue(ITEM_HEIGHT);
  const opacity = useSharedValue(0);

  const showDeleteConfirmation = (id: number) => {
    Alert.alert(props.alert?.title, props.alert?.desc, [
      {
        text: t("workoutDetails.deleteExerciseModal.cancelButton", {
          context: "workouts",
        }),
        style: "cancel",
        onPress: () => {
          swipeTranslateX.value = withSpring(0);
        },
      },
      {
        text: t("workoutDetails.deleteExerciseModal.deleteButton", {
          context: "workouts",
        }),
        style: "destructive",
        onPress: () => {
          marginVertical.value = withTiming(0, { duration: 200 });
          swipeTranslateX.value = withTiming(
            -WIDTH_SCREEN,
            { duration: 300 },
            (finished) => {
              if (finished) {
                runOnJS(props.onDeleteHandler)(id);
              }
            },
          );
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        },
      },
    ]);
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      if (event.translationX < 0) {
        swipeTranslateX.value = event.translationX;
      }

      if (swipeTranslateX.value < -WIDTH_SCREEN * 0.25) {
        opacity.value = 1;
      } else {
        opacity.value = 0;
      }
    })
    .onFinalize(() => {
      const shouldDelete = swipeTranslateX.value < -WIDTH_SCREEN * 0.3;

      if (shouldDelete) {
        runOnJS(showDeleteConfirmation)(props.id);
      } else {
        opacity.value = 0;
        swipeTranslateX.value = withSpring(0);
      }
      opacity.value = 0;
      pressed.value = false;
    });

  const transformStyle = useAnimatedStyle(() => ({
    // @ts-ignore
    transform: [
      { translateX: swipeTranslateX.value },
      { scale: withTiming(pressed.value ? 1.1 : 1) },
    ],
  }));

  const itemMarginStyle = useAnimatedStyle(() => ({
    marginVertical: marginVertical.value,
    height: itemHeight.value,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {
      duration: 200,
    }),
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={itemMarginStyle}>
        <Animated.View
          style={opacityStyle}
          className="absolute right-1 top-2/4  h-full"
        >
          <GenericIcon name="Trash2" size={25} color="#F77F00" />
        </Animated.View>

        <Animated.View style={transformStyle}>{props.children}</Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default SwipeToDeleteComponent;
