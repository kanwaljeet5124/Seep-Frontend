import Image from "next/image";
import { socket } from "@/modules/socket";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useWebSocket } from "@/context/socketContext";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import Card from "@/modules/Card";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const socket = useWebSocket();
  const [name, setName] = useState("")
  const [roomId, setRoomId] = useState("");
  const router = useRouter();
  const getStarted = () => {
    socket.emit("join-room", {name, roomId});
  }

  const createRoom = () => {
    socket.emit("create-room");
  }

  useEffect(() => {
    if(socket){
      socket.on('room-created', (res) => {
        if(res.status){
          setRoomId(res.data.roomId)

          toast.success("Room created",{
            toastId:`Room-creation-success`
          })
        }
        else{
          toast.error(res.message,{
            toastId:`Room-creation-error`
          })
        }
      });

      socket.on('room-joined', (res) => {
        if(res.status){
          toast.success("Room Joined",{
            toastId:`Room-joined-success`
          })
        }
        else{
          toast.error(res.message,{
            toastId:`Room-joined-error`
          })
        }
        router.push(`/lobbies/${res.data.id}`);
      });

      socket.on("room-full", res => {
        console.log(res)
        if(res.status){
            toast.error(res.message, {
                toastId:`Room-full-${Math.random()}`
            })
        }
      });

      return () => {
        socket.off('room-created');
        socket.off('room-joined');
        socket.off('room-full');
      };
    }
  }, [socket]);
  
  return (
    <div className="max-w-[500px] mx-auto flex flex-wrap">
      <div className="relative flex place-items-center w-full">
        <h1 className="text-white w-full text-center text-6xl font-bold relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "> Seep </h1>
      </div>
      <div className="flex flex-wrap items-start justify-center mt-20 w-full gap-5">
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter your name" className="w-full p-3 border-2 focus:outline-none focus-visible:border-2 text-base focus-visible:border-blue-700 capitalize border-white bg-transparent rounded-lg"  /> 
        <div className="w-full flex flex-wrap items-center justify-between">
          <input type="text" onChange={(e) => setRoomId(e.target.value)} value={roomId} placeholder="Enter Room Code" className="w-5/12 p-3 border-2 focus:outline-none focus-visible:border-2 text-base focus-visible:border-blue-700 capitalize border-white bg-transparent rounded-lg"  /> 
          <span className="w-2/12 flex flex-wrap items-center justify-center font-bold"> OR </span>
          <button onClick={createRoom} className="w-5/12 bg-transparent text-white text-lg p-3 rounded-full cursor-pointer hover:bg-blue-800 hover:border-blue-800 hover:text-white border-2 border-white">
            Create Room
          </button>
        </div>
        <button 
          onClick={getStarted} 
          className={`${name!="" && roomId!=""? "bg-blue-700 hover:bg-blue-800" : "opacity-20 cursor-not-allowed"} mt-10  w-full bg-blue-700 text-white text-lg p-3 rounded-full cursor-pointer `}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
