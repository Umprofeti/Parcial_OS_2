'use client'
import React,{ useState, useEffect }  from 'react'
import Image from 'next/image'
import AutosCards from '@/components/AutosCards';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'

const query2 = gql`
query{
  Posts{
    docs{
      id
      title
      price
      tags{
        id
        name
      }
      category{
        name
      }
      ImagenCarro{
        url
        filename
      }
      
    }
  }
}
`;

export default function CatalogoPage() {
  const { data, error } = useSuspenseQuery(query2);
  if(error){ return(<p>Error</p>)}
  const [cantidadAMostrar, cambiarCantidadAMostrar] = useState(3); 
  const anio =" 2023";//Será borrado

  const cargarMas = () => {
    cambiarCantidadAMostrar(cantidadAMostrar + 3); 
  };

  useEffect(() => {
    if (data && data.Posts) {
      cambiarCantidadAMostrar(3);
    }
  }, [data]);
  
  const formateoDinero=(valor)=>{
    const opciones = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return new Intl.NumberFormat('en-US', opciones).format(valor);
  }



  return (
    <>
      <div>
        <div className='relative contenedorBanner bg-zinc-900 overflow-hidden'>
          <Image priority src={data.Posts.docs[1].ImagenCarro.url} width={1280} height={720} alt='mustang banner' className={`absolute inset-0 object-cover object-left mt-10 w-full h-full  `} />
          <div className=' absolute inset-0 flex '>
          <span className='text-neutral-50 textShadowBanner text-xl sm:text-2xl md:text-4xl font-bold uppercase mt-32 ml-10 transition-opacity duration-500'>{data.Posts.docs[0].title}</span>
          </div>
        </div>
      </div>
      <div className=' w-full  text-white bg-zinc-900 px-8 py-2'>
        <div className='h-16 sm:flex  items-center justify-between text-center'>
          <span className='text-sm md:text-xl font-semibold block'>Mostrando 1 - 8 de x resultados</span>
          <span className='text-sm md:text-xl font-semibold mr-8 block'>Filtro: &darr;</span>
        </div>
      </div>  
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white bg-zinc-900 gap-y-4 sm:gap-y-8'>
        {data.Posts.docs
          .filter((post) => post.tags.every((tag) => tag.name !== 'bannercatalogo'))
          .slice(0, cantidadAMostrar)
          .map((post) => {
            const precioFormateado = formateoDinero(post.price);
            return (
              <AutosCards
                imagen={post.ImagenCarro.url}
                titulo={post.title}
                precio={precioFormateado}
                anio={anio}
                catalogo={true}
                alt={post.ImagenCarro.filename}
                key={post.id}
              />
            );
          })}
      </div>
      <div className='text-center bg-zinc-900 py-10 text-red-600'>
        {cantidadAMostrar < data.Posts.docs.length && (
        <>
          <span>------------ </span>
            <button className='uppercase font-bold tracking-wide textShadowBanner' onClick={()=>{cargarMas()}}>Ver más resultados</button>
          <span> ------------</span>
        </>
        )}
      </div>
    </>
  )
}
