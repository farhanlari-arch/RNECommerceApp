import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const placeHolderImage = require("../assets/atom.png");

const ViewProfileScreen = () => {
  // Mock user data
  const userData = {
    username: "dev_jdoe",
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 React Lane, Expo City, 56789",
    phone: "+1 (555) 000-1234",
    company: "Tech Solutions Inc.",
  };

  // Reusable component for each info row
  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView edges={["bottom", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            // source={{ uri: "https://via.placeholder.com" }}
            source={placeHolderImage}
            style={styles.avatar}
          />
          <Text style={styles.username}>@{userData.username}</Text>
        </View>

        {/* Profile Details Section */}
        <View style={styles.detailsContainer}>
          <InfoRow label="Full Name" value={userData.name} />
          <InfoRow label="Email" value={userData.email} />
          <InfoRow label="Phone" value={userData.phone} />
          <InfoRow label="Company" value={userData.company} />
          <InfoRow label="Address" value={userData.address} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
  detailsContainer: {
    padding: 20,
  },
  infoRow: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default ViewProfileScreen;
