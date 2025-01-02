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
      scale.value = withSpring(i === index ? -10 : 0);
    });
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

  return (
    <View className="absolute bottom-0 w-full">
      <View
        className="pb-11 pt-6 mt-0 rounded-3xl relative flex-row w-full justify-between px-8 bg-white shadow-soft-1"
        style={{ bottom: -insets.bottom, marginTop: -35 }}
      >
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
                  <GenericIcon
                    name={item.icon}
                    color={route == item.route ? "#F77F00" : "black"}
                  />
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
