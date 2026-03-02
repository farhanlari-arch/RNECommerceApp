import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

/* -------- Mock Cart Data -------- */
const INITIAL_CART = [
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

const TAX_RATE = 0.08; // 8% mock tax

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  /* -------- Calculations -------- */
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  /* -------- Cart Actions -------- */
  const incrementQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    Alert.alert("Remove Item", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () =>
          setCartItems((items) => items.filter((item) => item.id !== id)),
      },
    ]);
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
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Your cart is empty</Text>
        }
      />

      {/* Summary */}
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

        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

/* -------- Styles -------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    backgroundColor: "#4CAF50",
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
