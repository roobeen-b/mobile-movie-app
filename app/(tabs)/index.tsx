import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/supabase";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

const Index = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: trendingMovies,
    error: trendingMoviesError,
    reFetch: loadTrendingMovies,
    loading: trendingMoviesLoading,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    error: moviesError,
    reFetch: loadMovies,
    loading: moviesLoading,
  } = useFetch(useCallback(() => fetchMovies({ query: "" }), []));

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadMovies(), loadTrendingMovies()]);
    setRefreshing(false);
  }, [loadMovies, loadTrendingMovies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        resizeMode="cover"
        className="absolute w-full h-full z-0"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
            colors={["#9Bd35A", "#689F38"]}
            progressBackgroundColor="#ffffff"
          />
        }
      >
        <Image source={icons.logo} className="w-12 h-12 mx-auto mt-20 mb-5" />

        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingMoviesError ? (
          <Text>{moviesError?.message || trendingMoviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
            />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-white text-lg font-bold">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  contentContainerStyle={{ gap: 26 }}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  className="mb-4 mt-3"
                  keyExtractor={(item) => item.movie_id.toString()}
                />
              </View>
            )}
            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                scrollEnabled={false}
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;
