import Image from "next/image";
import { Inter } from "next/font/google";
import { io } from 'socket.io-client';
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const socket = io("http://localhost:3000/");

  const createRoom = () => {
    socket.emit("createRoom")
  }

  useEffect(() => {
    socket.on('roomCreated', (room) => {
      console.log(room);
    });

    return () => {
      socket.off('roomCreated');
    };
  }, []);
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-24 ${inter.className}`}
    >
      <div className="relative flex place-items-center">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="flex flex-wrap items-center justify-center mt-20 w-full gap-5">
        <input type="text" placeholder="Enter the room code" className="w-4/12 p-3 border-b-2 focus:outline-none focus-visible:border-b-2 text-base focus-visible:border-blue-700 capitalize border-t-0 border-r-0 border-l-0 border-white bg-transparent"  /> 
        <button onClick={createRoom} className="w-2/12 bg-blue-700 text-white text-lg p-3 rounded-full cursor-pointer hover:bg-blue-800">
          Join Room
        </button>
        <button onClick={createRoom} className="w-2/12 bg-blue-700 text-white text-lg p-3 rounded-full cursor-pointer hover:bg-blue-800">
          Create Room
        </button>
      </div>
    </main>
  );
}
