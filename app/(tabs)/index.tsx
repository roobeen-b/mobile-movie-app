import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, View } from "react-native";

const Index = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
      >
        <Image source={icons.logo} className="w-12 h-12 mx-auto mt-20 mb-5" />

        <View className="flex-1 mt-5">
          <SearchBar
            placeholder="Search for a movie"
            onPress={() => router.push("/search")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
