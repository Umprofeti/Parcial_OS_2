'use client'
import React, { useEffect, useState } from 'react'

export default function MensajeAlerta() {
  const [animacionMensaje, cambiarAnimacionMensaje]= useState(true);

  useEffect(() => {
      const pausaAnimacion = setTimeout(() => {
        cambiarAnimacionMensaje(!animacionMensaje)
      }, 2000);
  
      return () => clearTimeout(pausaAnimacion);
  }, []);
  return (
<div className={`absolute z-50 w-1/3 h-20 bg-white top-0 left-1/2 transform -translate-x-1/2  animate-stayAtTop rounded ${animacionMensaje?"animacionInicioMensaje":"animacionSalidaMensaje"}`}>
  <div className='w-full h-full flex'>
    <p className='mx-auto items-center text-xl my-auto'>Se ha enviada la información</p>
  </div>
  </div>
  )
}
