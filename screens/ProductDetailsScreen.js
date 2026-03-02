import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

/* -------- Mock Product -------- */
const PRODUCT = {
  id: 1,
  title: "Wireless Headphones",
  price: 99.99,
  description:
    "High quality wireless headphones with noise cancellation and long battery life.",
  images: [
    "https://via.placeholder.com/400x300",
    "https://via.placeholder.com/401x300",
    "https://via.placeholder.com/402x300",
  ],
  options: {
    color: ["Black", "White", "Blue"],
  },
};

const ProductDetailsScreen = ({ route, navigation }) => {
  const [selectedImage, setSelectedImage] = useState(PRODUCT.images[0]);
  const [selectedColor, setSelectedColor] = useState(null);

  const addToCart = () => {
    if (!selectedColor) {
      Alert.alert("Please select a color");
      return;
    }

    Alert.alert("Added to Cart", `${PRODUCT.title} (${selectedColor})`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Main Image */}
      <Image source={{ uri: selectedImage }} style={styles.mainImage} />

      {/* Image Gallery */}
      <FlatList
        data={PRODUCT.images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.gallery}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedImage(item)}>
            <Image
              source={{ uri: item }}
              style={[
                styles.thumbnail,
                selectedImage === item && styles.activeThumbnail,
              ]}
            />
          </TouchableOpacity>
        )}
      />

      {/* Product Info */}
      <View style={styles.info}>
        <Text style={styles.title}>{PRODUCT.title}</Text>
        <Text style={styles.price}>${PRODUCT.price}</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{PRODUCT.description}</Text>

        {/* Options */}
        <Text style={styles.sectionTitle}>Color</Text>
        <View style={styles.optionRow}>
          {PRODUCT.options.color.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.optionBtn,
                selectedColor === color && styles.activeOption,
              ]}
              onPress={() => setSelectedColor(color)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedColor === color && styles.activeOptionText,
                ]}
              >
                {color}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add to Cart */}
        <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

/* -------- Styles -------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainImage: {
    width: "100%",
    height: 280,
  },
  gallery: {
    padding: 10,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeThumbnail: {
    borderColor: "#4A90E2",
    borderWidth: 2,
  },
  info: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    color: "#4A90E2",
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
    marginBottom: 8,
  },
  activeOption: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  optionText: {
    fontSize: 14,
  },
  activeOptionText: {
    color: "#fff",
  },
  cartButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  cartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
