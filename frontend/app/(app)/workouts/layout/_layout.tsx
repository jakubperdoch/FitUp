import { Slot, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import MealsHeaderImage from "@/assets/images/meals-header.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLayout } from "@/context/LayoutContext";
import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { WorkoutContext } from "@/context/WorkoutContext";
import { useTranslation } from "react-i18next";

const WorkoutLayout = () => {
  const insets = useSafeAreaInsets();
  const { setNavbarColor, setNavbarTitle, setShowBackButton } = useLayout();
  const [isWorkoutImageVisible, setIsWorkoutImageVisible] = useState(true);
  const { t } = useTranslation("headers");

  useEffect(() => {
    setNavbarColor("text-white");
    setNavbarTitle(t("workoutTracker", { context: "meals" }));
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
      <WorkoutContext.Provider
        value={{ isWorkoutImageVisible, setIsWorkoutImageVisible }}
      >
        {isWorkoutImageVisible && (
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
        )}

        <ScrollView
          style={[
            isWorkoutImageVisible
              ? { marginTop: 170, borderRadius: 50 }
              : { marginTop: 0 },
            {
              backgroundColor: "white",
              paddingVertical: 40,
            },
          ]}
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          <Slot />
        </ScrollView>
      </WorkoutContext.Provider>
    </>
  );
};

export default WorkoutLayout;
