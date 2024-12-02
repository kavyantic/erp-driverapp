import { useAppSelector } from "@store";
import { Stack, Text } from "tamagui";

import React from 'react';
import { Button, YStack } from 'tamagui';
import { router, useNavigation, useRouter } from "expo-router";

const ActiveTripBar = () => {
    const activeTrip = useAppSelector(store => store.trip.activeTrip)
    const router = useRouter()
    return (
        <>
            {!activeTrip != null &&

                <YStack
                    // space="$4"=\\
                    padding="$2"
                    borderRadius="$4"
                    backgroundColor="white"
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection="row"
                >
                    <Text onPress={() => alert('Button 1 pressed')}>
                        Your trip
                    </Text>
                    <Button onPress={() => { router.push("/trip/active") }}>
                        {"->"}
                    </Button>
                </YStack>}
        </>
    );
}



export default ActiveTripBar;
