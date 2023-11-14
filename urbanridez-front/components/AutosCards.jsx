import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';

export default function AutosCards({post, catalogo}) {
  const [visibilidadInfoExtra, cambiarVisibilidadInfoExtra] = useState(false);
  const CardInfoExtra =()=>{
    cambiarVisibilidadInfoExtra(!visibilidadInfoExtra)
  }

  const formateoDinero=(valor)=>{
    const opciones = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat('en-US', opciones).format(valor);
  }

  const precioFormateado = formateoDinero(post.price);

  const normal =catalogo;
  return (
    <>{normal?
        <div className='bg-red-600 mx-6 py-3 rounded relative'>
          <div className='mx-8 sm:mx-4 bg-black py-3 rounded'>
            <Image onMouseOver={()=>{CardInfoExtra()}} src={post.ImagenCarro.url} width={1280} height={720} alt={post.ImagenCarro.filename} className='w-4/5 mx-auto aspect-video'/>
            <div className='flex justify-between px-5 sm:px-10 my-5  text-center'>
              <Link href={`/reservar/${post.id}`} className=' mt-3 uppercase text-sm sm:text-md underline font-semibold'>{post.title}</Link>
              <span className='uppercase block py-3 '>{precioFormateado}</span>
            </div>
            <div className='flex justify-between px-5 sm:px-10 items-center mb-2'>
              <span >Año:{post.Year}</span>
              <Link href={`/reservar/${post.id}`} className='py-2 bg-red-700 px-10 sm:px-10 font-semibold rounded-lg'>Reservar</Link>
            </div>
            <button onClick={()=>{CardInfoExtra()}} className='btnInfoExtra mx-auto mt-3 block sm:hidden'>Ver información extra</button>
          </div>
          {visibilidadInfoExtra ? 
          <div onMouseLeave={()=>{CardInfoExtra(post)}} className='glass-container px-4 text-center cardEnterInfo absolute z-10 w-full h-full top-0 rounded'>
            <h3 className='mt-7 text-xl font-semibold'>Información extra del vehiculo</h3>
            <span className='text-lg font-bold'>Caracteristicas</span>
            <ul className='uppercase text-left px-4 text-sm mt-3'>
              {post.content[0].children.map((contenido)=>{
                return contenido.children.map((contenidoLi,index)=>{
                  return(<li key={`liInformacion-${index}`} className='py-2 pt-4'>{contenidoLi.text}</li>)
                })
              })}
            </ul>
          </div>
          :""
        }
        </div>
      :
      <div className='mx-5 bg-black py-6 mt-4 rounded relative'>
          <Image onMouseOver={()=>{CardInfoExtra()}} src={post.ImagenCarro.url} width={640 } height={240} alt={post.ImagenCarro.filename} className='w-4/5 mx-auto mt-2 aspect-video rounded mb-5' />
          <Link href={`/reservar/${post.id}`} className='uppercase text-md sm:text-lg underline font-semibold'>{post.title}</Link>
          <span className='uppercase block py-3'>{precioFormateado}</span>
          <Link href={`/reservar/${post.id}`} className='py-3 bg-red-700 px-2 font-semibold rounded-lg'>Reservar para compra</Link>
          <button onClick={()=>{CardInfoExtra()}} className='btnInfoExtra mx-auto mt-3 block sm:hidden'>Ver información extra</button>

          {visibilidadInfoExtra ? 
          <div onMouseLeave={()=>{CardInfoExtra(post)}} className='glass-container cardEnterInfo absolute z-10 w-full h-full top-0 rounded'>
            <h3 className='mt-7 text-xl font-semibold'>Información extra del vehiculo</h3>
            <span className='text-lg font-bold'>Caracteristicas</span>
            <ul className='uppercase text-left px-4 text-sm mt-3'>
            <ul className='uppercase text-left px-4 text-sm mt-3'>
              {post.content[0].children.map((contenido)=>{
                  return contenido.children.map((contenidoLi,index)=>{
                    return(<li key={`liInformacion-${index}`} className='py-2 pt-4'>{contenidoLi.text}</li>)
                  })
                })}
            </ul>
            </ul>
          </div>
          :""
        }
        </div>
    }
    </>
  )
}
