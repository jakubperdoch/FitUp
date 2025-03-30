import { router, Slot } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ProgressButton from "@/components/custom/Button/ProgressButton";
import { useExplainer } from "@/context/ExplainerContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useResponsive } from "react-native-responsive-hook";

const ExplainersLayout = () => {
  const [progressBar, setProgress] = useState(-0.75);
  const [pageIndex, setIndex] = useState(1);
  const { explainerDescription, explainerTitle } = useExplainer();
  const { styles } = useStyles();
  const insets = useSafeAreaInsets();

  const onPressHandler = () => {
    if (pageIndex >= 4) {
      router.replace("/SignUpScreen");
      return;
    }

    setProgress((prevProgress) => prevProgress + 0.25);
    setIndex((prevIndex) => prevIndex + 1);
    router.replace(`/explainers/Explainer${pageIndex + 1}Screen`);
  };

  return (
    <View style={[styles.explainersLayout, { marginTop: -insets.top }]}>
      <View style={styles.explainersImage}>
        <Slot />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.explainersTitle} className="font-poppins">
          {explainerTitle}
        </Text>
        <Text
          style={styles.explainersDesc}
          className="font-poppins text-[#7B6F72]"
        >
          {explainerDescription}
        </Text>
        <View className="ms-auto mt-auto">
          <ProgressButton
            progress={progressBar}
            onPressHandler={onPressHandler}
          />
        </View>
      </View>
    </View>
  );
};

const useStyles = () => {
  const { vh } = useResponsive();

  const styles = StyleSheet.create({
    explainersLayout: {
      alignItems: "center",
      flex: 1,
    },
    contentContainer: {
      alignItems: "flex-start",
      justifyContent: "flex-start",
      marginTop: 20,
      paddingBottom: 10,
      flex: 1,
      width: "80%",
    },
    explainersImage: {
      width: "100%",
      height: vh(58),
    },
    explainersTitle: {
      fontSize: 27,
      fontWeight: "bold",
      marginBottom: 10,
    },
    explainersDesc: {
      fontSize: 16,
      textAlign: "left",
      width: 320,
    },
  });

  return { styles };
};

export default ExplainersLayout;
