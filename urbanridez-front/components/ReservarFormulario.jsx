'use client'
import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import Image from 'next/image';

const ADD_SHOP = gql`
  mutation AddShop($Name: String!, $Email: String!, $Car: String!) {
    createCompra(data: {Name: $Name, Email: $Email, status: in_process, Car: $Car}, draft: true) {
      id
      Name
      Email
      status
      Car{
        id
        title
        ImagenCarro{
          id
          filename
          url
        }
      }
      createdAt
    }
  }
`;

const UPDATE_STOCK = gql`

  mutation UpdateStock($id: String! , $Stock:Float!){
    updatePost(id:$id, autosave:true, data:{Stock:$Stock},draft:true){
      Stock
    }
  }
`;






export default function ReservarFormulario({cambiarVisibilidadFormulario, visibilidadFormulario, datoAuto, cambiarControlRecibo, controlRecibo, cambiarInformacionRecibo, cambiarVisibilidadMensaje}) {
  
  
  
  const [nombreUsuario, cambiarNombreUsuario]= useState("");
  const [apellidoUsuario, cambiarApellidoUsuario]= useState("");
  const [correoUsuario, cambiarCorreoUsuario]= useState("");
  const idAutoEnviar = datoAuto.idpost;
  const [addShop, { data, loading, error }] = useMutation(ADD_SHOP);
  const [updateStock, { data:dataStock, loading:loadingStock, error:errorStock }] = useMutation(UPDATE_STOCK);

  useEffect(()=>{
    if(  data && dataStock){
      // alert("Se ha recibido la compra")
      // console.log(data)
      cambiarVisibilidadMensaje({"mostrar":true,"mensaje":"Se ha recibido la compra, generando recibo...", "error":false})
      cambiarVisibilidadFormulario(!visibilidadFormulario)
      cambiarNombreUsuario("");
      cambiarApellidoUsuario("");
      cambiarCorreoUsuario("");
      cambiarControlRecibo(!controlRecibo)
      cambiarInformacionRecibo(data.createCompra.id)
    }
  },[data, dataStock])


  const onChange =(e)=>{
    if(e.target.name === "nombreCliente"){
      cambiarNombreUsuario(e.target.value)
    }else if (e.target.name === "apellidoCliente"){
      cambiarApellidoUsuario(e.target.value)

    }else if(e.target.name === "correoCliente"){
      cambiarCorreoUsuario(e.target.value)
    }
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    let nombreCompleto = nombreUsuario+" "+apellidoUsuario
  
    try {
      await addShop({
        variables: {
          Name: nombreCompleto,
          Email: correoUsuario,
          Car: idAutoEnviar,
        },
      });  
      await updateStock({
        variables: {
          id: idAutoEnviar,
          Stock: datoAuto.stock - 1,
        },
      });
    } catch (error) {
      console.error("Error en la operación:", error);

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
  return (
    <div className={`absolute h-screen w-full contenedorFormulario top-0 z-10 ${visibilidadFormulario? 'block':'hidden'} px-4  sm:px-16 sm:fixed`}>
      <div className='w-full sm:w-4/5 bg-slate-100 mx-0  sm:mx-auto p-4 sm:p-10 rounded-xl '>
        <form onSubmit={handleSubmit}>
        <h2 className='text-center text-xl font-semibold'>Datos de la compra</h2>
          <div className='block sm:grid lg:grid-cols-2 gap-3'>
            <div className='w-full '>
              <div className='py-1 pr-10'>
                <label forhtml='nombreUsuarioR' className='block'>Nombre</label>
                <input type='text' placeholder='Ingrese su nombre' id='nombreUsuarioR' className='px-2 py-1 shadow-md rounded ring-2 ring-zinc-500 w-full ' required
                name='nombreCliente'
                value={nombreUsuario}
                onChange={onChange}/>
              </div>
              <div className='py-1 pr-10'>
                <label forhtml='apellidoUsuarioR' className='block'>Apellido</label>
                <input type='text' placeholder='Ingrese su apellido' id='apellidoUsuarioR' className='px-2 py-1 shadow-md rounded ring-2 ring-zinc-500 w-full '
                name='apellidoCliente'
                value={apellidoUsuario}
                onChange={onChange}
                required/>
              </div>
              <div className='py-1 pr-10'>
                <label forhtml='correoUsuarioR' className='block'>Correo electronico</label>
                <input type='text' placeholder='Ingrese su correo' id='correoUsuarioR' className='px-2 py-1 shadow-md rounded ring-2 ring-zinc-500 w-full ' required
                name='correoCliente'
                value={correoUsuario}
                onChange={onChange}/>
              </div>
              <div className='py-1 pr-10'>
                <label forhtml='correoUsuarioR' className='block'>Tarjeta de credito/debito</label>
                <div className='grid grid-cols-4 gap-3 '>
                  <input type='text'  className='px-2 py-1 shadow-md rounded ring-2 ring-zinc-500 '/>
                  <input type='text'  className='px-2 py-1 shadow-md rounded ring-2 ring-zinc-500 '/>
                  <input type='text'  className='px-2 py-1 shadow-md rounded ring-2 ring-zinc-500 '/>
                  <input type='text'  className='px-2 py-1 shadow-md rounded ring-2 ring-zinc-500 '/>
                </div>
              </div>
              <div className='py-1 pr-10'>
                <label forhtml='correoUsuarioR' className='block'>Nombre de la tarjeta de vrédito/debito</label>
                <input type='text' className='px-2 py-1 shadow-md rounded ring-2 ring-zinc-500 w-full '/>
              </div>
              <div className='py-1 pr-10'>
                <label forhtml='correoUsuarioR' className='block'>Fecha de vencimiento</label>
                <div className='flex justify-between'>
                  <div className='grid grid-cols-4 gap-3 '>
                    <input type='text'  className='px-2 py-1 shadow-md rounded ring-2 ring-zinc-500 '/>
                    <input type='text'  className='px-2 py-1 shadow-md rounded ring-2 ring-zinc-500 '/>
                  </div>
                  <div >
                    <input type='text'  className='px-2 py-1 shadow-md rounded ring-2 ring-zinc-500 w-full '/>
                  </div>
                </div>
              </div>

            </div>
            <div className=''>
              <div className=''>
                <h2 className='py-4'>Modelo del auto: <span className='font-semibold'>{datoAuto.modelo}</span></h2>
                <Image src={datoAuto.imgAuto} width={720} height={480} alt={datoAuto.altAuto} className='w-full ring-2 ring-zinc-500 aspect-video'/>
                <p className='mt-1'>Precio: <span className='font-semibold'>{formateoDinero(datoAuto.precio)}</span></p>
                <div className='w-full flex'>
                <button className='bg-red-600 text-white p-2 mt-2 rounded hover:bg-red-800 transition duration-200 text-sm md:text-lg' onClick={()=>{cambiarVisibilidadFormulario(!visibilidadFormulario)}} type='button'>Cancelar compra</button>
                <button className='bg-blue-600 text-white p-2 mt-2 rounded hover:bg-blue-800 transition duration-200 ml-3 text-sm md:text-lg' type='submit'
                >Completar compra</button> 
              </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


