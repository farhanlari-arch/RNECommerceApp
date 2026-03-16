import Checkbox from "expo-checkbox"; // Required library for checkbox
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { USER_API_URL } from "../constant/AppConstant"; // Import the API URL constant
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { AnalyticsService } from "../service/AnalyticsService";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth(); // Get the login function from context

  const googleIcon = require("../assets/google_icon.png");

  const handleLogin = async () => {
    try {
      // Logging events
      handleLogs("Login Button Clicked");
      // 1. Fetch user where email matches (case-insensitive check is safer)
      const response = await fetch(
        `${USER_API_URL}?email=${email.toLowerCase()}`,
      );
      const data = await response.json();

      // JSON Server always returns an ARRAY when filtering
      if (data.length === 0) {
        Alert.alert("Login Failed", "No account found with this email.");
        return;
      }

      const foundUser = data[0]; // Get the first (and should be only) matching user

      // 2. Verify Password
      if (foundUser.password === password) {
        // 3. SUCCESS: Set the token using AuthContext
        // You can pass the whole object or just the ID
        login(foundUser);
        // don't manually navigate to routes that appear conditionally based on auth state
        // Navigation will automatically switch when userToken is set
      } else {
        Alert.alert("Login Failed", "Incorrect password. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Network Error", "Could not connect to the server.");
    }
  };

  const handleSignup = () => {
    handleLogs("SignUp Button Clicked");
    console.log("Navigate to Signup screen");
    navigation.navigate("SignUp");
  };

  const handleForgotPassword = () => {
    handleLogs("Forgot Password Button Clicked");
    console.log("Navigate to Forgot Password screen");
    navigation.navigate("ChangePassword");
  };

  const handleLogs = async (message) => {
    // Log the attempt
    AnalyticsService.logEvent(`Login Screen : ${message}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.cardContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Login</Text>

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

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
            {/* <Ionicons
              name={showPassword ? "🙈" : "👁️"}
              size={24}
              color="#999"
            /> */}
            <Text style={styles.eye}>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        {/* Remember me and Forget Password section */}
        <View style={styles.actionRow}>
          {/* <View style={styles.checkboxContainer}>
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? "#409cff" : undefined}
              style={styles.checkbox}
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View> */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgetPasswordText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
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

        {/* Account creation link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have account? </Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.createAccountText}>CREATE NEW ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContent: {
    padding: 30,
    paddingBottom: 50,
    marginTop: 50,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
  },
  input: {
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
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  eye: {
    fontSize: 18,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: { marginRight: 8 },
  rememberMeText: { fontSize: 14, color: "#333" },
  forgetPasswordText: { fontSize: 14, color: "#409cff" },
  loginButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    color: "#4A90E2",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#409cff",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  loginButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
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
  googleIcon: { width: 42, height: 42 },
  googleButtonText: { color: "#333", fontSize: 16, fontWeight: "bold" },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  footerText: { fontSize: 14, color: "#999" },
  createAccountText: { color: "#409cff", fontSize: 14, fontWeight: "bold" },
});
