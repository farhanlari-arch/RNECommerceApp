import React, { useState, useMemo, useEffect, use } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // Ensure @expo/vector-icons is installed
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CART_API_URL } from "../constant/AppConstant";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { GlobalStyle } from "../constant/styles";

const TAX_RATE = 0.08; // 8% mock tax

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const isFocused = useIsFocused();
  const { userToken } = useAuth(); // Destructure userToken from the hook

  // 1. Load data from db.json
  const fetchCart = async () => {
    try {
      const response = await fetch(CART_API_URL + `?userId=${userToken?.id}`);
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    if (isFocused) fetchCart();
  }, [isFocused]);

  /* -------- Calculations -------- */
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  /* -------- API Actions (Syncing with db.json) -------- */

  const updateQuantityOnServer = async (id, newQty) => {
    try {
      const item = cartItems.find((i) => i.id === id);
      await fetch(`${CART_API_URL}/${id}`, {
        method: "PATCH", // PATCH only updates the fields we send
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty }),
      });
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const incrementQty = (id) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + 1;
          updateQuantityOnServer(id, newQty);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const decrementQty = (id) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id && item.quantity > 1) {
          const newQty = item.quantity - 1;
          updateQuantityOnServer(id, newQty);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const removeItem = (id) => {
    Alert.alert("Remove Item", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          await fetch(`${CART_API_URL}/${id}`, { method: "DELETE" });
          setCartItems((items) => items.filter((item) => item.id !== id));
        },
      },
    ]);
  };

  const checkoutHandler = () => {
    navigation.navigate("PlaceOrder", { cartItems, total });
  };

  /* -------- Render Item -------- */
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => decrementQty(item.id)}
          >
            <Text style={styles.qtyText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => incrementQty(item.id)}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
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
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 40 }} />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Your cart is empty</Text>
        }
      />

      {/* Summary */}
      {cartItems.length > 0 && (
        <View style={styles.summary}>
          <View style={styles.row}>
            <Text>Subtotal</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text>Tax (8%)</Text>
            <Text>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>${total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={checkoutHandler}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

/* -------- Styles -------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  iconCircle: { padding: 8, backgroundColor: "#f5f5f5", borderRadius: 25 },
  item: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
    color: "#4A90E2",
    marginVertical: 4,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  qtyBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
  },
  qtyText: {
    fontSize: 18,
  },
  qty: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  remove: {
    marginLeft: 15,
    color: "red",
    fontSize: 12,
  },
  summary: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
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
  checkoutBtn: {
    backgroundColor: GlobalStyle.color.activeTint,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
});
