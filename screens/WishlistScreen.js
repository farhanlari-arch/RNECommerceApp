import React, { useEffect, useState } from "react";
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
import { useIsFocused } from "@react-navigation/native";
import { CART_API_URL, WISHLIST_API_URL } from "../constant/AppConstant";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useAuth(); // Destructure userToken from the hook

  // Initialize the focus hook
  const isFocused = useIsFocused();

  // 1. Fetch data on load
  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        WISHLIST_API_URL + `?userId=${userToken?.id}`,
      );
      const data = await response.json();
      setWishlist(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchWishlist();
    }
  }, [isFocused]);

  // 2. Remove Item and Refresh UI
  const removeFromWishlist = async (id) => {
    try {
      const response = await fetch(`${WISHLIST_API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Option A: Filter the state (Faster, no network reload needed)
        setWishlist((prevList) => prevList.filter((item) => item.id !== id));

        // Option B: Re-fetch from server (Slower, but ensures sync)
        // fetchWishlist();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const addToCart = async (product) => {
    try {
      // 1. Fetch current cart to check for duplicates
      const response = await fetch(CART_API_URL + `?userId=${userToken?.id}`);
      const cartItems = await response.json();

      const existingItem = cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        // 2. If it exists, UPDATE the quantity (PUT)
        // await fetch(`${CART_API_URL}/${product.id}`, {
        //   method: "PUT",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     ...existingItem,
        //     quantity: (existingItem.quantity || 1) + 1,
        //   }),
        // });
        alert("This product is already in your cart! 🛒");
      } else {
        // 3. If it's new, ADD it (POST)
        await fetch(CART_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...product,
            quantity: 1, // Initialize quantity
            oldPrice: Number(product.oldPrice), // Safety for your .toFixed()
          }),
        });
        alert("Added to cart! 🛒");
      }
    } catch (error) {
      console.error("Cart Error:", error);
    }
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => removeFromWishlist(item.id)}
        style={styles.heartButton}
      >
        <Ionicons name="heart" size={28} color="#FF4D4D" />
      </TouchableOpacity>
    </Pressable>
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
        <Text style={styles.headerTitle}>Wish List</Text>
        <View style={{ width: 40 }} />
      </View>
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
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  iconCircle: { padding: 8, backgroundColor: "#f5f5f5", borderRadius: 25 },
  listContent: { paddingHorizontal: 15 },
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
