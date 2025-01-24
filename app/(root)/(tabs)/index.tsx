import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Index = () => {
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-lg my-10">Welcome to ReState</Text>
      <Link href={"/sign-in"} className="text-lg bg-primary-300 rounded-lg py-3 px-5 text-white">Sign In</Link>
      <Link href={"/explore"}>Explore</Link>
      <Link href={"/profile"}>Profile</Link>
      <Link href={"/properties/1"}>Property</Link>
    </View>
  );
};

export default Index;
