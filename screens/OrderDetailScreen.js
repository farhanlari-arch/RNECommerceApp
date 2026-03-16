import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderDetailScreen = ({ route, navigation }) => {
  const { order } = route.params; // Get the order details passed from OrdersScreen

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconCircle} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.orderIDHeader}>
          <Text style={styles.orderNumber}>Order ID: #{order.orderID}</Text>
          <Text style={styles.dateText}>Placed on {order.orderDate}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
        </View>

        {/* Items List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items Ordered</Text>
          {order.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                <Text style={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Summary Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              ${order.subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${order.tax.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  iconCircle: {
    width: 40,
    height: 40,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
  },
  scrollContent: { padding: 0 },
  orderIDHeader: { marginTop: 24, marginBottom: 24, alignItems: "center" },
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
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  itemName: { fontSize: 15, fontWeight: "500", marginStart: 10 },
  itemQty: { color: "#888", fontSize: 13, marginTop: 2, marginStart: 10 },
  itemPrice: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
    color: "#333",
    marginStart: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyBetween: "space-between",
    marginVertical: 4,
  },
  summaryLabel: { color: "#666", flex: 1 },
  summaryValue: { fontWeight: "500" },
  totalLabel: { fontSize: 18, fontWeight: "bold", flex: 1 },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#007bff" },
  totalRow: {
    marginTop: 12,
    pt: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginBottom: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#f7fff0",
  },
  productDetails: { flex: 1, marginLeft: 15 },
  productTitle: { fontSize: 15, fontWeight: "600" },
  productSub: { color: "#999", marginVertical: 0 },
  productPrice: { fontWeight: "bold", color: "#333" },
  qtyText: { color: "#007953", fontWeight: "600", fontSize: 16 },
});

export default OrderDetailScreen;
