import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  value?: string;
  placeholder: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ value, placeholder, onPress, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        className="size-5"
        resizeMode="contain"
        source={icons.search}
        tintColor={"#ab8bff"}
      />
      <TextInput
        value={value}
        onPress={onPress}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="#ab8bff"
        className="ml-3 flex-1 text-white"
      />
    </View>
  );
};

export default SearchBar;
