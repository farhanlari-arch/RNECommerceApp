import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure @expo/vector-icons is installed
import { GlobalStyle } from "../constant/styles";

const OrderSuccessScreen = ({ navigation }) => {
  const navigateToHome = () => {
    navigation.reset({
      index: 0, // This sets the 'Home' screen as the first and only screen in the stack
      routes: [{ name: "BottomTabs" }], // The name must match the name in your Stack.Screen
    });
  };

  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <Ionicons name="checkmark-circle" size={100} color="green" />

      {/* Success Message */}
      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.message}>
        Thank you for your purchase. Your order has been successfully placed.
      </Text>

      {/* Back to Home Button */}
      <TouchableOpacity style={styles.homeBtn} onPress={() => navigateToHome()}>
        <Text style={styles.homeText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSuccessScreen;

/* -------- Styles -------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  homeBtn: {
    backgroundColor: GlobalStyle.color.activeTint,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  homeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
