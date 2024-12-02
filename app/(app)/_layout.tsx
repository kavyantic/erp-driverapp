import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Slot, Stack, useRootNavigationState, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useMemo } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { H1, TamaguiProvider, Text, YStack } from "tamagui";
import tamaguiConfig from "@/tamagui.config";
// import { AuthActionContext, AuthProvider } from "@/context/AuthContext";
import { Toast, ToastProvider, ToastViewport, useToastState } from "@tamagui/toast";
import { SafeAreaView } from "react-native-safe-area-context";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios"
import { Provider } from "react-redux"
import { useAppDispatch } from "@store";
import { store } from "@store";


// Prevent the splash screen from auto-hiding before asset loading is complete.

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<{ message: string }>;
  }
}


declare module '@tamagui/toast' {
  interface CustomData {
    myPreset?: 'error' | 'success' | 'warning'
  }
}
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter()
  // const dispatch = useAppDispatch()

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            // retry(failureCount, err) {
            //   if (err instanceof ResponseError) {
            //     if (err.status > 499) {
            //       setError(
            //         "An Unexpected problem has occured. Please contact service provider."
            //       );
            //     }
            //     if (err.status == 401) {
            //     }
            //   }
            //   return false;
            // },
          },
        },
        mutationCache: new MutationCache({
          onError(error, variables, context, mutation) {
            // alert("mutation error has occured")

            if (error?.status == 401) {
              // alert(error.response?.data)
            }
          },
        }),
        queryCache: new QueryCache({
          onError(error, query) {
            // console.log(error.code,error.response?.status)
            if (error.response?.status == 401) {
              // authActionCtx.logout()
              router.push("/signin")
            }
          },
        })
      }),
    [],
  );



  // if (true) {
  //   return <Redirect href={'/signin'} />
  // }






  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>

          {/* <AuthProvider> */}
          <ToastProvider >
            <CurrentToast />
            <ToastViewport width={"100%"} padding={"$5"} />

            {/* <SafeAreaView> */}

            <Stack initialRouteName="(authenticated)"
              layout={({ children }) => <>
                <YStack
                  flex={1}
                  backgroundColor="$background075"
                  // alignItems="center"
                  justifyContent="center"
                >{children}
                </YStack></>}
            >
              <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
              {/* <Stack.Screen name="trip" options={{ headerShown: false }} /> */}

              <Stack.Screen name="signin" options={{ headerShown: false }} />
              <Stack.Screen name="landing" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>

            {/* </SafeAreaView> */}
          </ToastProvider>
          {/* </AuthProvider> */}
        </QueryClientProvider>
      </Provider>
      {/* </ThemeProvider> */}
    </TamaguiProvider>
  );
}



const CurrentToast = () => {
  const currentToast = useToastState()

  console.log(currentToast)
  if (!currentToast || currentToast.isHandledNatively) return null
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={4}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <Toast.Title>{currentToast.title}</Toast.Title>
        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  )
}
