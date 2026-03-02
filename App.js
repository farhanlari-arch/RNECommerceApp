import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { GlobalStyle } from "./constant/styles";
import CartScreen from "./screens/CartScreen";
import HomeCatalogScreen from "./screens/HomeCatalogScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import OrdersScreen from "./screens/OrdersScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignupScreen from "./screens/SignupScreen";
import UpdateAddress from "./screens/UpdateAddress";
import WishlistScreen from "./screens/WishlistScreen";
import IconButtons from "./ui/IconButtons";
import NotificationScreen from "./screens/NotificationScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import ViewProfileScreen from "./screens/ViewProfileScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BottomViewSetUp() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyle.color.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyle.color.primary500 },
        tabBarActiveTintColor: GlobalStyle.color.primary200,
        tabBarInactiveTintColor: "white",
        headerRight: ({ tintColor }) => (
          <IconButtons
            icon="cart"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Cart");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={HomeCatalogScreen}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Home",
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "WishList",
          title: "WishList",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Profile",
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyle.color.primary500 },
            headerTintColor: "white",
            tabBarStyle: { backgroundColor: GlobalStyle.color.primary500 },
            tabBarActiveTintColor: GlobalStyle.color.accent500,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignupScreen}
            options={{ title: "SignUp", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="BottomTabs"
            component={BottomViewSetUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="OrderHistory" component={OrdersScreen} />
          <Stack.Screen name="OrderSucess" component={OrderSuccessScreen} />
          <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
          <Stack.Screen name="UpdateAddress" component={UpdateAddress} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailsScreen} />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen
            name="ViewProfileScreen"
            component={ViewProfileScreen}
          />
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
