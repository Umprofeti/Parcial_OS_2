import React from 'react'
import Image from 'next/image'

export default function NuevoCatalogo({imagen, titulo, precio}) {
  return (
    <div className='mx-8 bg-black py-6 mt-4 rounded'>
        <Image src={imagen} width={480} height={360} alt={titulo} className='w-4/5  mx-auto'/>
        <h2 className='mt-3 uppercase text-xl'>{titulo}</h2>
        <span className='uppercase block py-3'>${precio}</span>
        <button className='py-3 bg-red-700 px-2 font-semibold rounded-lg'>Ver este modelo</button>
    </div>
  )
}
