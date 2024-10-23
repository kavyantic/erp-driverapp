import { Redirect, Slot, Tabs, useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { Stack, Text } from "tamagui";
import { SafeAreaView } from "react-native";
import { AuthContext } from "@/context/AuthContext";
import { useRoute } from "@react-navigation/native";

const Header = () => {
  return (
    <Stack
      padding="$4"
      paddingTop="$8"

      backgroundColor="$background075"
      borderBottomWidth={1}
      borderColor="$blue7"
    // alignItems="center"
    >
      <Text fontSize="$6" fontWeight="bold" color="$white">
        Bus tracker
      </Text>
    </Stack>
  );
};

export default function TabLayout() {

  const colorScheme = useColorScheme();
  const authCtx = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!authCtx?.token) {
      router.push("/signin")

    }
  }, [authCtx])
  return (
    <>
      <SafeAreaView style={{ height: "100%" }}>
        <Header />

        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "home" : "home-outline"}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Explore",
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon
                  name={focused ? "code-slash" : "code-slash-outline"}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </>
  );
}
