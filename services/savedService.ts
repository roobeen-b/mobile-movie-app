import { supabase } from "./supabase";

class SavedService {
  static async updateSavedMovie(
    movie: SavedMovie,
    userId: string
  ): Promise<boolean> {
    try {
      const { data: savedMovie, error: fetchError } = await supabase
        .from("saved")
        .select("*")
        .eq("user_id", userId)
        .eq("movie_id", movie.movie_id)
        .single();

      if (savedMovie) {
        const { error: deleteError } = await supabase
          .from("saved")
          .delete()
          .eq("user_id", userId)
          .eq("movie_id", movie.movie_id);

        if (deleteError) throw deleteError;
        return false;
      } else {
        const posterUrl = movie.poster_url.startsWith("http")
          ? movie.poster_url
          : `https://image.tmdb.org/t/p/w500${movie.poster_url}`;

        const insertData = {
          user_id: userId,
          movie_id: movie.movie_id,
          poster_url: posterUrl,
          title: movie.title,
        };

        const { error: insertError } = await supabase
          .from("saved")
          .insert(insertData)
          .select();

        if (insertError) throw insertError;
        return true;
      }
    } catch (error) {
      console.error("Error updating saved movie:", error);
      throw error;
    }
  }

  static async getSavedMovies(userId: string) {
    try {
      const { data: savedMovies } = await supabase
        .from("saved")
        .select("*")
        .eq("user_id", userId);

      return savedMovies;
    } catch (error) {
      console.error("Error getting saved movie:", error);
      throw error;
    }
  }

  static async checkMovieSaved(userId: string, movieId: number) {
    try {
      const { data: savedMovie, error } = await supabase
        .from("saved")
        .select("*")
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .single();

      if (!error || error.code === "PGRST116") {
        return !!savedMovie;
      }

      throw error;
    } catch (error) {
      console.error("Error checking saved movie: ", error);
      throw error;
    }
  }
}

export default SavedService;
