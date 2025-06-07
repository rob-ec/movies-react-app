export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_TOKEN}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?api_key=${
        TMDB_CONFIG.API_KEY
      }&query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${TMDB_CONFIG.API_KEY}&sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: response.statusText || "Failed to parse error response",
    }));

    throw new Error(
      `Failed to fetch movies. Status: ${response.status}. Message: ${
        errorData.status_message || errorData.message || "Unknown API error"
      }`
    );
  }

  const data = await response.json();

  return data.results;
};

export const fetchMovie = async (movieId: string): Promise<MovieDetails> => {
  try {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
