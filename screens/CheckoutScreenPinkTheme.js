import React from "react";
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

const DATA = [
  {
    id: "1",
    title: "Scarlett Whitening",
    subtitle: "Brightly Serum",
    price: "10,3",
    qty: 1,
    image: "https://via.placeholder.com/100", // Replace with actual product image
  },
  {
    id: "2",
    title: "Ponds White Series",
    subtitle: "4 Products",
    price: "21,93",
    qty: 1,
    image: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    title: "Emina Bright Stuff",
    subtitle: "Face Serum",
    price: "11,56",
    qty: 2,
    image: "https://via.placeholder.com/100",
  },
];

const CheckoutScreenPinkTheme = () => {
  const calculateTotal = () => {
    return DATA.reduce((sum, item) => {
      // Convert "10,3" to 10.3
      const priceNum = parseFloat(item.price.replace(",", "."));
      return sum + priceNum * item.qty;
    }, 0)
      .toFixed(2)
      .replace(".", ","); // Convert back to "43,42" format
  };
  const renderHeader = () => (
    <View>
      {/* Custom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#D81B60" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Check Out</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Shipping Address Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <TouchableOpacity>
          <Text style={styles.editBtn}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addressCard}>
        <View style={styles.iconCircle}>
          <Ionicons name="location-outline" size={20} color="#D81B60" />
        </View>
        <View style={styles.addressInfo}>
          <Text style={styles.nameText}>Jelly Grande</Text>
          <Text style={styles.phoneText}>+62 8123-4567-8910</Text>
          <Text style={styles.addressDetail}>
            871 Kenangan Street (between Jones & Leavenworth St), San Francisco
          </Text>
        </View>
      </View>

      {/* Order Summary Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <TouchableOpacity>
          <Text style={styles.editBtn}>Edit</Text>
        </TouchableOpacity>
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
          <Text style={styles.priceValue}>$ {calculateTotal()}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Shipping</Text>
          <Text style={styles.freeText}>Free</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalValue}>$ {calculateTotal()}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.paymentBtn}>
        <Text style={styles.paymentBtnText}>Go to Payment</Text>
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
      <Text style={styles.qtyText}>x {item.qty}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  listContent: { padding: 20 },
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
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
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
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF0F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
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
    backgroundColor: "#FFF0F5",
  },
  productDetails: { flex: 1, marginLeft: 15 },
  productTitle: { fontSize: 15, fontWeight: "600" },
  productSub: { color: "#999", marginVertical: 4 },
  productPrice: { fontWeight: "bold", color: "#333" },
  qtyText: { color: "#D81B60", fontWeight: "600" },
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
  useBtnText: { color: "#D81B60", fontWeight: "bold" },
  paymentBtn: {
    backgroundColor: "#DE5D83",
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
    color: "#D81B60",
  },
});

export default CheckoutScreenPinkTheme;
