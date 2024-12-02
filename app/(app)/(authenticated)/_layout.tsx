import { Redirect, Slot, Tabs, useRouter } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack as RouterStack } from "expo-router"
import { Button, Heading, Stack, Text, useSelectContext, View } from "tamagui";
import { SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@store";
import { getFromSecureStore } from "@/utils/storageUtils";
import { INSTITUTE_INFO_KEY, SESSION_INFO_KEY } from "@/constants";
import { Institute, login, logout, updateInstitute, User } from "@/store/slices/authSlice";
import * as TaskManager from 'expo-task-manager';



// import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, User as UserIcon } from '@tamagui/lucide-icons'
import type { PopoverProps } from 'tamagui'
import { Adapt, Input, isWeb, Label, Popover, XStack, YStack } from 'tamagui'
// import { LogOut } from "@tamagui/lucide-icons";
import TripTracker from "@/components/TripTracker";

const Header = () => {
  return (
    <XStack
      padding="$2"
      // paddingTop="$8"

      backgroundColor="$background075"
      borderBottomWidth={1}
      borderColor="$blue10Light"
      justifyContent="space-between"
      alignItems="center"
    // alignItems="center"
    >
      <Text fontSize="$6" fontWeight="bold" color="$white">
        Bus tracker
      </Text>
      <HeaderMenu 
      // Icon={UserIcon}
       />
    </XStack>
  );
};

const ActiveTripBar = () => {TripTracker
  return (
    <Stack
      padding="$4"
      display="flex"
      justifyContent="space-between"
      backgroundColor="$background075"
    // borderBottomWidth={1}
    // borderColor="$blue7"
    // alignItems="center"
    >
      <Text fontSize="$6" fontWeight="bold" color="$white">
        Bus tracker
      </Text>
      <Button circular>
        Logout
        {/* <LogOut /> */}
      </Button>

    </Stack>
  );
}


export default function TabLayout() {
  const activeTrip = useAppSelector(store => store.trip.activeTrip)

  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch()
  const authCtx = useAppSelector(s => s.auth)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const institute = await getFromSecureStore<Institute>(INSTITUTE_INFO_KEY)
      const user = await getFromSecureStore<User>(SESSION_INFO_KEY)

      if (!institute) {
        // alert("not institute")
        // setTimeout(() => {
        router.push("/landing")
        return
        // })
      }

      if (!user) {
        router.push("/signin")
        return
      }

      dispatch(login(user))
      dispatch(updateInstitute(institute))
      setLoading(false)
    })()

  }, [setLoading])


  return (
    <>
      <SafeAreaView style={{ height: "100%" }}>
        <Header />
        <TripTracker/>
        {/* <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
          }}
        >

          <Stack initialRouteName="(authenticated)">
                  <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
                  {/* <Stack.Screen name="trip" options={{ headerShown: false }} /> */}
        {loading ? <Text>Loading auth info...</Text> :
          <RouterStack>
            <RouterStack.Screen name="index" options={{ headerShown: false }} />
            <RouterStack.Screen name="trip/active" options={{ headerShown: false }} />
            {/* <RouterStack.Screen name="+not-found" /> */}
          </RouterStack>}


      </SafeAreaView >
    </>
  );
}


/**
 *     <Tabs.Screen
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
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "code-slash" : "code-slash-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs > */




export function HeaderMenu({
  Icon,
  Name,
  shouldAdapt,
  ...props
}: PopoverProps & { Icon?: any; Name?: string; shouldAdapt?: boolean }) {
  const auth = useAppSelector(s => s.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const ref = useRef<Popover>(null)
  return (
    <Popover size="$5" allowFlip {...props} ref={ref}>
      <Popover.Trigger asChild>
        <Button icon={Icon} circular backgroundColor={"$background075"} />
      </Popover.Trigger>


      {/* <Adapt when="sm" platform="touch">
          <Popover.Sheet modal dismissOnSnapToBottom>
            <Popover.Sheet.Frame padding="$4">
              <Adapt.Contents />
            </Popover.Sheet.Frame>
            <Popover.Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Popover.Sheet>
        </Adapt> */}


        <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
         exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        {/* <Popover.Arrow borderWidth={1} borderColor="$borderColor" /> */}

        <YStack gap="$3">
          <XStack justifyContent="space-between" display="flex" alignItems="center">
            <Heading size="$3" htmlFor={Name} >
              {auth.user?.name}
            </Heading>
            <View flex={1} />
            {/* <Button f={1} size="$3" id={Name}
              icon={LogOut}
              onPress={_ => {
                ref.current?.close()
                router.navigate("/signin"); dispatch(logout())

              }}>Logout</Button> */}
          </XStack>

          <Popover.Close asChild>
            <Button f={1} size="$3" id={Name}
              // icon={LogOut}
              onPress={_ => {
                ref.current?.close()
                router.navigate("/signin"); dispatch(logout())

              }}>Logout</Button>
          </Popover.Close>
        </YStack>
      </Popover.Content>
    </Popover>
  )
}