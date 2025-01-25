import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/context/global.context";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress: () => void;
  textStyle?: any;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center justify-between py-3"
    >
      <View className=" flex flex-row items-center gap-3">
        <Image source={icon} className="size-6 " />
        <Text
          className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}
        >
          {title}
        </Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  );
};

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = () => {};

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7 py-5"
      >
        <View className="flex flex-row justify-between">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image className="size-5" source={icons.bell} />
        </View>
        <View className="flex flex-row justify-center mt-5 ">
          <View className="flex flex-col items-center relative mt-5 ">
            {user?.avatar && (
              <Image
                source={images.avatar}
                className="size-44 relative rounded-full"
              />
            )}
            <TouchableOpacity className="absolute right-2 bottom-7">
              <Image
                source={icons.edit}
                className="size-9 rounded-full border-2 border-primary-100"
              />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettingsItem
            icon={icons.calendar}
            title="My Bookings"
            onPress={() => {}}
          />
          <SettingsItem
            icon={icons.wallet}
            title="Payment"
            onPress={() => {}}
          />
        </View>
        <View className="flex flex-col mt-5 border-t border-primary-200 pt-5">
          {settings.slice(2).map((item, index) => (
            <SettingsItem
              key={index}
              icon={item.icon}
              title={item.title}
              onPress={() => {}}
            />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t border-primary-200 pt-1">
          <SettingsItem icon={icons.logout} title="Logout" onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
