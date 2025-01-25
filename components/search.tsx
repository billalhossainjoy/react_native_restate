import { View, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import icons from "@/constants/icons";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  const handleInput = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full bg-accent-100 px-4 rounded-lg border border-primary-100 mt-5 py-2">
      <View className="flex flex-row items-center flex-1 justify-start z-50 gap-2">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleInput}
          className="text-sm font-rubik text-black-300 flex-1 pb-2"
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
