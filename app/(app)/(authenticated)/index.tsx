import { Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Adapt, H3, H5, ListItem, Select, Sheet, Spinner, Text, YGroup } from "tamagui";
import { Switch } from "tamagui";
import { ApiTypesDriver } from "@/api-types"
import React, { useContext, useEffect, useState } from "react";
import type { SheetProps } from "tamagui";
import * as Location from 'expo-location';

import { Button, H1, H2, Input, Paragraph, XStack, YStack } from "tamagui";
import { Link, useNavigation, useRouter } from "expo-router";
// import { AuthContext } from "@/context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api, createTripApi, getActiveTrip } from "@/api";
import { ArrowBigDown, ArrowBigRight, Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { getSocket, useSocketEvents } from "@/socket";
import { useToastController } from "@tamagui/toast";
import { useAppDispatch, useAppSelector } from "@store";
import { addActiveTrip } from "@/store/slices/tripSlice";
import ActiveTripBar from "@/components/ActiveTripBox";
import * as TaskManager from 'expo-task-manager';
import { LOCATION_TASK_NAME } from "@/constants";

const spModes = ["percent", "constant", "fit", "mixed"] as const

const fetchRoutes = async () => await api.get<ApiTypesDriver['loadRoutes']['res']>("/driver/load_routes")



async function startLocationTask() {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {

      alert("Lcoation tracking started")

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Highest,
        // timeInterval: 1000,
        // distanceInterval: 1,
        // showsBackgroundLocationIndicator: true,
        // foregroundService: {
        //   notificationTitle: 'Using your location',
        //   notificationBody: 'To turn off, go back to the app and switch something off.',
        // }
      },)
    }
  }

}

async function stopLocationTask() {
  alert("Lcoation tracking stopped")

  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)

}



export default function MainPage() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const activeTripApi = useQuery({ queryKey: [getActiveTrip.query_key], queryFn: getActiveTrip })

  // const activeTrip = useAppSelector(s => s.trip.activeTrip)


  useEffect(() => {
    if (activeTripApi.data?.data) {
      startLocationTask()
    } else {
      // stopLocationTask()
    }
  }, [activeTripApi.data])

  TaskManager.getRegisteredTasksAsync().then(l => console.log("registered tasks : ", l))
  Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(task => { console.log("location task returned  ", task) })




  // if (!activeTripApi.data?.data) {
  //   // console.log(routesApi.data, "---", routesApi.error?.response?.data)
  //   return <Paragraph>Error loading routes <Paragraph onPress={routesApi.refetch as () => void} color={"$accentBackground"}>refresh</Paragraph></Paragraph>
  // }


  return activeTripApi.data ? <ExistingTripPage activeTrip={activeTripApi.data.data} /> : <NoTripPage refetch={activeTripApi.refetch} />
}






// import * as TaskManager_ from 'expo-task-manager';

// TaskManager_.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {

//   console.log("location update ", error, data)
//   if (error) {
//     alert("error")
//     // Error occurred - check `error.message` for more details.
//     return;
//   }
//   if (data) {


//     socket.emit("ping", data)
//     const { locations } = data;
//     // do something with the locations captured in the background
//   }
// });












function ExistingTripPage(props: { activeTrip: ApiTypesDriver['loadActiveTripMetadata']['res'] }) {

  const router = useRouter()

  
  return <>
    <YStack>
      <Button borderRadius={0} justifyContent="space-between" onPress={_ => router.navigate("/trip/active")}>
        <Text>  Track
        </Text>
        <ArrowBigRight />
      </Button>
    </YStack>
    <YStack padding="$2" gap={"$2"} backgroundColor={"$background075"} height={"100%"}>
      <H3>Current Student list </H3>
      <YGroup bordered  >
        {
          props.activeTrip.route.Students.map((student, idx) => {
            return <YGroup.Item key={idx}>
              <ListItem hoverTheme title={`${student.firstName} ${student.lastName}`} subTitle="Twinkles" >

              </ListItem>
            </YGroup.Item>
          })
        }
      </YGroup>
    </YStack>
  </>
}







