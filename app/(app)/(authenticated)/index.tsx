import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { H3, H5, Sheet } from "tamagui";
import { Switch } from "tamagui";

// import { Activity, Airplay } from '@tamagui/lucide-icons'
import React, { useContext, useState } from "react";
// import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import type { SheetProps } from "tamagui";

import { Button, H1, H2, Input, Paragraph, XStack, YStack } from "tamagui";
import { Link, useNavigation } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

const spModes = ["percent", "constant", "fit", "mixed"] as const;

export default function HomePage() {
  const [tracking, setTracking] = useState(true);
  const router = useNavigation()

  const authCtx = useContext(AuthContext)
  return (
    <>
      <YStack

        height={"100%"}
        alignItems="center"
        justifyContent="center"
        alignContent="center"
      >
        <H5 paddingBottom="$12" textAlign="center">
          {authCtx?.name}
        </H5>
        {/* <Switch
          rotate="90deg"
          checked={tracking}
          // backgroundColor={tracking?"white":"$green10Light"}
          size={"$14"}
          onCheckedChange={(e) => {
            setTracking(e);
          }}
        >
          <Switch.Thumb
            animation="quicker"
          // backgroundColor={"$green10Dark"}
          />
        </Switch> */}
        <Link href={"/signin"}>signin</Link>
      </YStack>
    </>
  );
}

function InnerSheet(props: SheetProps) {
  return (
    <Sheet
      animation="medium"
      modal
      snapPoints={[90]}
      dismissOnSnapToBottom
      {...props}
    >
      <Sheet.Overlay
        animation="medium"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />
      <Sheet.Frame
        flex={1}
        justifyContent="center"
        alignItems="center"
        space="$5"
      >
        <Sheet.ScrollView>
          <YStack p="$5" gap="$8">
            <Button
              size="$6"
              circular
              alignSelf="center"
              // icon={ChevronDown}
              onPress={() => props.onOpenChange?.(false)}
            />

            <H2>Hello world</H2>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Paragraph key={i} size="$8">
                Eu officia sunt ipsum nisi dolore labore est laborum laborum in
                esse ad pariatur. Dolor excepteur esse deserunt voluptate labore
                ea. Exercitation ipsum deserunt occaecat cupidatat consequat est
                adipisicing velit cupidatat ullamco veniam aliquip reprehenderit
                officia. Officia labore culpa ullamco velit. In sit occaecat
                velit ipsum fugiat esse aliqua dolor sint.
              </Paragraph>
            ))}
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
