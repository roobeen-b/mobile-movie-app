import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const SavedMovieCard = ({ movie }: { movie: SavedMovie }) => {
  return (
    <Link href={`/movie/${movie.movie_id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          resizeMode="cover"
          source={{
            uri: movie.poster_url
              ? `https://image.tmdb.org/t/p/w500${movie.poster_url}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          className="w-full h-48 rounded-lg"
        />
        <Text className="text-white text-sm font-bold mt-2" numberOfLines={1}>
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default SavedMovieCard;
