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
import { useEffect, useRef } from "react";
import { router } from "expo-router";
import { usePathname } from "expo-router";
import { useResponsive } from "react-native-responsive-hook";
import { shadows } from "@/styles/shadows";

type FooterItem = {
  icon: string;
  route?: string;
  additionalRoutes?: string[];
};

const FooterComponent = () => {
  const insets = useSafeAreaInsets();
  const iconElementRefs = useRef<any[]>([]);
  const route = usePathname();
  const { vh } = useResponsive();

  const footerItems = [
    { icon: "ChartArea", route: "/stats" },
    { icon: "Cookie", route: "/meals" },
    { icon: "House", route: "/home" },
    {
      icon: "Dumbbell",
      route: "/workouts/layout",
      additionalRoutes: ["/workouts"],
    },
    { icon: "UserRound", route: "/profile" },
  ];

  const translateValues = footerItems.map(() => useSharedValue(1));

  const updateIconPosition = (index) => {
    translateValues.forEach((scale, i) => {
      scale.value = withSpring(i === index ? -10 : 0);
    });
  };

  const isActiveRoute = (item: FooterItem, currentRoute: string) => {
    const primaryActive = item.route
      ? currentRoute.startsWith(item.route)
      : false;
    const additionalActive =
      item?.additionalRoutes &&
      item?.additionalRoutes?.some((addRoute) =>
        currentRoute.startsWith(addRoute),
      );
    return primaryActive || additionalActive;
  };

  useEffect(() => {
    const currentItemIndex = footerItems.findIndex((item) =>
      isActiveRoute(item, route),
    );
    if (currentItemIndex >= 0) {
      updateIconPosition(currentItemIndex);
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
        className="pt-6 mt-0 rounded-3xl relative flex-row w-full justify-between px-8 bg-white"
        style={[
          { bottom: -insets.bottom, paddingBottom: vh(4) },
          shadows.soft1,
        ]}
      >
        {footerItems.map((item, index) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: translateValues[index].value }],
          }));

          const active = isActiveRoute(item, route);

          return (
            <Animated.View
              style={[animatedStyle, { zIndex: 10 }]}
              ref={(el) => (iconElementRefs.current[index] = el)}
              key={index}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handlePress(index, item)}
              >
                <GenericIcon
                  name={item.icon}
                  color={active ? "#F77F00" : "black"}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
};

export default FooterComponent;
