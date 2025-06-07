import { icons } from "@/constants/icons";
import { fetchMovie } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";

interface IMovieInfo {
  label: string;
  value: string | number | undefined | null;
}

const MovieInfo = ({ label, value }: IMovieInfo) => (
  <View className="flex-col mt-5 items-start justify-center">
    <Text className="text-light-200 text-sm font-normal">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMovie(id as string));

  return (
    <View className="bg-dark-200 flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                : `https://via.placeholder.com/600x400/1a1a1a/ffffff.png`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white fonont-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center justify-start gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.runtime ? `${movie?.runtime} min` : "-"}
            </Text>
          </View>
          <View className="flex-row items-center justify-start gap-x-1 mt-2 p-1 bg-dark-100">
            <Image source={icons.star} className="size-4" tintColor="#ab8bff" />
            <Text className="text-xs text-white text-sm font-bold uppercase">
              {movie?.vote_average ? Math.round(movie?.vote_average / 2) : "-"}
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.vote_count ? `${movie?.vote_count} votes` : "-"}
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres
                ? movie?.genres.map((g) => g.name).join(" - ")
                : "N/A"
            }
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={
                movie?.budget ? `$ ${movie?.budget / 1_000_000} Mi` : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={
                movie?.revenue
                  ? `$ ${Math.round(movie?.revenue / 1_000_000)} Mi`
                  : "N/A"
              }
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={movie?.production_companies?.map((p) => p.name).join(" - ")}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={router.back}
        className="absolute rounded-lg bottom-5 left-0 right-0 mx-5 py-3.5 flex flex-row items-center justify-center z-50 bg-accent"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white text-base font-semibold">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
