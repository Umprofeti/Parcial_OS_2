'use client'
import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import Image from 'next/image';

const ADD_SHOP = gql`
  mutation AddShop($Name: String!, $Email: String!, $Car: String!) {
    createCompra(data: {Name: $Name, Email: $Email, Car: $Car, status: in_process}) {
      id
      Name
      Email
      Car {
        id
        title
      }
      status
    }
  }
`;

const LOGIN_USERS = gql`
  mutation{
    loginUser(email: "ericsoto2104@gmail.com", password: "cy6rlyr3vr"){
      user{
        name
      }
    }
  }
`;


export default function ReservarFormulario({cambiarVisibilidadFormulario, visibilidadFormulario, disponibilidad, datoAuto}) {
  
  
  // useEffect(async()=>{
  //   await fetch('http://localhost:3040/api/users', {
  //     headers:{
  //       Authorization: 'Users API-Key 03068e56-cf08-4ae8-87d2-efb7953ff3e7'
  //     }
  //   })
  // },[])

  
  const [nombreUsuario, cambiarNombreUsuario]= useState("");
  const [apellidoUsuario, cambiarApellidoUsuario]= useState("");
  const [correoUsuario, cambiarCorreoUsuario]= useState("");
  const idAutoEnviar = datoAuto.idpost;
  const status = "in_process";
  const [loginUsers, { data: dataUsuario, loading:loadingUsuario, error:errorUsuario }] = useMutation(LOGIN_USERS);
  const [addShop, { data, loading, error }] = useMutation(ADD_SHOP);
  
  console.log(dataUsuario)

  // console.log(datoAuto.idpost)

  const onChange =(e)=>{
    if(e.target.name === "nombreCliente"){
      cambiarNombreUsuario(e.target.value)
    }else if (e.target.name === "apellidoCliente"){
      cambiarApellidoUsuario(e.target.value)

    }else if(e.target.name === "correoCliente"){
      cambiarCorreoUsuario(e.target.value)
    }
  }

  const handleSubmit = (e)=>{
    console.log("a")
    e.preventDefault();
    let nombreCompleto = nombreUsuario+" "+apellidoUsuario
    loginUsers()
    addShop({variables:{
      Name: nombreCompleto,
      Email: correoUsuario,
      Car: idAutoEnviar
    }})
    
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
    <div className={`absolute h-screen w-full contenedorFormulario top-0 z-10 px-2 ${visibilidadFormulario? 'block':'hidden'} sm:px-16`}>
      <div className='w-4/5 bg-slate-100 mx-auto p-10 rounded-xl shadow-lg'>
        <form onSubmit={handleSubmit}>
        <h2 className='text-center text-xl font-semibold'>Datos de la compra</h2>
          <div className='grid grid-cols-2 gap-3'>
            <div className='w-full'>
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
            <div>
              <div className=''>
                <h2 className='py-4'>Modelo del auto: <span className='font-semibold'>{datoAuto.modelo}</span></h2>
                <Image src={datoAuto.imagenesCarro[0].imgAuto} width={720} height={480} alt={datoAuto.imagenesCarro[0].altAuto} className='w-full ring-2 ring-zinc-500 aspect-video'/>
                <p className='mt-1'>Precio: <span className='font-semibold'>{formateoDinero(datoAuto.precio)}</span></p>
                <div className='w-full flex'>
                <button className='bg-red-600 text-white p-2 mt-2 rounded hover:bg-red-800 transition duration-200' onClick={()=>{cambiarVisibilidadFormulario(!visibilidadFormulario)}} type='button'>Cancelar compra</button>
                <button className='bg-blue-600 text-white p-2 mt-2 rounded hover:bg-blue-800 transition duration-200 ml-3' type='submit'>Completar compra</button>
              </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}


