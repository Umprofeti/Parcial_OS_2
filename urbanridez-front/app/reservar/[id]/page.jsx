'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Image from 'next/image'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReservarFormulario from '@/components/ReservarFormulario'

function cargarItemCarro (id){
  const queryReserva = gql`
  query{
    Posts(where:{id:{equals: "${id}"}}){
      docs{
        id
        title
        price
        Year
        content
        Stock
        tags{
          id
          name
        }
        category{
          name
        }
        ImagenCarro{
          id
          url
          filename
        }

      }
    }
  }`;
    return queryReserva;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

// async function setHeader(){

//   await fetch('http://localhost:3040/api/users', {
//     headers:{
//       Authorization: 'Users API-Key 03068e56-cf08-4ae8-87d2-efb7953ff3e7'
//     }
//   })

// }



export default function ReservarPage() {

  /* Consulta para setear el header en la petición */
  
  
  const {id} = useParams()
  const { data, error } = useSuspenseQuery(cargarItemCarro(id));
  const [visibilidadFormulario, cambiarVisibilidadFormulario] = useState(false);
  const datosCarro = [{
    "idpost":data.Posts.docs[0].id,
    "modelo": data.Posts.docs[0].title,
    "precio": data.Posts.docs[0].price,
    "anio": data.Posts.docs[0].Year,
    "stock": data.Posts.docs[0].Stock,
    "imagenesCarro": [
      {
        "imgAuto": data.Posts.docs[0].ImagenCarro.url,
        "altAuto": data.Posts.docs[0].ImagenCarro.filename,
        "idAuto": data.Posts.docs[0].ImagenCarro.id
      },
      {
        "imgAuto": data.Posts.docs[0].content[1].value.url,
        "altAuto": data.Posts.docs[0].content[1].value.filename,
        "idAuto": data.Posts.docs[0].content[1].value.id

      },
      {
        "imgAuto": data.Posts.docs[0].content[2].value.url,
        "altAuto": data.Posts.docs[0].content[2].value.filename,
        "idAuto": data.Posts.docs[0].content[2].value.id
      },
      {
        "imgAuto": data.Posts.docs[0].content[3].value.url,
        "altAuto": data.Posts.docs[0].content[3].value.filename,
        "idAuto": data.Posts.docs[0].content[3].value.id
      },
      {
        "imgAuto": data.Posts.docs[0].content[4].value.url,
        "altAuto": data.Posts.docs[0].content[4].value.filename,
        "idAuto": data.Posts.docs[0].content[4].value.id
      },
    ]
  }];
  

  if(error){
    return(<p>Error al solicitar los datos del auto a reservar</p>)
  }
  // console.log( datosCarro[0].idpost)

return (
    <div className='relative w-full contenedorReserva grid grid-cols-1 sm:grid-cols-2 px-5 '>
      <div>
        <Carousel responsive={responsive} infinite={true} className='mt-5 rounded shadow-2xl border border-gray-800 z-0' >
        {datosCarro[0].imagenesCarro.map((imgAuto) => (
          <Image src={imgAuto.imgAuto} width={720} height={480} alt={imgAuto.altAuto} className='aspect-video shadow-2xl overflow-hidden' key={imgAuto.idAuto}/>
        ))}
        </Carousel>
      </div>
      <div className='text-white w-full '>
        <div className='w-full'>
        <h2 className='text-center text-2xl font-semibold py-3 underline underline-offset-4'>{datosCarro[0].modelo}</h2>
          <ul className='ulContenedorInfo p-4 mx-0 sm:mx-5 shadow-2xl rounded border border-gray-800'>
            {datosCarro.map((itemInfo)=>{
              return(
                <React.Fragment key={itemInfo.modelo}>
                  <li className='py-1 sm:py-3'>Precio: <span className='font-semibold'>{itemInfo.precio}</span></li>
                  <li className='py-1 sm:py-3'>Año del modelo: <span className='font-semibold'>{itemInfo.anio}</span></li>
                  <li className='py-1 sm:py-3'>Cantidad disponible: <span className='font-semibold'>{itemInfo.stock}</span></li>
                  <li className='py-1 sm:py-3'>Disponible: <span className='font-semibold'>{itemInfo.stock >0?"Sí":"No"}</span></li>
                </React.Fragment>
              )
            })}
          </ul>
        </div>
        <div className='w-full flex justify-center mt-0 sm:mt-5'>
          <button className='text-white hover:text-zinc-900 active:text-zinc-900 bg-zinc-900 hover:bg-slate-200 active:hover:bg-slate-200 font-semibold p-2 w-30 sm:px-10 my-3 text-center tracking-wide mx-0 sm:mx-5 border-2 border-gray-50 rounded transition ease-in-out duration-200' onClick={()=>{cambiarVisibilidadFormulario(!visibilidadFormulario)}}>Reservar compra</button>
        </div>
      </div>

      <ReservarFormulario  
        cambiarVisibilidadFormulario={cambiarVisibilidadFormulario} 
        visibilidadFormulario={visibilidadFormulario}
        datoAuto={datosCarro[0]}
        />
    </div>
  )
}
