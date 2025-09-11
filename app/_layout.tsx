import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider } from "../contexts/AuthContext";
import "./globals.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="user/editProfile"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="user/accountSettings"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
}
