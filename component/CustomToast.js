import React, { useState, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const CustomToast = ({ visible, message, onHide }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // 1. Fade In
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // 2. Wait 2 seconds, then Fade Out
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => onHide()); // Reset visibility in parent
        }, 2000);
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, { opacity }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 999,
  },
  toastText: { color: "white", fontWeight: "bold" },
});
