import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientButtonComponent = ({
  handleSubmit,
  title,
  size = "md",
  borderRadius = 50,
  disabled = false,
  loading = false,
  colors = ["#F77F00", "#D62828"],
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.touchable,
        {
          width: styles[size]?.width,
        },
      ]}
      onPress={handleSubmit}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1.3, y: 0.25 }}
        //@ts-ignore
        colors={colors}
        style={[
          styles.gradient,
          styles[size],
          { borderRadius },
          disabled && styles.disabledGradient,
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            className="font-poppins"
            style={[
              styles.text,
              {
                fontSize: styles[size]?.fontSize,
                fontWeight: styles[size]?.fontWeight,
              },
              disabled && styles.disabledText,
            ]}
          >
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginTop: "auto",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  gradient: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  sm: {
    height: 40,
    paddingHorizontal: 15,
    width: 110,
    fontSize: 13,
    fontWeight: "600",
  },
  md: {
    height: 40,
    fontSize: 13,
    paddingHorizontal: 15,
    fontWeight: "600",
    width: 130,
  },
  full: {
    width: "100%",
    height: 60,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "#fff",
    fontWeight: "800",
  },
  disabledGradient: {
    opacity: 0.6,
  },
  disabledText: {
    color: "#ccc",
  },
});

export default GradientButtonComponent;
