import { useLayout } from "@/context/LayoutContext";
import { useCallback, useEffect } from "react";
import { Slot, useFocusEffect } from "expo-router";

const WorkoutDetailsLayout = () => {
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

  return <Slot />;
};
