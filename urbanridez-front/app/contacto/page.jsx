'use client'
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';


const ADD_CONTACT = gql`
  mutation AddContact($email: String!, $nombre: String!, $apellido: String!, $asunto: String! ){
    createContacto(data:{email:$email, nombre:$nombre, apellido:$apellido,asunto:$asunto}, draft:true){
      email
      nombre
      apellido
      asunto
    }
  }
`;

export default function ContactoPage() {
  const [nombreContacto, cambiarNombreContacto] = useState("");
  const [apellidoContacto, cambiarApellidoContacto] = useState("");
  const [correoContacto, cambiarCorreoContacto] = useState("");
  const [asuntoContacto, cambiarAsuntoContacto] = useState("");

  const [addContact, { data, loading, error }] = useMutation(ADD_CONTACT);

  const onChange =(e)=>{
    if(e.target.name === "nombreUsuario"){
      cambiarNombreContacto(e.target.value)
    }else if (e.target.name === "apellidoUsuario"){
      cambiarApellidoContacto(e.target.value)

    }else if(e.target.name === "correoUsuario"){
      cambiarCorreoContacto(e.target.value)
    }else if(e.target.name === "asuntoUsuario"){
      cambiarAsuntoContacto(e.target.value)
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault();

    addContact({variables:{
      email: correoContacto,
      nombre: nombreContacto,
      apellido: apellidoContacto,
      asunto: asuntoContacto
    }})
    if(loading){
      alert("Enviando")
    }
  }

  return (
    <div className='pt-28 sm:pt-20 fondoDragado w-full px-4 sm:px-28 h-auto pb-20'>
      <h2 className='text-center pt-0 sm:pt-5 text-xl pb-5 text-white'>Hazno saber tus inquietudes o preguntas aquí</h2>
      <div className='text-white pt-3 pb-6 bg-zinc-800 px-3 sm:px-10 rounded'> 
      <h2 className='text-center text-2xl font-semibold py-5'>URBANRIDEZ - Sistema de contacto</h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <div>
              <label forhtml='nombreUsuario' className='block'>Nombre</label>
              <input type='text' placeholder='Ingrese su nombre' id='nombreUsuario' name='nombreUsuario' className='w-full rounded px-2 py-1 text-gray-900 mb-5'
                value={nombreContacto}
                onChange={onChange}/>
            </div>
            <div>
              <label forhtml='apellidoUsuario' className='block '>Apellido</label>
              <input type='text' placeholder='Ingrese su apellido' id='apellidoUsuario' name='apellidoUsuario' className='w-full rounded px-2 py-1 text-gray-900 mb-5' value={apellidoContacto}
              onChange={onChange}/>
            </div>
          </div>
          <div>
            <label forhtml='correoUsuario' className='block'>Correo electronico</label>
            <input type='text' placeholder='Ingrese su correo' id='correoUsuario' name='correoUsuario' className='w-full rounded px-2 py-1 text-gray-900 mb-5 ' 
            value={correoContacto}
            onChange={onChange}/>
          </div>
          <div>
            <label forhtml='asuntoUsuario' className='block'>Asunto</label>
            <textarea type='text' id='asuntoUsuario' className='text-gray-900 w-full rounded' name='asuntoUsuario' placeholder='Mensaje que nos quiere hacer llegar ' value={asuntoContacto}
              onChange={onChange}/>
          </div>
          <button type='submit' className=' text-black hover:text-white py-2 px-6 bg-slate-200 my-2 hover:bg-zinc-900 transition duration-200 rounded focus:ring-blue-800'>Enviar</button>
        </form>
      </div>
    </div>
  )
}
