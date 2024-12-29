import { ScrollView } from "react-native";
import { Slot, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import MealsHeaderImage from "@/assets/images/meals-header.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLayout } from "@/context/LayoutContext";
import { useCallback, useEffect } from "react";

const WorkoutLayout = () => {
  const insets = useSafeAreaInsets();
  const { setNavbarColor, setShowFooter, setNavbarTitle, setShowBackButton } =
    useLayout();

  useEffect(() => {
    setNavbarColor("text-white");
    setShowFooter(false);
    setNavbarTitle("Workout Tracker");
    setShowBackButton(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setNavbarColor("text-black");
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
        <MealsHeaderImage />
      </LinearGradient>

      <ScrollView
        style={{
          backgroundColor: "white",
          borderRadius: 50,
          paddingVertical: 40,
          marginTop: 250,
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

export default WorkoutLayout;
