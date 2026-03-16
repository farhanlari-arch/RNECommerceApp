import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDiscountLabel } from "../utils/DiscountUtils"; // Import the discount calculation function
import { CART_API_URL, WISHLIST_API_URL } from "../constant/AppConstant";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
// Get screen width for image sizing
const { width } = Dimensions.get("window");

const ProductDetailPage = ({ navigation, route }) => {
  const { product } = route.params; // Get the product data passed from the previous screen
  const [isFavorite, setIsFavorite] = useState(false);
  // Call the function and store the result
  const discountLabel = getDiscountLabel(product.oldPrice, product.price);
  const { userToken } = useAuth(); // Destructure userToken from the hook

  // State for selected storage size
  const [selectedStorage, setSelectedStorage] = useState("1 TB");
  // Specification data
  const storageOptions = ["1 TB", "825 GB", "512 GB"];

  // 1. Check if already wishlisted on Screen Load
  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const response = await fetch(
          WISHLIST_API_URL + `?userId=${userToken?.id}`,
        );
        const data = await response.json();
        // Check if any item in wishlist has the same id
        setIsFavorite(
          data.some(
            (item) => item.id === `${userToken?.id}-${product.productID}`,
          ),
        );
      } catch (error) {
        console.error("Status check failed", error);
      }
    };
    checkWishlistStatus();
  }, [product.productID]);

  // 2. The Toggle Function
  const handleWishlistToggle = async () => {
    try {
      console.log(
        "Toggling wishlist for product ID:",
        isFavorite ? "Removing" : "Adding",
        product.productID,
      );
      if (isFavorite) {
        // REMOVE: Delete from server using the unique ID
        deleteWishlistItem(`${userToken?.id}-${product.productID}`);
      } else {
        // ADD: Post the product to the server
        const response = await fetch(WISHLIST_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...product,
            oldPrice: Number(product.oldPrice), // Clean the data for .toFixed() safety
            userId: userToken?.id, // Associate with user
            id: `${userToken?.id}-${product.productID}`, // Unique ID for user-product combination
          }),
        });
        if (response.ok) {
          setIsFavorite(true); // Update UI
          alert("You have added this item to your wishlist! 💖");
          console.log("Added to wishlist");
        }
      }
    } catch (error) {
      console.error("Toggle failed", error);
    }
  };

  const deleteWishlistItem = async (id) => {
    const url = `${WISHLIST_API_URL}/${id}`;
    console.log("URL for deletion:", url);
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        // Status code 200-299 means success
        alert("You have removed this item from your wishlist! 💔");
        // Optional: Reload the page or update the UI here
        // window.location.reload();
        setIsFavorite(false); // Update UI
      } else {
        // If the ID doesn't exist or server has an issue
        alert("Failed to remove from wishlist.");
      }
    } catch (error) {
      // If the server is offline or there is a network error
      console.error("Delete Request Failed:", error);
      alert("📡 Network Error: Failed to connect to the server.");
    }
  };

  const addToCart = async (product) => {
    try {
      // 1. Fetch current cart to check for duplicates
      const response = await fetch(CART_API_URL + `?userId=${userToken?.id}`);
      const cartItems = await response.json();

      const existingItem = cartItems.find(
        (item) => item.id === `${userToken?.id}-${product.productID}`,
      );

      if (existingItem) {
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
            userId: userToken?.id,
            id: `${userToken?.id}-${product.productID}`, // Unique ID for user-product combination
          }),
        });
        alert("Added to cart! 🛒");
      }
    } catch (error) {
      console.error("Cart Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. FIXED HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerRightActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleWishlistToggle}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={32}
              color={isFavorite ? "red" : "black"}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.headerButton}>
            <Feather name="upload" size={24} color="#333" />
          </TouchableOpacity> */}
        </View>
      </View>

      {/* 2. SCROLLABLE CONTENT */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Large Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product.image,
            }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Title and Sale Badge */}
        <View style={styles.titleSection}>
          <Text style={styles.productTitle}>{product.title}</Text>
        </View>

        {/* Ratings and Reviews */}
        <View style={styles.ratingSection}>
          <View style={styles.saleBadge}>
            {/* Only show the Text component if a discount exists */}
            {discountLabel && (
              <Text style={styles.saleText}>{discountLabel}</Text>
            )}
          </View>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color="#FFA500" />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          </View>
          <View style={styles.recommendBadge}>
            <Ionicons name="thumbs-up" size={16} color="#00C853" />
            <Text style={styles.recommendText}>94%</Text>
          </View>
          <Text style={styles.reviewCount}>117 reviews</Text>
        </View>

        {/* Description Text */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* 3. FIXED BOTTOM ACTIONS */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>
            ${Number(product.oldPrice).toFixed(2)}
          </Text>
          <Text style={styles.currentPrice}>${product.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => addToCart(product)}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerButton: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRightActions: { flexDirection: "row", gap: 15 },
  scrollContent: { paddingTop: 40, paddingBottom: 40, paddingHorizontal: 20 },
  imageContainer: { alignItems: "center" },
  productImage: { width: width * 0.7, height: width * 0.7 },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  productTitle: { fontSize: 28, fontWeight: "bold", color: "#000" },
  saleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FF4D4D",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  saleText: { color: "#fff", fontWeight: "bold" },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 25,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: { color: "#FFA500", fontWeight: "bold" },
  recommendBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  recommendText: { color: "#00C853", fontWeight: "bold" },
  reviewCount: { color: "#999", fontSize: 14 },
  descriptionSection: { marginBottom: 30 },
  descriptionText: { color: "#555", fontSize: 16, lineHeight: 24 },
  specSection: { flexDirection: "row", gap: 15, marginBottom: 20 },
  specButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 1,
    alignItems: "center",
  },
  specButtonActive: { backgroundColor: "#00C853", borderColor: "#00C853" },
  specButtonText: { color: "#333", fontSize: 16, fontWeight: "bold" },
  specButtonTextActive: { color: "#fff" },
  bottomBar: {
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  priceContainer: {},
  originalPrice: {
    fontSize: 16,
    color: "#999",
    textDecorationLine: "line-through",
  },
  currentPrice: { fontSize: 24, fontWeight: "bold", color: "#000" },
  addToCartButton: {
    backgroundColor: "#00C853",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addToCartText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ProductDetailPage;
