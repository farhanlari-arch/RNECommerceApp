import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { USER_API_URL } from "../constant/AppConstant";

// Retrieve screen dimensions for adaptive sizing
const { width, height } = Dimensions.get("window");
const googleIcon = require("../assets/google_icon.png");

const SignUpScreen = ({ navigation }) => {
  // State variables to hold form input values
  const [fullName, setFullName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Get the login function from context
  const { login } = useAuth();

  const handleSignup = async () => {
    console.log("Name:", fullName);
    console.log("Mobile No:", mobileNo);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Full Address:", fullAddress);
    // 1. Basic Validation
    if (
      !fullName ||
      !mobileNo ||
      !email ||
      !password ||
      !fullAddress ||
      mobileNo.length !== 10
    ) {
      Alert.alert("Error", "Please fill valid information in all fields");
      return;
    }
    try {
      // 1. CHECK IF EMAIL EXISTS
      // We append ?email= to the URL to ask JSON Server to filter
      const checkResponse = await fetch(
        `${USER_API_URL}?email=${email.toLowerCase()}`,
      );
      const existingUsers = await checkResponse.json();
      if (existingUsers.length > 0) {
        // If the array has any items, the email is already taken
        Alert.alert(
          "Registration Failed",
          "This email is already registered. Please login instead.",
        );
        return; // Stop the function here
      }

      // 3. Perform the POST request
      const response = await fetch(USER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName,
          phone: mobileNo,
          email: email,
          password: password, // Note: In a real app, never store plain-text passwords!
          address: fullAddress,
          city: "Gurgaon, India", // You can enhance this by parsing the address or adding a separate city field
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        // Don't manually navigate to routes that appear conditionally based on auth state
        // Navigation will automatically switch when userToken is set
        login(
          JSON.stringify({
            fullName: fullName,
            phone: mobileNo,
            email: email,
            password: password, // Note: In a real app, never store plain-text passwords!
            address: fullAddress,
            city: "Gurgaon, India", // You can enhance this by parsing the address or adding a separate city field
          }),
        );
      } else {
        Alert.alert("Error", "Failed to save user data");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Network Error", "Could not connect to JSON Server");
    }
  };

  const handleLogin = () => {
    console.log("Navigate to Login screen");
    navigation.popToTop();
    // popToTop clears everything above the initial route in the current stack.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconCircle} onPress={handleLogin}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 2. SCROLLABLE ACCOUNT CARD */}

      <ScrollView
        contentContainerStyle={styles.cardContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card Title and Input Fields */}

        <View style={styles.formContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.inputLabel}>Mobile No.</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Mobile No"
            maxLength={10}
            inputMode="tel"
            value={mobileNo}
            onChangeText={setMobileNo}
          />

          <Text style={styles.inputLabel}>E-mail ID</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email id"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.inputLabel}>Password</Text>

          {/* Password Input with Eye Button */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eye}>{showPassword ? "🙈" : "👁️"}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Address</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Address"
            value={fullAddress}
            onChangeText={setFullAddress}
          />
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleSignup}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Or</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Social login option */}
        <TouchableOpacity style={styles.googleButton}>
          <Image source={googleIcon} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Login link for existing users */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  topImageSection: {
    height: height * 0.4,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  backgroundImage: { width: "100%", height: "100%" },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  logoTagline: { position: "absolute", bottom: 30, left: 20 },
  logoText: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  taglineText: { fontSize: 16, color: "#ddd" },
  loginCard: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: height * 0.35, // Push the card content down below the image banner overlay
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardContent: {
    padding: 30,
    paddingBottom: 50,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
  },
  formContainer: { gap: 6 },
  inputLabel: { fontSize: 14, color: "#333" },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
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
  registerButton: {
    backgroundColor: "#409cff",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  registerButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  separator: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  separatorLine: { flex: 1, height: 1, backgroundColor: "#eee" },
  separatorText: { color: "#bbb", marginHorizontal: 15 },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#eee",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 15,
  },
  googleIcon: { width: 24, height: 24 },
  googleButtonText: { color: "#333", fontSize: 16, fontWeight: "bold" },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  footerText: { fontSize: 14, color: "#999" },
  loginText: { color: "#409cff", fontSize: 14, fontWeight: "bold" },
});

export default SignUpScreen;
