import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import GenericIcon from "./Icon";
import Svg, { Circle, LinearGradient, Stop, Defs } from "react-native-svg";
import { useEffect, useRef } from "react";
import { router } from "expo-router";
import { usePathname } from "expo-router";

const circleLength = 150;
const radius = circleLength / (2 * Math.PI);

type FooterItem = {
  icon: string;
  route?: string;
};

const FooterComponent = () => {
  const insets = useSafeAreaInsets();
  const iconPosition = useSharedValue<number>(0);
  const iconElementRefs = useRef<any[]>([]);
  const route = usePathname();

  const footerItems = [
    { icon: "ChartArea", route: "/chart" },
    { icon: "Cookie", route: "/meals" },
    { icon: "House", route: "/home" },
    { icon: "Dumbbell", route: "/workouts" },
    { icon: "UserRound", route: "/profile" },
  ];

  const translateValues = footerItems.map(() => useSharedValue(1));

  const updateIconPosition = (index) => {
    translateValues.forEach((scale, i) => {
      scale.value = withSpring(i === index ? -16 : 0);
    });

    const element = iconElementRefs.current[index];
    if (element) {
      element.measure((px: number) => {
        iconPosition.value = px - 25;
      });
    }
  };

  useEffect(() => {
    const currentRoute = footerItems.find(
      (footerRoute) => footerRoute.route && route.startsWith(footerRoute.route),
    );

    const currentRouteIndex = footerItems.findIndex(
      (footerRoute) => footerRoute === currentRoute,
    );

    if (currentRoute && currentRouteIndex) {
      updateIconPosition(currentRouteIndex);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [route]);

  const handlePress = (index, item?: FooterItem) => {
    if (item?.route && route !== item.route) {
      router.push(item.route);
    }
    updateIconPosition(index);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const circleAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(iconPosition.value, { stiffness: 50, mass: 1 }),
      },
    ],
  }));

  return (
    <View className="absolute bottom-0 w-full">
      <View
        className="pb-11 pt-6 mt-0 rounded-3xl relative flex-row w-full justify-between px-8 bg-white shadow-soft-1"
        style={{ bottom: -insets.bottom, marginTop: -35 }}
      >
        <Animated.View
          className="absolute bottom-5"
          style={[circleAnimation, { zIndex: 0 }]}
        >
          <Svg width={circleLength / 2.4} height={circleLength / 2}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#F77F00" stopOpacity="1" />
                <Stop offset="1" stopColor="#D62828" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Circle
              fill="url(#grad)"
              cx={circleLength / 4}
              cy={circleLength / 5.5}
              r={radius}
            />
          </Svg>
        </Animated.View>
        {footerItems.map((item, index) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: translateValues[index].value }],
          }));
          return (
            <View
              ref={(el) => (iconElementRefs.current[index] = el)}
              key={index}
            >
              <Animated.View style={[animatedStyle, { zIndex: 10 }]}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handlePress(index, item)}
                >
                  <GenericIcon name={item.icon} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FooterComponent;
