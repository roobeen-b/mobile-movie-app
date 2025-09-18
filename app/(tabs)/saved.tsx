import SavedMovieCard from "@/components/SavedMovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useAuth } from "@/contexts/AuthContext";
import SavedService from "@/services/savedService";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";

const Saved = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const { user } = useAuth();

  const fetchSavedMovies = useCallback(() => {
    if (!user?.id) return Promise.resolve([] as SavedMovie[]);
    return SavedService.getSavedMovies(user.id as string);
  }, [user?.id]);

  const {
    data: savedMovies,
    loading,
    error,
    reFetch: loadSavedMovies,
  } = useFetch(fetchSavedMovies, !!user?.id);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadSavedMovies();
    setRefreshing(false);
  }, [loadSavedMovies]);

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        loadSavedMovies();
      }
    }, [loadSavedMovies, user?.id])
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        resizeMode="cover"
        className="absolute w-full h-full z-0"
      />
      <FlatList
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.movie_id.toString()}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
            colors={["#9Bd35A", "#689F38"]}
            progressBackgroundColor="#ffffff"
          />
        }
        data={savedMovies as SavedMovie[]}
        renderItem={({ item }) => <SavedMovieCard movie={item} />}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 mb-5 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && savedMovies?.length! > 0 && (
              <Text className="text-xl text-white font-bold">Saved Movies</Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">No movies found</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Saved;
