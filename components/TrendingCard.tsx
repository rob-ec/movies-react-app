import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

export default function TrendingCard({
  movie: { movieId, poster_url, title },
  index,
}: TrendingCardProps) {
  return (
    <Link href={`/movies/${movieId}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-white font-bold text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text className="font-bold text-sm mt-2 text-light-200" numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
