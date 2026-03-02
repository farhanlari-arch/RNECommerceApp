import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const HomeCatalogScreen = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const [catRes, prodRes] = await Promise.all([
  //       axios.get("https://fakestoreapiserver.reactbd.org/api/categories"),
  //       axios.get("https://fakestoreapiserver.reactbd.org/api/products"),
  //     ]);
  //     setCategories([{ name: "All" }, ...catRes.data]); // Adding a default 'All' category
  //     setProducts(prodRes.data);
  //     setFilteredProducts(prodRes.data);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch("https://fakestoreapiserver.reactbd.org/api/categories"),
        fetch("https://fakestoreapiserver.reactbd.org/api/products"),
      ]);

      var categoriesData = await catRes.json();
      var productsData = await prodRes.json();
      categoriesData = categoriesData.data; // Adjust based on actual API response structure
      productsData = productsData.data; // Adjust based on actual API response structure

      // 🛑 SAFETY CHECK: Log the data to see exactly what you're getting
      console.log("Categories Received:", categoriesData);
      console.log("Products Received:", productsData);

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

  const ProductCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImg} />
      <View style={styles.cardInfo}>
        <Text numberOfLines={1} style={styles.productTitle}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading)
    return <ActivityIndicator size="large" color="#000" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
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
              onPress={() => setActiveCat(cat.name)}
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
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 15,
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
