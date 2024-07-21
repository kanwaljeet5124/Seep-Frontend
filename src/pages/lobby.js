import { useWebSocket } from '@/context/socketContext'
import React, { useEffect } from 'react'

export default function Lobby() {
    const socket = useWebSocket();

    useEffect(()=>{
        if(socket){

        }
    },[socket]);
    
    return (
        <>
        <div className="relative flex place-items-center">
            <h1 className="text-white text-6xl font-bold relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "> Seep Lobby </h1>
        </div>
        </>
    )
}
