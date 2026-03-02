import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

const UpdateAddress = ({ navigation }) => {
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (key, value) => {
    setAddress({ ...address, [key]: value });
  };

  const placeOrder = () => {
    const emptyField = Object.values(address).some(
      (value) => value.trim() === "",
    );

    if (emptyField) {
      Alert.alert("Error", "Please fill all address fields");
      return;
    }

    navigation.navigate("OrderSuccess");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Plot/House No"
          value={address.name}
          onChangeText={(text) => handleChange("name", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={address.street}
          onChangeText={(text) => handleChange("street", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={address.city}
          onChangeText={(text) => handleChange("city", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="State"
          value={address.state}
          onChangeText={(text) => handleChange("state", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="ZIP Code"
          value={address.zip}
          keyboardType="number-pad"
          onChangeText={(text) => handleChange("zip", text)}
        />
      </ScrollView>
      <TouchableOpacity style={styles.placeOrderBtn} onPress={placeOrder}>
        <Text style={styles.placeOrderText}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateAddress;

/* -------- Styles -------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  placeOrderBtn: {
    backgroundColor: "#647a67",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
