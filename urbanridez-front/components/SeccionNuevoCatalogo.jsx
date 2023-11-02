'use client'
import React from 'react'
import imagen from '../src/img/mustang01.jpg'
import imagen2 from '../src/img/hyndai01.jpg'
import imagen3 from '../src/img/berat-baki.jpg'
import NuevoCatalogo from './NuevoCatalogo';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function SeccioNuevoCatalogo() {

  const titulo = "BMW M4 competition 2023";
  const precio = "105,345";


  return (
    <div className='mx-auto h-auto w-full bg-red-700 text-white text-center py-5'>
        <h2 className='text-2xl py-2 font-bold'>Nuevos catalogos</h2>
        <span>El mejor catalogo de autos en Panamá</span>
        <Carousel responsive={responsive}>
          {/* Aquí se usará map para retornar el componente "<NuevoCatalogo/>" */}
          <NuevoCatalogo imagen={imagen} titulo={titulo} precio={precio}/>
          <NuevoCatalogo imagen={imagen2} titulo={titulo} precio={precio}/>
          <NuevoCatalogo imagen={imagen3} titulo={titulo} precio={precio}/>
          <NuevoCatalogo imagen={imagen} titulo={titulo} precio={precio}/>
          <NuevoCatalogo imagen={imagen2} titulo={titulo} precio={precio}/>
          <NuevoCatalogo imagen={imagen3} titulo={titulo} precio={precio}/>
        </Carousel>
    </div>
  )
}
