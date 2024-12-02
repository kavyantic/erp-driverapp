import { Slot } from 'expo-router'
import React from 'react'
// import 'expo-dev-client';

// import "@/tasks/locUpdateTask"
import * as SplashScreen from "expo-splash-screen";
import "../tasks"
// SplashScreen.preventAutoHideAsync();

// // Set the animation options. This is optional.
// SplashScreen.setOptions({
//     duration: 1000,
//     fade: true,
// });
export default function RootLayout() {
    return (
        
        <Slot />
    )
}
