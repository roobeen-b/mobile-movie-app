import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LoginForm } from "../../components/auth/LoginForm";
import { SignupForm } from "../../components/auth/SignupForm";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const router = useRouter();
  const { user, signOut, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  const handleSignupSuccess = () => {
    setShowSignup(false);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-white text-base">Loading...</Text>
      </View>
    );
  }

  if (user) {
    return (
      <ScrollView className="flex-1 bg-primary p-5">
        <View className="items-center mb-8 mt-8">
          <View className="w-24 h-24 rounded-full bg-red-600 justify-center items-center mb-4">
            <Text className="text-white text-4xl font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text className="text-white text-xl font-semibold mb-1">
            Welcome back,{" "}
            {user.user_metadata?.display_name || user.email?.split("@")[0]}
          </Text>
          <Text className="text-gray-400">{user.email}</Text>
        </View>

        <View className="mb-8 bg-gray-800 rounded-xl overflow-hidden">
          <TouchableOpacity
            className="p-4 border-b border-gray-700"
            onPress={() => router.push("/user/editProfile")}
          >
            <Text className="text-white">Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-4 border-b border-gray-700"
            onPress={() => router.push("/user/accountSettings")}
          >
            <Text className="text-white">Account Settings</Text>
            <Text className="text-gray-400 text-xs mt-1">
              Manage email and password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-4 border-b border-gray-700"
            onPress={() => router.push("/saved")}
          >
            <Text className="text-white">Saved</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-gray-800 rounded-xl overflow-hidden">
          <TouchableOpacity
            className="bg-red-600 mx-4 my-4 p-4 rounded-lg items-center"
            onPress={signOut}
          >
            <Text className="text-white font-semibold">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-primary">
      <View className="flex-1 justify-center items-center py-10 px-5">
        <Image
          source={require("../../assets/images/adaptive-icon.png")}
          className="w-24 h-24 mb-5 rounded-xl"
        />
        <Text className="text-2xl font-bold text-white mb-2 text-center">
          Welcome to Movie App
        </Text>
        <Text className="text-gray-400 text-center mb-8 px-5">
          Sign in or create an account to continue
        </Text>

        {!showLogin && !showSignup && (
          <View className="w-full max-w-xs">
            <TouchableOpacity
              className="bg-red-600 p-4 rounded-lg mb-4"
              onPress={() => setShowLogin(true)}
            >
              <Text className="text-white font-semibold text-center">
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border border-red-600 p-4 rounded-lg"
              onPress={() => setShowSignup(true)}
            >
              <Text className="text-red-600 font-semibold text-center">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showLogin && (
          <View className="w-full max-w-xs">
            <LoginForm onSuccess={handleLoginSuccess} />
            <TouchableOpacity
              className="mt-5 items-center"
              onPress={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
            >
              <Text className="text-gray-400 text-center">
                Don&apos;t have an account?{" "}
                <Text className="text-red-500 font-semibold">Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showSignup && (
          <View className="w-full max-w-xs">
            <SignupForm onSuccess={handleSignupSuccess} />
            <TouchableOpacity
              className="mt-5 items-center"
              onPress={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
            >
              <Text className="text-gray-400 text-center">
                Already have an account?{" "}
                <Text className="text-red-500 font-semibold">Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;
