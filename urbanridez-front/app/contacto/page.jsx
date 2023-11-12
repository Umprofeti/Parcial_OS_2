import React from 'react'

export default function ContactoPage() {
  return (
    <div className='pt-16 bg-zinc-900  w-full px-28 py-6'>
      <h2 className='text-center pt-5 text-xl pb-5 text-white'>Hazno saber tus inquietudes o preguntas aquí</h2>
      <div className='text-white py-3 bg-red-700 px-10'>
        <form>
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label forhtml='nombreUsuario' className='block'>Nombre</label>
              <input type='text' placeholder='Ingrese su nombre' id='nombreUsuario' name='nombreUsuario' className='w-full rounded px-2 py-1 text-gray-900 mb-5'/>
            </div>
            <div>
              <label forhtml='apellidoUsuario' className='block '>Apellido</label>
              <input type='text' placeholder='Ingrese su apellido' id='apellidoUsuario' className='w-full rounded px-2 py-1 text-gray-900 mb-5 '/>
            </div>
          </div>
          <div>
            <label forhtml='correoUsuario' className='block'>Correo electronico</label>
            <input type='text' placeholder='Ingrese su correo' id='correoUsuario' className='w-full rounded px-2 py-1 text-gray-900 mb-5 '/>
          </div>
          <div>
            <label forhtml='asuntoUsuario' className='block'>Asunto</label>
            <textarea type='text' id='asuntoUsuario' className='text-gray-900 w-full rounded' placeholder='Mensaje que nos quiere hacer llegar '/>
          </div>
          <button type='submit' className=' text-black hover:text-white py-2 px-6 bg-slate-200 my-2 hover:bg-zinc-900 transition duration-200 rounded focus:ring-blue-800'>Enviar</button>
        </form>
      </div>
    </div>
  )
}
