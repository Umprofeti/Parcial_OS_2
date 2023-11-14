import { gql,useSuspenseQuery } from '@apollo/client';
import React from 'react'
import { useRouter } from 'next/navigation'
import { PDFDownloadLink } from '@react-pdf/renderer';
import DocumentoPDF from './DocumentoPDF';


function cargarCompra(id){
    const GET_SHOP = gql`
        query{
            Compra(id:"${id}"){
            id
            Name
            Email
            Car{
                id
                title
                ImagenCarro{
                    filename
                    url
                  }
                category{
                name
                }
                price
                Year
                content
            }
            status
            createdAt
            }
        }
    `;
    return GET_SHOP;
}



export default function ReciboCompra({visibilidadRecibo,cambiarVisibilidadRecibo, informacionRecibo}) {
    const router = useRouter()
    const { data, error } = useSuspenseQuery(cargarCompra(informacionRecibo));
    console.log(data.Compra)
    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Añade un cero al mes si es necesario
        const day = String(date.getDate()).padStart(2, '0'); // Añade un cero al día si es necesario
        return `${year}-${month}-${day}`;
      };
    //   console.log(informacionRecibo)
    const formateoDinero=(valor)=>{
      const opciones = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
      return new Intl.NumberFormat('en-US', opciones).format(valor);
    }
    const agregarImpuesto=()=>{

    }
  
    const precioFormateado = formateoDinero(data.Compra.Car.price);
    const precioImpuesto = (data.Compra.Car.price) +((data.Compra.Car.price)*0.07);
    const precioFormateadoImpuesto = formateoDinero(precioImpuesto);
    
    return (
    <div className={`w-full h-screen absolute z-30 fondoOscuro transition duration-500 top-0 left-0 ${visibilidadRecibo?'block':'hidden'}`}>
      <div className='w-4/5 h-auto bg-slate-100 block mx-auto mt-20 p-3'>
        <div className='border-b-2 border-black flex justify-between items-center py-1'>
            <h1 className='text-xl font-bold tracking-widest '>URBANRIDEZ</h1>
        </div>
        <div>
           <h2 className='font-semibold pb-3'>Recibo de compra</h2>
           <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <p>Nombre del comprador:</p>
            <p className='font-semibold pb-3'>{data.Compra.Name}</p>
            <p>Fecha de compra:</p>
            <p className='font-semibold pb-3'>{formatearFecha(data.Compra.createdAt)}</p>
            <p>Correo del comprador:</p>
            <p className='font-semibold pb-3'>{data.Compra.Email}</p>
            <p>Modelo del auto:</p>
            <p className='font-semibold pb-3'>{data.Compra.Car.title}</p>
            <p>Precio: </p>
            <p className='font-semibold pb-3'>{precioFormateado}</p>
            <p>Precio + 7%: </p>
            <p className='font-semibold pb-3'>{precioFormateadoImpuesto}</p>
            {/* <button className='p-2 bg-slate-400  rounded text-white font-bold tracking-wider border-zinc-700 border-2 hover:bg-slate-500 transition duration-200'>Descargar PDF</button> */}
            <PDFDownloadLink document={<DocumentoPDF 
                nombre={data.Compra.Name}
                fecha={formatearFecha(data.Compra.createdAt)}
                correo={data.Compra.Email}
                modelo={data.Compra.Car.title}
                precio={precioFormateado}
                precioImpuesto={precioFormateadoImpuesto}
            />} fileName="URBANRIDEZRecibo" className='p-2 bg-blue-700 text-center rounded text-white font-bold tracking-wider border-blue-900 border-2 hover:bg-blue-800 transition duration-200'>
                {({loading,error})=>(loading?<button>Cargando...</button>:<button>Descargar</button>)}
            </PDFDownloadLink>
            <button className='p-2 bg-green-700  rounded text-white font-bold tracking-wider border-green-900 border-2 hover:bg-green-800 transition duration-200' onClick={()=>{cambiarVisibilidadRecibo(!visibilidadRecibo); router.push('/')}}>Cerrar</button>
           </div>
        </div>
      </div>
    </div>
  )
}
