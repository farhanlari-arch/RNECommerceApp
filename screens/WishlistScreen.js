import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure @expo/vector-icons is installed
import { SafeAreaView } from "react-native-safe-area-context";

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([
    {
      id: "1",
      name: "Wireless Headphones",
      price: "$99",
      image:
        "https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817602.jpg",
    },
    {
      id: "2",
      name: "Smart Watch Series 7",
      price: "$299",
      image:
        "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg",
    },
    {
      id: "3",
      name: "Leather Messenger Bag",
      price: "$150",
      image:
        "https://img.freepik.com/premium-photo/portable-wireless-speaker-isolated-white-background_139820-883.jpg",
    },
  ]);

  const removeItem = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetail", { order: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => removeItem(item.id)}
        style={styles.heartButton}
      >
        <Ionicons name="heart" size={28} color="#FF4D4D" />
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.container}>
      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-dislike-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Your wishlist is empty!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  listContent: { padding: 15 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
  details: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600", color: "#333" },
  itemPrice: { fontSize: 14, color: "#888", marginVertical: 4 },
  addToCartBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  addToCartText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  heartButton: { padding: 5 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { marginTop: 10, fontSize: 18, color: "#999" },
});

export default WishlistScreen;
