import React from 'react'
import Image from 'next/image'
import mustang from '../src/img/mustang01.jpg';

export default function BannerPresentacion() {
  return (
  <>
    <div className='relative h-96 bg-slate-600 overflow-hidden'>
      <Image priority="eager" src={mustang} width={1280} height={720} alt='mustang banner' className='absolute inset-0 object-cover w-full h-full ' />
      <div className='bg-black bg-opacity-50 absolute inset-0 flex items-center justify-center'>
        <span className='text-white text-xl sm:text-2xl md:text-4xl   font-bold uppercase'>Urbanridez</span>
      </div>
    </div>
    <div className=''>
      <div className='flex h-14 bg-red-700 items-center'>
        <p className=' w-full text-md md:text-2xl uppercase text-center text-white font-semibold sm:font-bold '>¡Los mejores autos a los mejores precios!</p>
        </div>
        <div className='p-3 h-auto bg-black items-center text-white'>
          <h2 className='text-xl text-center p-3 font-bold '>Nosotros</h2>
          <p className='text-center pb-5 px-5 lg:px-40'>Desde 2019, UrbanRidez ha sido una de las principales Concesionaria de autos en Ciudad de Panamá . En nuestra concesionaria, estamos comprometidos con ofrecer servicio de calidad a todos nuestros clientes. Nuestras opciones de financiación facilitan adquirir el vehículo de sus sueños.</p>
        </div>
    </div>
  </>
  )
}
