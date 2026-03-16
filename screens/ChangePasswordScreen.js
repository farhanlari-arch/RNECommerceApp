import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { USER_API_URL } from "../constant/AppConstant";

const ChangePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleBackButton = () => {
    console.log("Navigate to Login screen");
    navigation.popToTop();
    // popToTop clears everything above the initial route in the current stack.
  };

  const handleChangePassword = async () => {
    // Basic Validation
    if (!email || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      // 1. Find the user by email to get their ID
      const findResponse = await fetch(
        `${USER_API_URL}?email=${email.toLowerCase()}`,
      );
      const users = await findResponse.json();

      if (users.length === 0) {
        Alert.alert("Error", "No user found with this email.");
        return;
      }

      const userId = users[0].id;

      // 2. Update only the password using PATCH
      const updateResponse = await fetch(`${USER_API_URL}/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword, // Only the password will be changed
        }),
      });

      if (updateResponse.ok) {
        handleSuccess();
      } else {
        Alert.alert("Error", "Failed to update password.");
      }

      // Clear fields after success
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      Alert.alert("Network Error", "Check your server connection.");
    }
  };

  const handleSuccess = () => {
    Alert.alert(
      "Success", // Title
      "Your password has been changed.", // Message
      [
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
            // Place your callback logic here, e.g.:
            navigation.popToTop();
          },
        },
      ],
      { cancelable: false }, // Prevents closing by tapping outside
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={handleBackButton}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Forgot Password</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.cardContent}>
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Email</Text>

            {/* Password Input with Eye Button */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <Text style={styles.inputLabel}>New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eye}>{showPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eye}>{showPassword ? "🙈" : "👁️"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  iconCircle: { padding: 8, backgroundColor: "#f5f5f5", borderRadius: 25 },
  cardContent: {
    padding: 30,
    paddingBottom: 50,
    justifyContent: "center",
  },
  formContainer: { gap: 6 },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  eye: {
    fontSize: 18,
  },
  innerContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#409cff",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ChangePasswordScreen;
