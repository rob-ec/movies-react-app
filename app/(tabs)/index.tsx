import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  View,
  Text,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => {
    return fetchMovies({ query: "" });
  });

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 20 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />
        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingMoviesError ? (
          <View className="bg-dark-200 w-full py-5 px-5 rounded-md mt-5">
            <Text className="text-white">
              Error: {moviesError?.message || trendingMoviesError?.message}
            </Text>
          </View>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="Search for movies"
              onPress={() => {
                router.push("/search");
              }}
            />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mt-5 mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  data={trendingMovies}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  keyExtractor={(item) => `${item.movieId.toString()}-trending-${item.searchTerm}`}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => <MovieCard {...item} />}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
