import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

export const FeaturedCard = () => {
  return (
    <TouchableOpacity className="flex flex-col items-start w-60 h-80 relative">
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full absolute bottom-0 rounded-2xl"
      />

      <View className="absolute flex flex-row py-1.5 px-3 bg-white/90 rounded-full top-5 right-5 gap-1">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300">4.4</Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text className="text-xl font-rubik-extrabold text-white">
          Modern Apartments
        </Text>

        <Text className="text-base font-rubik text-white">
          22 W 15th St, New York, NY 10011
        </Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-white font-rubik-extrabold text-2xl">
            $2500
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress }: { onPress?: () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/80 relative"
    >
      <Image source={images.newYork} className="size-full rounded-2xl h-40" />

      <View className="flex flex-row gap-2 items-center bg-white rounded-full absolute py-1.5 px-3 right-5 top-5 ">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ">4.4</Text>
      </View>
      <View className="flex flex-col items-start inset-x-1 inset-y-1">
        <Text className="text-lg font-rubik-extrabold">Modern Apartments</Text>

        <Text className="text-base font-rubik text-black-100">
          22 W 15th St, New York, NY 10011
        </Text>

        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-black font-rubik-extrabold text-lg">
            $2500
          </Text>
          <Image source={icons.heart} className="size-5" tintColor="#191d31" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
