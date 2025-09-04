import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold text-primary">
        Welcome to Movie App
      </Text>
      <Link href="/onboarding">Go to Onboarding</Link>
    </View>
  );
}
