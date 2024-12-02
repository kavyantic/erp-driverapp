import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

// export default function DetailsScreen() {
//     const { id } = useLocalSearchParams();

//     return (
//         <View style={styles.container}>
//             <Text>Details of user {id} </Text>
//         </View>
//     );
// }




// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
type MapView = {}
import { useToastController } from '@tamagui/toast';
// import { MapPin } from "@tamagui/lucide-icons"
import { Button, Sheet } from 'tamagui';
import { getRegisteredTasksAsync } from 'expo-task-manager';
import { LOCATION_TASK_NAME } from '@/constants';
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    
  },
});

export default function ActiveTrip() {
  const toast = useToastController()

  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  })
  const ref = useRef<MapView>(null)
  Location.getCurrentPositionAsync().then(l => console.log(l))

  useEffect(() => {
    getRegisteredTasksAsync().then(l => console.log("registered tasks : ", l))
    Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(task => { console.log("location task returned  ", task) })
    var a = 3;
    (async () => {
      const loc = await Location.getCurrentPositionAsync()
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      })
    })()
  }, [])



  useEffect(() => {
    ref.current?.animateToRegion({ ...location, latitudeDelta: 1, longitudeDelta: 1 })

  }, [location])

  return <View style={styles.container}>
    {/* <MapView
      ref={ref}
      // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
    >
      <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
    </MapView> */}
    <Button circular
      onPress={_ => ref.current?.animateToRegion({ ...location, latitudeDelta: 0.02, longitudeDelta: 0.02 })}
      display='flex' justifyContent='center'
      alignItems='center' position='absolute'
      alignContent='center' borderRadius={"100%"}
      right="$3" bottom="$2" >
      {/* <MapPin /> */}
    </Button>
  </View>
}