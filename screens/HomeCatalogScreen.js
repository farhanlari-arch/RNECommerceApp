import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import {
  CATEGORY_API_URL,
  PRODUCT_API_URL,
  CART_API_URL,
} from "../constant/AppConstant";
//import axios from "axios";

const HomeCatalogScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const { userToken } = useAuth(); // Destructure userToken from the hook

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch(CATEGORY_API_URL),
        fetch(PRODUCT_API_URL),
      ]);

      var categoriesData = await catRes.json();
      var productsData = await prodRes.json();
      // categoriesData = categoriesData.data; // Adjust based on actual API response structure
      // productsData = productsData.data; // Adjust based on actual API response structure

      // 🛑 SAFETY CHECK: Log the data to see exactly what you're getting
      //console.log("Categories Received:", categoriesData);
      // console.log("Products Received:", productsData);

      // Only set state if the data is actually an array
      if (Array.isArray(categoriesData)) {
        setCategories([{ name: "All" }, ...categoriesData]);
      } else {
        console.warn("Categories is not an array!");
      }

      if (Array.isArray(productsData)) {
        setProducts(productsData);
        setFilteredProducts(productsData);
      } else {
        console.warn("Products is not an array!");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  const filterByCategory = (cat) => {
    setSearch(""); // Clear search when category is selected
    setActiveCat(cat);
    if (cat === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (item) => item.category.toLowerCase() === cat.toLowerCase(),
      );
      setFilteredProducts(filtered);
    }
  };

  const addToCart = async (product) => {
    try {
      // 1. Fetch current cart to check for duplicates
      const response = await fetch(CART_API_URL + `?userId=${userToken?.id}`); // Assuming cart items are associated with a userId
      const cartItems = await response.json();

      const existingItem = cartItems.find(
        (item) => item.id === `${userToken?.id}-${product.productID}`,
      );

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
            userId: userToken?.id,
            id: `${userToken?.id}-${product.productID}`,
          }),
        });
        alert("Added to cart! 🛒");
      }
    } catch (error) {
      console.error("Cart Error:", error);
    }
  };

  const showProductDetails = (item) => {
    console.log("Selected Product:", item); // Log the product to ensure it's correct
    navigation.navigate("ProductDetail", { product: item });
  };

  const showProductDetailssss = (item) => () => {
    // To call this function, we would use: onPress={showProductDetailssss(item)}
    // This is a higher-order function that returns a function to be used as an event handler
    // navigation.navigate("ProductDetail", { product: item });
  };

  const ProductCard = ({ item }) => (
    <Pressable style={styles.card} onPress={() => showProductDetails(item)}>
      <Image source={{ uri: item.image }} style={styles.productImg} />
      <View style={styles.cardInfo}>
        <Text numberOfLines={1} style={styles.productTitle}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.addText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );

  if (loading)
    return <ActivityIndicator size="large" color="#000" style={{ flex: 1 }} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header & Search */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search products..."
            style={styles.searchInput}
            value={search}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Horizontal Categories */}
      <View style={{ height: 60 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catList}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => filterByCategory(cat.name)}
              style={[
                styles.catItem,
                activeCat === cat.name && styles.catItemActive,
              ]}
            >
              <Text
                style={[
                  styles.catText,
                  activeCat === cat.name && styles.catTextActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={ProductCard}
        keyExtractor={(item) => item.productID.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 5,
  },
  searchContainer: {
    backgroundColor: "#f1f3f5",
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  searchInput: { height: 45, fontSize: 16 },
  catList: { paddingHorizontal: 20, alignItems: "center" },
  catItem: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  catItemActive: { backgroundColor: "#000" },
  catText: { color: "#666", fontWeight: "600" },
  catTextActive: { color: "#fff" },
  productList: { padding: 10 },
  row: { justifyContent: "space-between" },
  card: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },
  productImg: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginTop: 10,
  },
  cardInfo: { padding: 12 },
  productTitle: { fontWeight: "bold", fontSize: 14, color: "#333" },
  price: { color: "#2ecc71", fontWeight: "bold", marginVertical: 5 },
  addButton: {
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});

export default HomeCatalogScreen;
