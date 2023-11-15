'use client'
import React, { useEffect, useState } from 'react'

export default function MensajeAlerta({visibilidadMensaje, error,cambiarVisibilidadMensaje}) {
  const [animacionMensaje, cambiarAnimacionMensaje]= useState(true);

  useEffect(() => {
      const pausaAnimacion = setTimeout(() => {
        cambiarAnimacionMensaje(!animacionMensaje)
      }, 2500);
    
      return () => {
        clearTimeout(pausaAnimacion) 
      };
  }, []);
  return (
  <>
    <div className={`absolute z-50 w-11/12 md:w-3/4 lg:w-1/3 h-20 ${error? "bg-red-600": "bg-green-600"}   shadow-md left-1/2 transform -translate-x-1/2 rounded-xl ${animacionMensaje?"animacionInicioMensaje":"animacionSalidaMensaje"}`}>
    {/* <div className={`absolute z-50 w-1/3 h-20 ${error? "bg-red-600": "bg-green-600"}   shadow-md left-1/2 transform -translate-x-1/2 rounded-xl ${animacionMensaje?"animacionInicioMensaje":"animacionSalidaMensaje"}`}> */}
    <div className='w-full h-full flex'>
        <p className='mx-auto items-center text-center text-sm md:text-lg px-3 my-auto font-semibold font-sans text-white'>{visibilidadMensaje}</p>
        {/* <p className='mx-auto items-center text-center text-lg px-3 my-auto font-semibold font-sans text-white'>No hay más autos en stock, vuelva a reintentarlo más tarde</p> */}

      </div>
      </div>
  </>
  )
}
