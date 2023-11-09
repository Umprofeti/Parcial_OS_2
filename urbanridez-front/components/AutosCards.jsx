import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

export default function AutosCards({imagen, titulo, precio,anio, catalogo, alt}) {

  const normal =catalogo;
  return (
    <>{normal?
        <div className='bg-red-600 mx-6 py-3 rounded'>
          <div className='mx-8 sm:mx-4 bg-black py-3 rounded'>
            <Image src={imagen} width={1280} height={720} alt={alt} className='w-4/5 mx-auto'/>
            <div className='flex justify-between px-5 sm:px-10 my-5'>
              <Link href={'/'} className=' mt-3 uppercase text-sm sm:text-md underline font-semibold'>{titulo}</Link>
              <span className='uppercase block py-3 '>{precio}</span>
            </div>
            <div className='flex justify-between px-5 sm:px-10 items-center mb-2'>
              <span >Año:{anio}</span>
              <button className='py-2 bg-red-700 px-10 sm:px-10 font-semibold rounded-lg'>Ver</button>
            </div>
          </div>
        </div>
      :
      <div className='mx-5 bg-black py-6 mt-4 rounded'>
        <Image src={imagen} width={640 } height={240} alt={alt} className='w-4/5 mx-auto mt-2 aspect-video rounded' />
        <h2 className='mt-3 uppercase text-xl'>{titulo}</h2>
        <span className='uppercase block py-3'>{precio}</span>
        <button className='py-3 bg-red-700 px-2 font-semibold rounded-lg'>Ver este modelo</button>
      </div>
    }
    </>
  )
}
