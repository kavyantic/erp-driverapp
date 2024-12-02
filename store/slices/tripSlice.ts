// import { LOCATION_TASK_NAME } from '@/tasks/locUpdateTask';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '@store';
// import type { RootState } from '../../app/store'
import * as Location from "expo-location"

const LOCATION_TASK_NAME=""
export interface TripSlice {
    activeTrip: { id: number, tripStartTime: string } | null;
}

const initialState: TripSlice = {
    activeTrip: null
}

export const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        addActiveTrip(state, action: PayloadAction<TripSlice['activeTrip']>) {
            state.activeTrip = action.payload
        },
        endActiveTrip: state => {
            state.activeTrip = null
        }
    }
    ,
    extraReducers: (builder) => {
        builder
            .addMatcher<AppDispatch>(addActiveTrip.match, () => {
                (async () => {
                    const { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        console.log('Foreground location permission not granted');
                        return;
                    }
                    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
                    if (backgroundStatus !== 'granted') {
                        console.log('Background location permission not granted');
                        return;
                    }
                    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                        accuracy: Location.Accuracy.BestForNavigation,
                        distanceInterval: 10,
                        deferredUpdatesInterval: 4000, // Minimum time interval in milliseconds between location updates
                        showsBackgroundLocationIndicator: true,
                        foregroundService: {
                            notificationTitle: 'Tracking Location',
                            notificationBody: 'We are tracking your location in the background',
                            notificationColor: '#fff',
                        },
                    });
                })();
            }).addMatcher(endActiveTrip.match, () => {
                (async () => {
                    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);

                })()
            })

    },
})

export const { addActiveTrip, endActiveTrip } = tripSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

