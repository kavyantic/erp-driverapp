import { API_URL } from "@/constants";
import { io, Socket } from "socket.io-client";
import * as SecureStore from 'expo-secure-store';
import { SecureKeys } from "@/context/AuthContext";
import { useEffect } from "react";



export const socket = io(API_URL + "/driver", {
    transports: ["websocket"],
    auth(cb) {
        const token = SecureStore.getItem(SecureKeys.TOKEN);
        cb({ token: token })
    },
});

export const getSocket = async () => {


    return new Promise<Socket>((resolve, reject) => {
        // if (socket && socket.connected) {
        //     resolve(socket)
        // }

        // if (connecting) {
        //     var wait = setTimeout(() => getSocket().then(resolve), 500)


        // } else {
        //     connecting = true;

        //     socket = io(API_URL + "/driver", {
        //         transports: ["websocket"],
        //         auth(cb) {
        //             const token = SecureStore.getItem(SecureKeys.TOKEN);
        //             cb({ token: token })
        //         },
        //     });

        //     const tm = setTimeout(() => { reject(socket) }, 3000)

        //     socket.on("connection", () => {
        //         connecting = false
        //         clearTimeout(tm)
        //         resolve(socket)
        //     })
        // }


    })
}


export const useSocketEvents = (events: Record<string, (...args: any[]) => void>, deps: [] = []) => {

    useEffect(() => {
        for (let key in events) {
            getSocket().then(soc => soc.on(key, events[key]))
        }
        return () => {
            for (let key in events) {
                getSocket().then(sock => sock.off(key, events[key]))
            }
        }
    }, [...deps])

}


