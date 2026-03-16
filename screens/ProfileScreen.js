import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyle } from "../constant/styles";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { AnalyticsService } from "../service/AnalyticsService";

function ProfileScreen({ navigation }) {
  const { logout } = useAuth(); // Get the logout function from context
  const { userToken } = useAuth(); // Destructure userToken from the hook

  const logoutIcon = require("../assets/logout.png");

  function handleLogout() {
    console.log("Logout clicked");
    AnalyticsService.clearLogs();

    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel", // Android: shows as a secondary action; iOS: bold
      },
      {
        text: "Logout",
        onPress: () => logout(), // Your AuthContext logout function
      },
    ]);
  }

  // This function receives the 'id' from whichever button was tapped
  const handleButtonPress = (action) => {
    if (action === "ViewOrders") {
      navigation.navigate("OrderHistory");
    } else if (action === "SendLogs") {
      sendLogsViaEmail();
    }
  };

  const sendLogsViaEmail = async () => {
    console.log("via email");
    AnalyticsService.exportLogs();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. TOP VIEW (Scrollable Content) */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconCircle}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Image source={logoutIcon} style={styles.googleIcon} />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{userToken?.fullName}</Text>
          <Text style={styles.location}>{userToken?.city}</Text>
        </View>

        {/* Info Rows */}
        <View style={styles.infoContainer}>
          <InfoRow
            icon="phone-outline"
            label="Mobile Phone"
            value={userToken?.phone || "N/A"}
          />
          <InfoRow
            icon="email-outline"
            label="Email Address"
            value={userToken?.email || "N/A"}
          />
          <InfoRow
            icon="map-marker-outline"
            label="Address"
            value={userToken?.address || "N/A"}
          />
        </View>

        {/* Horizontal Section */}
        <View
          style={{
            flex: "1",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <OrderCard
            name="My Orders"
            onPress={handleButtonPress}
            actionType="ViewOrders"
          />
          <OrderCard
            name="Send App Logs"
            onPress={handleButtonPress}
            actionType="SendLogs"
          />
          {/* <OrderCard name="Omber Coffee" category="Beverages" color="#000" /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Sub-components
const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconBox}>
      <MaterialCommunityIcons name={icon} size={24} color="#007953" />
    </View>
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const OrderCard = ({ name, onPress, actionType }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(actionType)}>
    <View>
      <Text style={styles.cardName}>{name}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 20, paddingBottom: 100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  iconCircle: { padding: 8, backgroundColor: "#f5f5f5", borderRadius: 25 },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  profileSection: { alignItems: "center", marginBottom: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 15 },
  userName: { fontSize: 28, fontWeight: "bold", color: "#1a1a1a" },
  location: { color: "#007953", fontSize: 16, marginTop: 5 },
  infoContainer: { marginVertical: 20 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  infoIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoLabel: { fontSize: 12, color: "#999", marginBottom: 2 },
  infoValue: { fontSize: 16, fontWeight: "500", color: "#333" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  horizontalScroll: { paddingLeft: 0 },
  card: {
    /* Shape & Border */
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#059669", // Emerald 600

    /* Background & Spacing */
    backgroundColor: GlobalStyle.color.activeTint,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",

    /* Shadow (iOS) */
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    /* Shadow (Android) */
    elevation: 3,
  },
  cardName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  cardCat: { color: "#ddd", fontSize: 14, marginTop: 4 },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingBottom: 10,
  },
  activeNavCircle: { backgroundColor: "#007953", padding: 8, borderRadius: 25 },
  googleIcon: { width: 24, height: 24 },
});

export default ProfileScreen;
