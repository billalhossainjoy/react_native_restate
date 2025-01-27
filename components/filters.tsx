import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { categories } from "@/constants/data";

const filters = () => {
  const params = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    (params.filter as string) || "All"
  );

  const handleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }
    setSelectedCategory(category);
    router.setParams({ filter: "All" });
  };

  return (
    <ScrollView
      horizontal
      className="mt-3 mb-2"
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategory(item.category)}
          key={index}
          className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full border ${
            selectedCategory === item.category
              ? "bg-primary-300 border-primary-200"
              : "bg-primary-100 border-primary-200"
          }`}
        >
          <Text
            className={` font-rubik-bold text-sm pt-1 ${
              selectedCategory === item.category
                ? "text-white"
                : "text-black-100"
            }`}
          >
            {item.category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default filters;
