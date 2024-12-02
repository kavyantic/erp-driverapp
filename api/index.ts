import { ApiTypesDriver } from "@/api-types";
import { API_URL } from "@/constants";
import { store } from "@store";
import axios from "axios"
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: API_URL || process.env.EXPO_PUBLIC_API_URL,
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});


api.interceptors.request.use(
    (config) => {
        // Get the token from localStorage
        const token = (store.getState().auth.user?.token);


        // If a token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;  // Proceed with the request
    },
    (error) => {
        // Handle errors before the request is sent
        return Promise.reject(error);
    }
);





const createTripApi =
    async (payload: ApiTypesDriver['initiateTrip']['payload']): Promise<ApiTypesDriver['initiateTrip']['res']> =>
        await api.post("/driver/trip", payload)


const getActiveTrip =
    async () => {
        return await api.get<ApiTypesDriver['loadActiveTripMetadata']['res']>(`driver/trip/get_active`)
    }

getActiveTrip.query_key = "active_trip_api"

export { createTripApi, getActiveTrip, api }