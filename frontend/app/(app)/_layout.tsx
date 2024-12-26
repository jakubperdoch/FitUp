import { Slot } from "expo-router";
import TopNavigationComponent from "@/components/custom/TopNavigation";
import FooterComponent from "@/components/custom/Footer";
import { useLayout } from "@/context/LayoutContext";
import { View } from "react-native";

const AppLayout = () => {
  const {
    navbarTitle,
    showBackButton,
    isVisible,
    showDetailsButton,
    showFooter,
  } = useLayout();

  return (
    <View className="relative h-full">
      <TopNavigationComponent
        isVisible={isVisible}
        isDetailsButton={showDetailsButton}
        title={navbarTitle}
        isBackButton={showBackButton}
      />
      <Slot />
      {showFooter && <FooterComponent />}
    </View>
  );
};

export default AppLayout;
