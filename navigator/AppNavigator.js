import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalStyle } from "../constant/styles";
import { useAuth } from "../context/AuthContext";
import CartScreen from "../screens/CartScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import HomeCatalogScreen from "../screens/HomeCatalogScreen";
import LoginScreen from "../screens/LoginScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignupScreen from "../screens/SignupScreen";
import WishlistScreen from "../screens/WishlistScreen";
import IconButtons from "../ui/IconButtons";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function BottomViewSetUp({}) {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: GlobalStyle.color.white },
        tabBarActiveTintColor: GlobalStyle.color.activeTint,
        tabBarInactiveTintColor: GlobalStyle.color.inactiveTint,
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
        tabBarItemStyle: {
          marginTop: 6, // Ensure no internal margin
        },
        tabBarStyle: {
          height: 60, // Set a fixed height to prevent jumping
          paddingBottom: 5,
        },
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
            <Ionicons name="home-outline" color={color} size={size} />
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
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Cart",
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={color} size={size} />
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
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function AppNavigator() {
  const { userToken } = useAuth(); // ✅ This works now!

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyle.color.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyle.color.primary500 },
        tabBarActiveTintColor: GlobalStyle.color.accent500,
      }}
    >
      {userToken == null ? (
        // AUTH STACK: User is logged out
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              title: "Login",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignupScreen}
            options={{
              title: "SignUp",
              headerTitleAlign: "center",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        // MAIN STACK: User is logged in
        <>
          <Stack.Screen
            name="BottomTabs"
            component={BottomViewSetUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetail"
            options={{ headerShown: false }}
            component={ProductDetailsScreen}
          />
          <Stack.Screen
            name="PlaceOrder"
            component={CheckoutScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderSuccess"
            component={OrderSuccessScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderHistory"
            component={OrdersScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderDetail"
            component={OrderDetailScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
