import { useWebSocket } from '@/context/socketContext'
import Card from '@/modules/Card';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
export default function Lobby() {
    const socket = useWebSocket();
    const router = useRouter();
    const tableId = router.query["lobby"];
    const [table, setTable] = useState(null);
    const [gameLog, setGameLog] = useState(null);
    const getTabledetails = () => {
        socket.emit("request-table-details", tableId)
    }

    const openCard = (e) => {
        const index = e.target.getAttribute("index");
        socket.emit("open-card", {tableId, index});
    }

    useEffect(()=>{
        if(socket){
            getTabledetails();
            socket.on("get-table-details", res => {
                if(res.status){
                    setTable(res.data);
                }
            });

            socket.on("new-user-joined", res => {
                if(res.status){
                    setTable(res.data);
                }
            });

            socket.on("message", res => {
                if(res.status){
                    toast.info(res.message, {
                        toastId:`Room-joined-success-${Math.random()}`
                    })
                }
            });
            
            socket.on("game-started", res => {
                if(res.status){
                    toast.info(res.message, {
                        toastId:`Room-joined-success-${Math.random()}`
                    });
                    setGameLog(res.data);
                    setTable(res.table);
                }
            });

            socket.on("card-opened", res => {
                if(res.status){
                    setGameLog(res.data);
                }
            });
            
            return () => {
                socket.off('get-table-details');
                socket.off('new-user-joined');
                socket.off('message');
                socket.off('game-started');
            };
        }
    },[socket]);
    
    const playTheGame = () => {
        socket.emit("start-game", tableId);
    }
    return (
        <div className='max-w-[1240px] mx-auto w-full flex flex-wrap justify-between items-start'>
            <div className="relative w-full">
                <h1 className="text-white w-full text-center text-6xl font-bold relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "> Seep </h1>
            </div>

            <div className='w-2/12 mt-10'>
                <div className='grid grid-cols-1 gap-3 w-full '>
                    {table && table.players && table.players.map((player, index) => <div key={`Player-${index}`} className='flex flex-wrap p-5 bg-transparent border border-dashed border-white rounded-xl items-center justify-center'>
                        <span className='rounded-full size-12 flex flex-wrap items-center justify-center font-semibold text-xl bg-blue-600 text-white'> K </span>
                        <h2 className='mt-3 text-md w-full text-center'>{player.name}</h2>
                    </div>)}
                </div>
                {table && table.leader == socket.id && !table.gameStarted && <div className='w-full'>
                    <button 
                        onClick={playTheGame} 
                        className={`bg-blue-700 hover:bg-blue-800 mt-10  w-full text-white text-lg p-3 rounded-full cursor-pointer `}
                    >
                        Let&apos;s Start
                    </button>
                </div>}
            </div>
            
            <div className='w-9/12 mt-10 border border-dashed border-white rounded-xl p-5'>
                <div className='w-full grid grid-cols-deck-grid gap-3 ease-linear origin-center'>
                    {gameLog && gameLog.openedCard.map((item, index) => <Card handler={openCard} key={index + 1} index={index} data={item}></Card>)}
                </div>
            </div>
        </div>
    )
}
