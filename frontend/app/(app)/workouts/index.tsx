import { View, Text } from "react-native";
import { useLayout } from "@/context/LayoutContext";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "expo-router";

const WorkoutsPage = () => {
  const { setShowFooter, setNavbarTitle, setShowBackButton } = useLayout();

  useEffect(() => {
    setShowFooter(false);
    setNavbarTitle("Workout Tracker");
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
    <View>
      <Text>Workouts Page</Text>
    </View>
  );
};

export default WorkoutsPage;
