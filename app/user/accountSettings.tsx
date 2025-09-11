import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { icons } from "@/constants/icons";
import { supabase } from "../../services/supabase";

const AccountSettings = () => {
  const router = useRouter();
  // const { user } = useAuth();
  // const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  // const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useEffect(() => {
  //   if (user) {
  //     setEmail(user.email || "");
  //     setLoading(false);
  //   }
  // }, [user]);

  // const handleUpdateEmail = async () => {
  //   if (!user) return;

  //   try {
  //     setUpdating(true);
  //     const { error } = await supabase.auth.updateUser({ email });

  //     if (error) throw error;

  //     Alert.alert(
  //       "Email Update Sent",
  //       "Please check your new email to confirm the update. You will be signed out.",
  //       [
  //         {
  //           text: "OK",
  //           onPress: () => {
  //             supabase.auth.signOut();
  //             router.replace("/profile");
  //           },
  //         },
  //       ]
  //     );
  //   } catch (error: any) {
  //     Alert.alert("Error", error.message || "Failed to update email");
  //   } finally {
  //     setUpdating(false);
  //   }
  // };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    try {
      setUpdating(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      Alert.alert("Success", "Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update password");
    } finally {
      setUpdating(false);
    }
  };

  // if (loading) {
  //   return (
  //     <View className="flex-1 justify-center items-center bg-primary">
  //       <ActivityIndicator size="large" color="#ffffff" />
  //     </View>
  //   );
  // }

  return (
    <View className="flex-1 bg-primary p-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-white text-2xl font-bold mb-6">
          Account Settings
        </Text>

        {/* Email Section */}
        {/* <View className="mb-8">
          <Text className="text-white text-lg font-semibold mb-4">
            Email Address
          </Text>
          <View className="bg-gray-800 rounded-lg p-4">
            <Text className="text-white text-sm mb-2">Current Email</Text>
            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg mb-4"
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!updating}
            />
            <TouchableOpacity
              className="bg-red-600 p-3 rounded-lg items-center"
              onPress={handleUpdateEmail}
              disabled={updating}
            >
              {updating ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-white font-semibold">Update Email</Text>
              )}
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Password Section */}
        <View className="mb-8">
          <Text className="text-white text-lg font-semibold mb-4">
            Change Password
          </Text>
          <View className="bg-gray-800 rounded-lg p-4">
            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg mb-3"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Current Password"
              placeholderTextColor="#666"
              secureTextEntry
              editable={!updating}
            />
            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg mb-3"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New Password"
              placeholderTextColor="#666"
              secureTextEntry
              editable={!updating}
            />
            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg mb-4"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm New Password"
              placeholderTextColor="#666"
              secureTextEntry
              editable={!updating}
            />
            <TouchableOpacity
              className="bg-red-600 p-3 rounded-lg items-center"
              onPress={handleUpdatePassword}
              disabled={
                updating || !currentPassword || !newPassword || !confirmPassword
              }
            >
              {updating ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text className="text-white font-semibold">
                  Update Password
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountSettings;
