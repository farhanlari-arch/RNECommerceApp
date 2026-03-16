import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CART_API_URL, ORDER_API_URL } from "../constant/AppConstant";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { useIsFocused } from "@react-navigation/native";

const TAX_RATE = 0.08; // 8% mock tax

const CheckoutScreen = ({ navigation }) => {
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

  const placeOrder = async () => {
    console.log("called");

    const itemsForOrder = cartItems.map((item) => ({
      id: item.id, // Mapping id to productID
      title: item.title, // Mapping title to name
      image: item.image, // Keeping image
      quantity: item.quantity, // Keeping quantity
      price: item.price, // Keeping price
    }));
    const orderData = {
      orderID: Date.now(), // Unique number based on timestamp
      userId: userToken.id,
      orderDate: new Date().toISOString().split("T")[0], // Formats to "2026-03-15"
      status: "Pending",
      subtotal: subtotal,
      tax: tax,
      total: total,
      items: itemsForOrder,
      shippingAddress: userToken.address,
    };
    try {
      const response = await fetch(ORDER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        // NEXT STEP: Clear the cart in your db.json or state
        clearStandaloneCart();
        navigation.navigate("OrderSuccess");
      } else {
        alert("❌ Failed to place order.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("📡 Network error occurred.");
    }
  };

  const clearStandaloneCart = async () => {
    try {
      // 1. Find all items in the cart for this user
      const res = await fetch(CART_API_URL + `?userId=${userToken?.id}`);

      const items = await res.json();

      // 2. Map through and create an array of delete promises
      const deletePromises = items.map((item) =>
        fetch(CART_API_URL + `/${item.id}`, {
          method: "DELETE",
        }),
      );

      // 3. Run all deletes at once
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const renderHeader = () => (
    <View>
      {/* Custom Navigation Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Shipping Address Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        {/* <TouchableOpacity>
          <Text style={styles.editBtn}>Edit</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.addressCard}>
        <View style={styles.iconCircle}>
          <Ionicons name="location-outline" size={20} color="#007953" />
        </View>
        <View style={styles.addressInfo}>
          <Text style={styles.nameText}>{userToken?.fullName}</Text>
          <Text style={styles.phoneText}>{userToken?.phone}</Text>
          <Text style={styles.addressDetail}>
            {userToken?.address}, {userToken?.city}
          </Text>
        </View>
      </View>

      {/* Order Summary Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        {/* <TouchableOpacity>
          <Text style={styles.editBtn}>Edit</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      {/* <Text style={styles.sectionTitle}>Voucher</Text>
      <View style={styles.voucherContainer}>
        <TextInput
          style={styles.voucherInput}
          placeholder="Enter voucher code..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.useBtn}>
          <Text style={styles.useBtnText}>Use</Text>
        </TouchableOpacity>
      </View> */}

      {/* New Price Breakdown Section */}
      <View style={styles.priceBreakdown}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Subtotal</Text>
          <Text style={styles.priceValue}>$ {subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Tax (8%)</Text>
          <Text style={styles.priceValue}>$ {tax.toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Shipping</Text>
          <Text style={styles.freeText}>Free</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalValue}>$ {total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.paymentBtn} onPress={() => placeOrder()}>
        <Text style={styles.paymentBtnText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productSub}>{item.subtitle}</Text>
        <Text style={styles.productPrice}>
          $ <Text style={{ fontSize: 18 }}>{item.price}</Text>
        </Text>
      </View>
      <Text style={styles.qtyText}>x {item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 12,
  },
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#333" },
  editBtn: {
    color: "#D81B60",
    backgroundColor: "#FFF0F5",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  addressCard: { flexDirection: "row", marginBottom: 20 },
  nameText: { fontWeight: "bold", color: "#444" },
  phoneText: { color: "#777", marginVertical: 4 },
  addressDetail: { color: "#777", lineHeight: 18 },
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
  footerContainer: { marginTop: 20 },
  voucherContainer: { flexDirection: "row", marginTop: 10, marginBottom: 30 },
  voucherInput: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  useBtn: {
    backgroundColor: "#FFF0F5",
    marginLeft: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
  },
  useBtnText: { color: "#007953", fontWeight: "bold" },
  paymentBtn: {
    backgroundColor: "#007953",
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentBtnText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  priceBreakdown: {
    backgroundColor: "#FAFAFA",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  priceLabel: {
    color: "#777",
    fontSize: 14,
  },
  priceValue: {
    color: "#333",
    fontWeight: "600",
  },
  freeText: {
    color: "#27AE60", // Green for "Free"
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007953",
  },
});

export default CheckoutScreen;
