'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import Image from 'next/image'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReservarFormulario from '@/components/ReservarFormulario'
import ReciboCompra from '@/components/ReciboCompra'

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
        Carrusel{
          id
          url
					filename
        }
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


export default function ReservarPage() {  
  const {id} = useParams()
  const { data, error } = useSuspenseQuery(cargarItemCarro(id));
  const [visibilidadFormulario, cambiarVisibilidadFormulario] = useState(false);
  const [visibilidadRecibo, cambiarVisibilidadRecibo] = useState(false);
  const [controlRecibo, cambiarControlRecibo] = useState(false);
  const [informacionRecibo, cambiarInformacionRecibo] = useState("")


  const datosCarro = [{
    "idpost":data.Posts.docs[0].id,
    "modelo": data.Posts.docs[0].title,
    "precio": data.Posts.docs[0].price,
    "anio": data.Posts.docs[0].Year,
    "stock": data.Posts.docs[0].Stock,
    "imgAuto": data.Posts.docs[0].ImagenCarro.url,
    "altAuto": data.Posts.docs[0].ImagenCarro.filename,
    "idAuto": data.Posts.docs[0].ImagenCarro.id
  }];
  
  useEffect(() => {
    if (controlRecibo) {
      // Esperar 3 segundos antes de llamar a iniciarServicioRecibo
      const pausaCarga = setTimeout(() => {
        iniciarServicioRecibo();
        console.log("aaaa: "+informacionRecibo)
      }, 3000);
  
      // Limpiar el temporizador si controlRecibo cambia antes de que se cumplan los 3 segundos
      return () => clearTimeout(pausaCarga);
    }
  }, [controlRecibo]);

  const iniciarServicioRecibo=()=>{
    cambiarVisibilidadRecibo(!visibilidadRecibo)
  }

  const llamadaFormulario=()=>{
    if(datosCarro[0].stock>0){
      cambiarVisibilidadFormulario(!visibilidadFormulario)
    }else{
      alert("No existe más autos disponibles, por favor mantengase atento a nuestras redes sociales")
    }
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
  const precioFormateado = formateoDinero(datosCarro[0].precio);
return (
    <div className='relative w-full contenedorReserva grid grid-cols-1 sm:grid-cols-2 px-5 '>
      <div>
        <Carousel responsive={responsive} infinite={true} className='mt-5 rounded shadow-2xl border border-gray-800 z-0' >
        {data.Posts.docs.map((post) => {
          return post.Carrusel.map((imagen, index) => (
            <div key={index}>
              <Image
                src={imagen.url}
                width={720}
                height={480}
                alt={imagen.filename}
                className='aspect-video shadow-2xl overflow-hidden'
              />
            </div>
          ));

      })}
      </Carousel>
      </div>
      <div className='text-white w-full '>
        <div className='w-full'>
        <h2 className='text-center text-2xl font-semibold py-3 underline underline-offset-4'>{datosCarro[0].modelo}</h2>
          <ul className='ulContenedorInfo p-4 mx-0 sm:mx-5 shadow-2xl rounded border border-gray-800'>
            {datosCarro.map((itemInfo)=>{
              return(
                <React.Fragment key={itemInfo.modelo}>
                  <li className='py-1 sm:py-3'>Precio: <span className='font-semibold'>{precioFormateado}</span></li>
                  <li className='py-1 sm:py-3'>Año del modelo: <span className='font-semibold'>{itemInfo.anio}</span></li>
                  <li className='py-1 sm:py-3'>Cantidad disponible: <span className='font-semibold'>{itemInfo.stock}</span></li>
                  <li className='py-1 sm:py-3'>Disponible: <span className='font-semibold'>{itemInfo.stock >0?"Sí":"No"}</span></li>
                </React.Fragment>
              )
            })}
          </ul>
        </div>
        <div className='w-full flex justify-center mt-0 sm:mt-5'>
          <button className='text-white hover:text-zinc-900 active:text-zinc-900 bg-zinc-900 hover:bg-slate-200 active:hover:bg-slate-200 font-semibold p-2 w-30 sm:px-10 my-3 text-center tracking-wide mx-0 sm:mx-5 border-2 border-gray-50 rounded transition ease-in-out duration-200' onClick={()=>{llamadaFormulario()}} type='button'>Reservar compra</button>
        </div>
      </div>

      <ReservarFormulario  
        cambiarVisibilidadFormulario={cambiarVisibilidadFormulario} 
        visibilidadFormulario={visibilidadFormulario}
        datoAuto={datosCarro[0]} 
        cambiarControlRecibo={cambiarControlRecibo}
        controlRecibo={controlRecibo}
        cambiarInformacionRecibo={cambiarInformacionRecibo}
         />
        {visibilidadRecibo?<ReciboCompra 
      visibilidadRecibo={visibilidadRecibo} 
      cambiarVisibilidadRecibo={cambiarVisibilidadRecibo}
      informacionRecibo={informacionRecibo}/>:""}
    </div>
  )
}
