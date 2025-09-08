import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const {
    reset,
    data: movies,
    error: moviesError,
    reFetch: loadMovies,
    loading: moviesLoading,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        resizeMode="cover"
        className="absolute w-full z-0"
      />
      <FlatList
        data={movies?.results as Movie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} />}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 20,
          marginVertical: 25,
        }}
        contentContainerStyle={{ paddingBottom: 100, minHeight: "100%" }}
        ListHeaderComponent={
          <>
            <View className="w-full mt-20 flex-row justify-center items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                value={searchQuery}
                placeholder="Search for a movie"
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError && searchQuery.trim() ? (
            <Text className="text-center text-gray-500 text-sm font-bold mt-5 mb-3">
              No movies found
            </Text>
          ) : null
        }
      />

      {moviesLoading && (
        <ActivityIndicator size="large" className="my-3" color="#0000ff" />
      )}
      {moviesError && (
        <Text className="text-red-500 px-5 my-3">{moviesError.message}</Text>
      )}
      {!moviesLoading &&
        !moviesError &&
        searchQuery.trim() &&
        movies?.results?.length! > 0 && (
          <Text className="text-xl text-white font-bold">
            Search Results for{" "}
            <Text className="text-accent">{searchQuery.trim()}</Text>
          </Text>
        )}
    </View>
  );
};

export default Search;
