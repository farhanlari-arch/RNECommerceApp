import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

const LOG_FILE_PATH = `${FileSystem.documentDirectory}app_logs.txt`;

export const AnalyticsService = {
  // 1. Log an action
  logEvent: async (action, details = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${action} | ${JSON.stringify(details)}\n`;

    try {
      await FileSystem.writeAsStringAsync(LOG_FILE_PATH, logEntry, {
        encoding: FileSystem.EncodingType.UTF8,
        append: true,
      });
    } catch (error) {
      // If file doesn't exist, append might fail, so we create it
      await FileSystem.writeAsStringAsync(LOG_FILE_PATH, logEntry);
    }
  },

  // 2. Share via Email (The CTA)
  exportLogs: async () => {
    try {
      const canShare = await Sharing.isAvailableAsync();
      if (!canShare) {
        Alert.alert("Error", "Sharing is not supported on this device.");
        return;
      }

      await Sharing.shareAsync(LOG_FILE_PATH, {
        mimeType: "text/plain",
        dialogTitle: "App Activity Logs",
        UTI: "public.plain-text", // Required for iOS
      });
    } catch (error) {
      Alert.alert("No Logs", "There are no recorded actions to export yet.");
    }
  },

  // 3. Clear logs (Maintenance)
  clearLogs: async () => {
    // try {
    //   await FileSystem.deleteAsync(LOG_FILE_PATH);
    // } catch (error) {
    //   console.log("Nothing to clear.");
    // }
  },
};
