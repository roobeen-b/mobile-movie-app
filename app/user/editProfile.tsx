import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { ProfileData, profileService } from "../../services/profileService";

const EditProfilePage = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        setLoading(true);
        const profileData = await profileService.getProfile(user.id);
        setProfile(profileData);
      } catch (error) {
        console.error("Error loading profile:", error);
        Alert.alert("Error", "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      setUpdating(true);

      // Update profile data
      await profileService.updateProfile(user.id, profile);

      // Update display name in user metadata
      await profileService.updateUserMetadata(user.id, {
        display_name: profile.full_name,
      });

      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", error?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        className="flex-1 p-5 mt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8">
          <Text className="text-white text-2xl font-bold mb-6">
            Edit Profile
          </Text>

          {/* Avatar Upload */}
          <View className="relative mb-6">
            <View className="w-24 h-24 bg-gray-800 rounded-full items-center justify-center">
              <Text className="text-white text-4xl font-bold">
                {profile.full_name
                  ? profile.full_name.charAt(0).toUpperCase()
                  : user?.email?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-red-600 rounded-full w-8 h-8 items-center justify-center"
              disabled={updating}
            >
              <Text className="text-white text-xl">+</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View className="w-full max-w-md">
            <View className="mb-4">
              <Text className="text-white text-sm mb-1">Full Name</Text>
              <TextInput
                className="bg-gray-800 text-white p-3 rounded-lg mb-4"
                placeholder="Full Name"
                placeholderTextColor="#666"
                value={profile.full_name}
                onChangeText={(val) => handleInputChange("full_name", val)}
                editable={!updating}
              />
            </View>

            <View className="mb-4">
              <Text className="text-white text-sm mb-1">Phone</Text>
              <TextInput
                className="w-full bg-gray-800 text-white p-4 rounded-lg text-base"
                placeholder="Phone Number"
                placeholderTextColor="#666"
                value={profile.phone}
                onChangeText={(val) => handleInputChange("phone", val)}
                keyboardType="phone-pad"
                editable={!updating}
              />
            </View>

            <View className="mb-6">
              <Text className="text-white text-sm mb-1">Bio</Text>
              <TextInput
                className="w-full bg-gray-800 text-white p-4 rounded-lg text-base h-32"
                placeholder="Tell us about yourself..."
                placeholderTextColor="#666"
                value={profile.bio}
                onChangeText={(val) => handleInputChange("bio", val)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!updating}
              />
            </View>

            {/* Action Buttons */}
            <View className="space-y-4">
              <TouchableOpacity
                className="bg-red-600 p-4 rounded-lg items-center justify-center"
                onPress={handleUpdateProfile}
                disabled={updating}
              >
                {updating ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white font-semibold text-base">
                    Save Changes
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                className="p-4 items-center justify-center border border-gray-700 rounded-lg"
                onPress={() => router.back()}
                disabled={updating}
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfilePage;
