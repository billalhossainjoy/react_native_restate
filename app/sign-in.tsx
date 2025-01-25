import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import auth from "@/lib/appwrite/auth";
import { useGlobalContext } from "@/context/global.context";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await auth.login();
    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        <View>
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to ReState
          </Text>
          <Text className="capitalize text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's get you close to
          </Text>
          <Text className="capitalize text-primary-300 font-rubik-bold text-center">
            Your ideal home
          </Text>
          <Text className=" text-lg font-rubik text-black-200 text-center mt-12">
            Login to ReState with google
          </Text>
          <View className="px-10">
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-white shadow-md mt-5 rounded-full w-full py-4 shadow-zinc-700"
            >
              <View className="flex flex-row items-center justify-center gap-2">
                <Image
                  source={icons.google}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-lg font-rubik-medium text-black-300">
                  Continue with Gooble
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