function NoTripPage(props: { refetch: () => void }) {
  const toast = useToastController()
  const [tracking, setTracking] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useAppDispatch()
  const activeTrip = useAppSelector(s => s.trip.activeTrip)
  const router = useRouter()

  const routesApi = useQuery({
    queryKey: [],
    queryFn: fetchRoutes,
  })


  const tripApi = useMutation({
    mutationFn: createTripApi,
    onSuccess(data, variables, context) {
      props.refetch()
      toast.show("Started new trip.")

      // dispatch(addActiveTrip({ id: data.id, tripStartTime: data.tripStartTime }))
      router.navigate(`/trip/active`)

    },
  })

  const [route, setRoute] = useState("")
  // const authCtx = useContext(AuthContext)



  useEffect(() => {
    (async () => {
      // const socket = getSocket()
      let forePerm = await Location.requestForegroundPermissionsAsync();
      let bgPerm = await Location.requestBackgroundPermissionsAsync();

      if (forePerm.granted && bgPerm.granted) {
        setErrorMsg('Permission to access location was denied');
        return;
      }


    })();
  }, []);

  useSocketEvents({
    test: (data) => { console.log(data) }
  })


  useEffect(() => {
    if (routesApi.data) {
      // console.log(routesApi.data.data)
      const myActiveTrip = routesApi.data.data.trips.find(t => t.vehicleDriverId == 1)
      if (myActiveTrip) {
        // dispatch(addActiveTrip({ id: myActiveTrip.id, tripStartTime: (myActiveTrip.tripStartTime) }))
      }
    }


  }, [routesApi.data])



  if (!routesApi.data?.data?.routes) {
    // console.log(routesApi.data, "---", routesApi.error?.response?.data)
    return <Paragraph>Error loading routes <Paragraph onPress={routesApi.refetch as () => void} color={"$accentBackground"}>refresh</Paragraph></Paragraph>
  }







  return (
    <>
      <YStack
        disabled={true}
        // height={"100%"}
        alignItems="center"
        // justifyContent="center"
        alignContent="center"
        gap="$4"

        padding="$2"
      >
        <Select
          value={route}
          onValueChange={setRoute}
          disablePreventBodyScroll >
          <Select.Trigger width={220}
          // iconAfter={ChevronDown}
          >
            <Select.Value placeholder="Select Route" />
          </Select.Trigger>

          <Adapt platform="touch">
            <Sheet
              modal
              dismissOnSnapToBottom
              animationConfig={{
                type: 'spring',
                damping: 20,
                mass: 1.2,
                stiffness: 250,
              }}
            >
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>

          <Select.Content zIndex={200000}>
            <Select.ScrollUpButton
              alignItems="center"
              justifyContent="center"
              position="relative"
              width="100%"
              height="$3"
            >
              <YStack zIndex={10}>
                {/* <ChevronUp size={20} /> */}
              </YStack>

            </Select.ScrollUpButton>

            <Select.Viewport
              // to do animations:
              // animation="quick"
              // animateOnly={['transform', 'opacity']}
              // enterStyle={{ o: 0, y: -10 }}
              // exitStyle={{ o: 0, y: 10 }}
              minWidth={200}
            >
              <Select.Group>
                <Select.Label>Routes</Select.Label>
                {/* for longer lists memoizing these is useful */}
                {

                  routesApi.data.data.routes.map((item, i) => {

                    return (
                      <Select.Item
                        index={i}
                        key={item.id}
                        value={String(item.id)}
                      >
                        <Select.ItemText>{item.title}</Select.ItemText>
                        <Select.ItemIndicator marginLeft="auto">
                          {/* <Check size={16} /> */}
                        </Select.ItemIndicator>
                      </Select.Item>
                    )
                  })

                }
              </Select.Group>
              {/* Native gets an extra icon */}

            </Select.Viewport>

            <Select.ScrollDownButton
              alignItems="center"
              justifyContent="center"
              position="relative"
              width="100%"
              height="$3"
            >
              <YStack zIndex={10}>
                {/* <ChevronDown size={20} /> */}
              </YStack>

            </Select.ScrollDownButton>
          </Select.Content>
        </Select>

        {<Button disabled={route == ""} onPress={async () => {
          if ((await (Location.getForegroundPermissionsAsync())).granted) {
            const parsedRoute = parseInt(route)

            //@ts-ignore
            tripApi.mutate({ transportRouteId: parsedRoute })
          }
        }}>Start Trip</Button>}



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
          <YStack padding="$5" gap="$8">
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
