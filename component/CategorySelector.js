import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { GlobalStyle } from "../constant/styles";

function CategorySelector({ categories, onSelect }) {
  const [activeId, setActiveId] = useState(1);

  const renderItem = ({ item }) => {
    const isActive = activeId === item._id;

    function setID(id) {
      setActiveId(id);
      onSelect(id);
    }

    return (
      <TouchableOpacity
        onPress={() => setID(item._id)}
        style={[styles.categoryItem, isActive && styles.activeCategoryItem]}
      >
        <Text
          style={[styles.categoryText, isActive && styles.activeCategoryText]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  listPadding: {
    paddingHorizontal: 1,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "transparent",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Elevation for Android
    elevation: 2,
  },
  activeCategoryItem: {
    backgroundColor: GlobalStyle.color.primary700, // Modern Blue
    borderColor: GlobalStyle.color.primary700,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  activeCategoryText: {
    color: "#fff",
  },
});

export default CategorySelector;
