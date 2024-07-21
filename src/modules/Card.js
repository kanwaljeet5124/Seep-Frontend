import React from 'react'

export default function Card({handler, index, data}) {
  return (
    <>
      {data == 0? <div onClick={handler} index={index} className='w-full cursor-pointer hover:scale-110 size-20 border border-white bg-white rounded-xl flex items-center justify-center text-blue-700' style={{background: "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(230,33,205,1) 35%, rgba(0,212,255,1) 100%)"}}>
            
      </div>:
      <div onClick={handler} index={index} className='w-full size-20 border border-white bg-white rounded-xl flex items-center justify-center text-blue-700'>
        
      </div>
      }
    
    </>
  )
}
