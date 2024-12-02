import { getActiveTrip } from '@/api'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { socket } from './socket'

export default function TripTracker() {
    const activeTripApi = useQuery({ queryKey: [getActiveTrip.query_key], queryFn: getActiveTrip })

    useEffect(() => {
        if(activeTripApi){
            
        }
    }, [])
    return (
        <></>
    )
}
