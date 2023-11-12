'use client'
import React,{ useState, useEffect }  from 'react'
import Image from 'next/image'
import AutosCards from '@/components/AutosCards';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'


const query2 = gql`
query{
  Posts(limit:100){
    totalDocs
    docs{
      id
      title
      price
      Year
      content
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
  const [cantidadAMostrar, cambiarCantidadAMostrar] = useState(6);
  const [filtroClase, setFiltroClase] = useState(null);
 
  const cargarMas = () => {
    cambiarCantidadAMostrar(cantidadAMostrar + 3); 
  };
  useEffect(() => {
    if (data && data.Posts) {
      cambiarCantidadAMostrar(6);
    }
  }, [data]);



  return (
    <>
      <div>
        <div className='relative contenedorBanner bg-zinc-900 overflow-hidden'>
          <Image priority src={data.Posts.docs[8].ImagenCarro.url } width={1280} height={720} alt='mustang banner' className={`absolute inset-0 object-cover object-left mt-10 w-full h-full  `} />
          <div className=' absolute inset-0 flex '>
          <span className='text-neutral-50 textShadowBanner text-xl sm:text-2xl md:text-4xl font-bold uppercase mt-32 ml-10 transition-opacity duration-500'>{data.Posts.docs[8].title}</span>
          </div>
        </div>
      </div>
      <div className=' w-full  text-white bg-zinc-900 px-8 py-2'>
        <div className='h-16 sm:flex  items-center justify-between text-center'>
          <span className='text-sm md:text-xl  block'>Mostrando <span className='font-bold'>1</span> - <span className='font-bold'>{cantidadAMostrar}</span> de <span className='font-bold'> {(data.Posts.totalDocs)-1}</span> resultados</span>
          <div className='font-semibold'>
            <span className='text-sm md:text-xl inline-block mr-5'>Filtro:</span>
            <select
              className='px-2 text-black rounded'
              onChange={(e) => setFiltroClase(e.target.value)}
            >
              <option value={null}>Todos</option>
              <option value="autos pequeños">Clase A-B</option>
              <option value="autos medianos">Clase C</option>
              <option value="autos grandes">Clase D</option>
              <option value="vehiculos deportivos">Vehículo deportivos</option>
            </select>
          </div>
        </div>
      </div>  
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white bg-zinc-900 gap-y-4 sm:gap-y-8'>
      {data.Posts.docs
        .filter((post) => {
          // Verifica si el post tiene el tag correspondiente a la clase seleccionada,
          // o si no hay filtro (filtroClase es null).
          if(filtroClase ==="Todos"){setFiltroClase(null)}
          return (
            !filtroClase ||
            post.tags.some((tag) => tag.name === filtroClase)
          );
        })
        .slice(0, cantidadAMostrar)
        .map((post) => {
          return(
              <AutosCards post={post} key={post.id} catalogo={true} />
              ) 
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
