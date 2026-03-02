import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

/* -------- Mock Cart Data -------- */
const CART_ITEMS = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 99.99,
    quantity: 1,
    image: "https://via.placeholder.com/120",
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 59.99,
    quantity: 2,
    image: "https://via.placeholder.com/120",
  },
];

const TAX_RATE = 0.08;

const PlaceOrderScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(CART_ITEMS);

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  /* -------- Cart Calculations -------- */
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  /* -------- Handlers -------- */
  const handleChange = (key, value) => {
    setAddress({ ...address, [key]: value });
  };

  const placeOrder = () => {
    const emptyField = Object.values(address).some(
      (value) => value.trim() === ""
    );
    if (emptyField) {
      Alert.alert("Error", "Please fill all address fields");
      return;
    }

    // Mock placing order
    Alert.alert("Order Placed!", "Thank you for your purchase!");
    navigation.navigate("OrderSuccess");
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>
        {item.title} × {item.quantity}
      </Text>
      <Text style={styles.itemPrice}>
        ${(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Cart Summary */}
      <Text style={styles.sectionTitle}>Order Summary</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <View style={styles.summaryRow}>
        <Text>Subtotal</Text>
        <Text>${subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text>Tax (8%)</Text>
        <Text>${tax.toFixed(2)}</Text>
      </View>
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
      </View>

      {/* Address Form */}
      <Text style={styles.sectionTitle}>Shipping Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={address.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Street Address"
        value={address.street}
        onChangeText={(text) => handleChange("street", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={address.city}
        onChangeText={(text) => handleChange("city", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={address.state}
        onChangeText={(text) => handleChange("state", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP Code"
        keyboardType="number-pad"
        value={address.zip}
        onChangeText={(text) => handleChange("zip", text)}
      />

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderBtn} onPress={placeOrder}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PlaceOrderScreen;

/* -------- Styles -------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemTitle: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A90E2",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalRow: {
    marginTop: 6,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 6,
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  total: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4CAF50",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  placeOrderBtn: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
