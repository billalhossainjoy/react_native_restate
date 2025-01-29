import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/global.context";
import icons from "@/constants/icons";
import Search from "@/components/search";
import { Card, FeaturedCard } from "@/components/cards";
import Filters from "@/components/filters";
import { useAppwrite } from "@/hooks/useAppwrite";
import Features from "@/lib/appwrite/services/features";
import { useLocalSearchParams } from "expo-router";

const index = () => {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({ fn: Features.getLatestProperties });

  const { data: featuresProperties, loading: featuresPropertiesLoading } =
    useAppwrite({
      fn: Features.getProperties,
      params: {
        filter: params.filter!,
        query: params.query!,
        limit: 6,
      },
      skip: true,
    });  

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={latestProperties}
        renderItem={({ item }) => <Card />}
        contentContainerClassName="pb-32"
        numColumns={2}
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            <View className=" flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row">
                <Image
                  source={{ uri: user?.avatar.toString() }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik text-black-100">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="my-5">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={featuresProperties}
              renderItem={() => <FeaturedCard />}
              keyExtractor={(item) => item.toString()}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerClassName="flex gap-5"
            />

            <View className="mt-5">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recomendation
                </Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default index;
