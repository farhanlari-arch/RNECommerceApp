import {
  Bell,
  ChevronRight,
  CreditCard,
  LogOut,
  MapPin,
  Settings,
  User,
} from "lucide-react-native";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const placeholderImage = require("../assets/atom.png"); // Local image
const ORDERS = "orders";
const NOTIFICATIONS = "notifications";
const UPDATE_ADDRESS = "updateAddress";
const CHANGE_PASSWORD = "changePassword";
const PERSONAL_INFO = "personalInfo";
const LOGOUT = "logout";

const ProfileScreen = ({ navigation }) => {
  function handleMenuClick(type) {
    console.log(type);
    switch (type) {
      case ORDERS:
        navigation.navigate("OrderHistory");
        break;
      case UPDATE_ADDRESS:
        navigation.navigate("UpdateAddress");
        break;
      case NOTIFICATIONS:
        navigation.navigate("NotificationScreen");
        break;
      case CHANGE_PASSWORD:
        navigation.navigate("ChangePassword");
        break;
      case PERSONAL_INFO:
        navigation.navigate("ViewProfileScreen");
        break;
    }
  }
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            // source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            source={placeholderImage}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Jane Doe</Text>
          <Text style={styles.userHandle}>@janedoe_dev</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View style={styles.menuWrapper}>
          <MenuItem
            icon={<CreditCard size={20} color="#666" />}
            text="Orders"
            onPressAction={() => handleMenuClick(ORDERS)}
          />
          <MenuItem
            icon={<Bell size={20} color="#666" />}
            text="Notifications"
            onPressAction={() => handleMenuClick(NOTIFICATIONS)}
          />
          <MenuItem
            icon={<MapPin size={20} color="#666" />}
            text="Update Address"
            onPressAction={() => handleMenuClick(UPDATE_ADDRESS)}
          />
          <MenuItem
            icon={<Settings size={20} color="#666" />}
            text="Change Password"
            onPressAction={() => handleMenuClick(CHANGE_PASSWORD)}
          />
          <MenuItem
            icon={<User size={20} color="#666" />}
            text="Personal Information"
            onPressAction={() => handleMenuClick(PERSONAL_INFO)}
          />
          <MenuItem
            icon={<LogOut size={20} color="#FF3B30" />}
            text="Logout"
            onPressAction={() => handleMenuClick(LOGOUT)}
            hideChevron
            isLast
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper component for menu items
const MenuItem = ({ icon, text, hideChevron, isLast, onPressAction }) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}
    onPress={onPressAction}
  >
    <View style={styles.menuItemLeft}>
      {icon}
      <Text
        style={[styles.menuItemText, text === "Logout" && { color: "#FF3B30" }]}
      >
        {text}
      </Text>
    </View>
    {!hideChevron && <ChevronRight size={18} color="#CCC" />}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
  },
  profileImage: { width: 128, height: 128, borderRadius: 10, marginBottom: 15 },
  userName: { fontSize: 22, fontWeight: "700", color: "#1A1A1A" },
  userHandle: { fontSize: 14, color: "#666", marginBottom: 15 },
  editButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#007AFF",
    borderRadius: 20,
  },
  editButtonText: { color: "#FFF", fontWeight: "600" },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  statBox: { alignItems: "center" },
  statNumber: { fontSize: 18, fontWeight: "700" },
  statLabel: { fontSize: 12, color: "#666" },
  menuWrapper: {
    marginTop: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  menuItemLeft: { flexDirection: "row", alignItems: "center" },
  menuItemText: { marginLeft: 15, fontSize: 16, color: "#333" },
});

export default ProfileScreen;
