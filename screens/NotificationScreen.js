import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NOTIFICATIONS_DATA = [
  {
    id: "1",
    title: "Product Added in Cart",
    body: "You have added a product in cart.",
    time: "2m ago",
    read: false,
  },
  {
    id: "2",
    title: "Product Added in Wishlist",
    body: "You have added a product in Wishlist.",
    time: "1h ago",
    read: true,
  },
];

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, !item.read && styles.unreadItem]}
    >
      <View>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No notifications yet.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  itemContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  unreadItem: { backgroundColor: "#f0f7ff" },
  headerRow: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontWeight: "bold", fontSize: 16 },
  time: { color: "#888", fontSize: 12 },
  body: { color: "#444", marginTop: 5 },
  emptyText: { textAlign: "center", marginTop: 50, color: "#999" },
});
