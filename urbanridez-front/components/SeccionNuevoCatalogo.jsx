'use client'
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'
import AutosCards from './AutosCards'



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

const query = gql`
query{
  Posts(where:{tags:{equals:"654af4358988a779d5fc5424"}}, limit:100){
    docs{
      id
      title
      price
      content
      Year
			tags{
        id
        name
      }
      category{
        id
        name
      }
      ImagenCarro{
        url
        width
        height
        filename
        sizes{
          card{
            width
            height
          }
          tablet{
            width
            height
          }
        }
      }
    }
  }
}
`;

export default function SeccioNuevoCatalogo() {
  const { data,error } = useSuspenseQuery(query);
  if(error){ return(<p>Error</p>)}

  return (
    <div className='mx-auto h-auto w-full bg-red-700 text-white text-center pt-5 pb-10'>
        <h2 className='text-2xl py-2 font-bold'>Nuevos catalogos</h2>
        <span>El mejor catalogo de autos en Panamá</span>


          <Carousel infinite={true} responsive={responsive} className='z-10'>
              {(data.Posts.docs).map((post)=>{    
                return(
                  <AutosCards key={post.id} post={post} catalogo={false}/>
                );
              })}
          </Carousel>
    </div>
  )
}
