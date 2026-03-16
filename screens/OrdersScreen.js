import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ORDER_API_URL } from "../constant/AppConstant";
import { useAuth } from "../context/AuthContext";
import { use, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;

const OrdersScreen = ({ navigation }) => {
  const { userToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const isFocused = useIsFocused();

  const fetchUserOrders = async () => {
    try {
      const response = await fetch(ORDER_API_URL + `?userId=${userToken?.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // Clear orders on error
    }
  };

  useEffect(() => {
    if (isFocused) fetchUserOrders();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate("OrderDetail", { order: item })}
      >
        <View style={styles.row}>
          <View style={styles.orderID}>
            <Text style={styles.orderId}>Order ID: </Text>
            <Text style={styles.date}>#{item.orderID}</Text>
          </View>
          <Text style={styles.status}>{item.status}</Text>
        </View>
        <View style={styles.orderID}>
          <Text style={styles.orderId}>Order Date: </Text>
          <Text style={styles.date}>{item.orderDate}</Text>
        </View>
        <View style={styles.orderID}>
          <Text style={styles.orderId}>Total Price: </Text>
          <Text style={styles.date}>${item.total.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={{ width: 40 }} />
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View
            style={{
              height: screenHeight * 0.7,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="receipt-outline" size={80} color="#CCC" />
            <Text style={styles.emptyText}>No past orders</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  listContent: { padding: 15 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  iconCircle: { padding: 8, backgroundColor: "#f5f5f5", borderRadius: 25 },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderId: {
    fontWeight: "bold",
    fontSize: 16,
  },
  status: {
    color: "#4A90E2",
    fontWeight: "600",
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  total: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 4,
  },
  orderID: {
    flexDirection: "row",
    textAlignVertical: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    marginTop: 10,
  },
});
