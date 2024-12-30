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
}) => {
  return (
    <TouchableOpacity
      style={[styles.touchable]}
      onPress={handleSubmit}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1.3, y: 0.25 }}
        colors={["#F77F00", "#D62828"]}
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
    width: 100,
    fontSize: 13,
    fontWeight: "600",
  },
  md: {
    height: 55,
    paddingHorizontal: 20,
    fontSize: 17,
  },
  text: {
    color: "#fff",
    fontWeight: "800",
    fontFamily: "Poppins", // Ensure you've added the Poppins font
  },
  disabledGradient: {
    opacity: 0.6,
  },
  disabledText: {
    color: "#ccc",
  },
});

export default GradientButtonComponent;
