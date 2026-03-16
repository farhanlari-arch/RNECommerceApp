import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider
import AppNavigator from "./navigator/AppNavigator"; // Path to my new navigator file

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        {/* AppNavigator now has access to useAuth() */}
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
