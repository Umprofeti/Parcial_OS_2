'use client'
import React,{ useState, useEffect }  from 'react'
import Image from 'next/image'
import AutosCards from '@/components/AutosCards';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'
import Link from 'next/link';


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
  const [posicionBanner, cambiarPosicionBanner]= useState(10);
 
  const cargarMas = () => {
    cambiarCantidadAMostrar(cantidadAMostrar + 3); 
  };
  useEffect(() => {
    if (data && data.Posts) {
      cambiarCantidadAMostrar(6);
    }
  }, [data]);

  const autoBanner = () => {
    for (let i = 0; i < data.Posts.docs.length; i++) {
      for (let e = 0; e < data.Posts.docs[i].tags.length; e++) {
        if (data.Posts.docs[i].tags[e].name === "bannercatalogo") {
          cambiarPosicionBanner(i);
        }
      }
    }
  };
  useEffect(() => {
    autoBanner();
  }, []);

  return (
    <>
      <div>
        <div className='relative contenedorBanner bg-zinc-900 overflow-hidden'>

          <Image priority src={data.Posts.docs[posicionBanner].ImagenCarro.url} width={1280} height={720} alt={data.Posts.docs[posicionBanner].ImagenCarro.filename} className={`absolute inset-0 object-cover object-left  w-full h-full  `} />
          <div className=' absolute inset-0 flex '>
            <div className='mt-20 sm:mt-32 ml-5 ms:ml-10'>
              <span className='text-neutral-50 textShadowBanner text-xl sm:text-2xl md:text-4xl font-bold uppercase   transition-opacity duration-500'>{data.Posts.docs[posicionBanner].title}</span>
              <span className='hidden md:block w-3/5 text-white textShadowBanner text-lg py-2'>Este modelo llega para cautivar a todos. Su amplia gama de tecnologías te entregarán la conectividad y seguridad que siempre quisiste.</span>
              <Link href={`/reservar/${data.Posts.docs[posicionBanner].id}`} className='block w-40 sm:w-52 text-white py-2 bg-red-700 px-0 text-center sm:px-10 font-semibold rounded-lg'>Conocer más</Link>
            </div>
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
