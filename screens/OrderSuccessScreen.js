import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const OrderSuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <Text style={styles.icon}>✅</Text>

      {/* Success Message */}
      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.message}>
        Thank you for your purchase. Your order has been successfully placed.
      </Text>

      {/* Back to Home Button */}
      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => navigation.popToTop()}
      >
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
    backgroundColor: "#4CAF50",
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
