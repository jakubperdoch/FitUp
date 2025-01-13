import { Slot, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import MealsHeaderImage from "@/assets/images/meals-header.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLayout } from "@/context/LayoutContext";
import { useCallback, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";

const WorkoutLayout = () => {
  const insets = useSafeAreaInsets();
  const { setNavbarColor, setNavbarTitle, setShowBackButton } = useLayout();

  useEffect(() => {
    setNavbarColor("text-white");
    setNavbarTitle("Workout Tracker");
    setShowBackButton(true);
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setNavbarColor("text-black");
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
          paddingTop: insets.top + 40,
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
          marginTop: 200,
        }}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Slot />
      </ScrollView>
    </>
  );
};

export default WorkoutLayout;
