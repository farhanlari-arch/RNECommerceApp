import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ORDERS } from "../data/mockOrders";
import { SafeAreaView } from "react-native-safe-area-context";

const OrdersScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate("OrderDetail", { order: item })}
      >
        <View style={styles.row}>
          <View style={styles.orderID}>
            <Text style={styles.orderId}>Order ID: </Text>
            <Text style={styles.date}>#{item.id}</Text>
          </View>
          <Text style={styles.status}>{item.status}</Text>
        </View>
        <View style={styles.orderID}>
          <Text style={styles.orderId}>Order Date: </Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={styles.orderID}>
          <Text style={styles.orderId}>Total Price: </Text>
          <Text style={styles.date}>${item.total.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.container}>
      <FlatList
        data={ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text>No past orders</Text>}
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
});
