import {  SecureKeys } from "@/context/AuthContext";
import axios from "axios"
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: "http://192.168.225.99:8000" || process.env.EXPO_PUBLIC_API_URL,
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});


api.interceptors.request.use(
    (config) => {
        // Get the token from localStorage
        const token = SecureStore.getItem(SecureKeys.TOKEN);
        

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


export {api}





