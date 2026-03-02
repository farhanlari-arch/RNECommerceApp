import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CategorySelector from "../component/CategorySelector";

/* -------- Component -------- */
const HomeCatalogScreen = () => {
  const [productsList, setProductsList] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const PAGE_SIZE = 10;

  const getApiData = async () => {
    const url = "https://fakestoreapiserver.reactbd.org/api/categories";

    const result = await fetch(url);
    const result1 = await result.json();
    setData(result1.data);
  };

  const getProductData = async () => {
    try {
      const url = "https://fakestoreapiserver.reactbd.org/api/products";
      const result = await fetch(url);
      const productList = await result.json();
      console.log(productList.data);
      setProductsList(productList.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    getProductData();
  }, []);

  // if (isLoading) {
  //   return (
  //     <View style={styles.center}>
  //       <ActivityIndicator size="large" color="#6A9AB0" />
  //     </View>
  //   );
  // }

  useEffect(() => {
    loadProducts(1, true);
  }, []);

  const loadProducts = (pageNumber, reset = false) => {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      const start = (pageNumber - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const newItems = productsList.slice(start, end);
      console.log("Newwwwwwwww");
      console.log(productsList);

      setProducts(reset ? newItems : [...products, ...newItems]);
      setPage(pageNumber);
      setLoadingMore(false);
      setRefreshing(false);
    }, 800);
  };

  /* -------- Filtering -------- */
  const filteredProducts = products.filter((item) => {
    const matchName = item.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || item.category === category;
    return matchName && matchCategory;
  });

  // This is the callback function passed to the child
  const handleIdSelection = (id) => {
    setSelectedId(id);
    console.log(id);
  };

  /* -------- Render Product -------- */
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search */}
      <TextInput
        style={styles.search}
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Category Filter */}
      <CategorySelector categories={data} onSelect={handleIdSelection} />

      {/* Product Grid */}
      <FlatList
        data={products}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        numColumns={2}
        // columnWrapperStyle={{ justifyContent: "space-between" }}
        // refreshing={refreshing}
        // onRefresh={() => {
        //   setRefreshing(true);
        //   loadProducts(1, true);
        // }}
        // onEndReached={() => loadProducts(page + 1)}
        // onEndReachedThreshold={0.3}
        // ListFooterComponent={loadingMore && <ActivityIndicator size="small" />}
      />
    </View>
  );
};

export default HomeCatalogScreen;

/* -------- Styles -------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff",
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  categoryBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  categoryText: {
    fontSize: 12,
    color: "#333",
  },
  activeText: {
    color: "#fff",
  },
  card: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
    color: "#4A90E2",
    marginTop: 4,
  },
});
