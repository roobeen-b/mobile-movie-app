import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const updateSearchCount = async (query: string, movie: Movie) => {
  console.log("Updating search count for:", query);
  try {
    // First, check if the search term already exists
    const { data } = await supabase
      .from("metrics")
      .select("*")
      .eq("search_term", query)
      .single();

    if (data) {
      console.log("inside if");
      // Update existing record
      await supabase
        .from("metrics")
        .update({ count: (data.count || 0) + 1 })
        .eq("id", data.id);
    } else {
      console.log("inside else");
      // Insert new record
      const insertData = {
        search_term: query,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
      };

      console.log("Inserting data:", insertData); // Debug log

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
