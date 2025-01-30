import { useLayout } from "@/context/LayoutContext";
import { useCallback, useEffect } from "react";
import { Slot, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MealDetailsLayout = () => {
  const { setShowFooter, setNavbarTitle, setShowBackButton } = useLayout();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setShowFooter(false);
    setNavbarTitle(null);
    setShowBackButton(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowFooter(true);
        setShowBackButton(false);
      };
    }, []),
  );

  return (
    <>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0.1, y: 0.8 }}
        colors={["#D62828", "#F77F00"]}
        style={{
          alignItems: "center",
          position: "absolute",
          width: "100%",
          top: -insets.top,
          paddingTop: insets.top + 50,
          zIndex: -1,
        }}
      >
        <Image source={require("@/assets/images/meals-details--example.png")} />
      </LinearGradient>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 50,
          paddingVertical: 40,
          marginTop: 200,
        }}
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Slot />
      </ScrollView>
    </>
  );
};

export default MealDetailsLayout;
