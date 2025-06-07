import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";

function TabIcon({ focused, title, icon }) {
  if (focused) {
    return (
      <>
        <ImageBackground
          source={images.highlight}
          className="flex flex-row w-full items-center justify-center flex-1 min-w-[112px] min-h-16 mt-4 rounded-full overflow-hidden"
        >
          <Image source={icon} tintColor="#151312" className="size-5" />
          <Text className="text-secondary text-base font-semibold ml-2">
            {title}
          </Text>
        </ImageBackground>
      </>
    );
  }

  return (
    <View className="size-full items-center justify-center rounded-full mt-4">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
}

export default function _Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
            backgroundColor: "#0F0D23",
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#0F0D23"
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title={"Home"} icon={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title={"Search"} icon={icons.search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title={"Saved"} icon={icons.save} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title={"Profile"} icon={icons.person} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
