import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderDetailScreen = ({ route, navigation }) => {
  // Your JSON object
  const orderData = {
    orderID: 1,
    userId: 1,
    orderDate: "2025-06-01",
    status: "Delivered",
    totalAmount: 559.99,
    items: [
      { productID: 29, name: "Navy Blazer", quantity: 1, price: 250 },
      { productID: 14, name: "Clothes with bag", quantity: 1, price: 50 },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.orderNumber}>Order ID: #{orderData.orderID}</Text>
          <Text style={styles.dateText}>Placed on {orderData.orderDate}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{orderData.status}</Text>
          </View>
        </View>

        {/* Items List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items Ordered</Text>
          {orderData.items.map((item) => (
            <View key={item.productID} style={styles.itemRow}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Summary Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>$300.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping & Fees</Text>
            <Text style={styles.summaryValue}>$259.99</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${orderData.totalAmount}</Text>
          </View>
        </View>

        {/* Reorder Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reorder Items</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 20 },
  header: { marginBottom: 24, alignItems: "center" },
  orderNumber: { fontSize: 22, fontWeight: "bold", color: "#333" },
  dateText: { color: "#666", marginTop: 4 },
  statusBadge: {
    marginTop: 12,
    backgroundColor: "#e6f4ea",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: { color: "#1e7e34", fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#444",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  itemName: { fontSize: 15, fontWeight: "500" },
  itemQty: { color: "#888", fontSize: 13, marginTop: 2 },
  itemPrice: { fontSize: 15, fontWeight: "600" },
  summaryRow: {
    flexDirection: "row",
    justifyBetween: "space-between",
    marginVertical: 4,
  },
  summaryLabel: { color: "#666", flex: 1 },
  summaryValue: { fontWeight: "500" },
  totalRow: {
    marginTop: 12,
    pt: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#007bff" },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default OrderDetailScreen;
