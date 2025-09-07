import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        className="size-5"
        resizeMode="contain"
        source={icons.search}
        tintColor={"#ab8bff"}
      />
      <TextInput
        value=""
        onPress={onPress}
        className="ml-3 flex-1"
        onChangeText={() => {}}
        placeholder={placeholder}
        placeholderTextColor="#ab8bff"
      />
    </View>
  );
};

export default SearchBar;
