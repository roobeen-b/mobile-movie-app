import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Use AsyncStorage for session persistence
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Important for React Native
  },
});

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    // First, check if the search term already exists
    const { data } = await supabase
      .from("metrics")
      .select("*")
      .eq("search_term", query)
      .single();

    if (data) {
      // Update existing record
      await supabase
        .from("metrics")
        .update({ count: (data.count || 0) + 1 })
        .eq("id", data.id);
    } else {
      // Insert new record
      const insertData = {
        search_term: query,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
      };

      const { error } = await supabase
        .from("metrics")
        .insert(insertData)
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const { data } = await supabase
      .from("metrics")
      .select("*")
      .limit(5)
      .order("count", { ascending: false });

    return data as TrendingMovie[];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const getLoggedInUserDetails = async (userId: string) => {
  try {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const updateProfileData = async (data: ProfileData) => {
  try {
    const { error } = await supabase.from("profiles").upsert(data);

    if (error) {
      console.error("Error updating profile data:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error updating profile data:", error);
    throw error;
  }
};
