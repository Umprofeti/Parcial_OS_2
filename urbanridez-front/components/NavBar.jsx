'use client'
import React, {useState} from 'react'
import Link from 'next/link'

export default function NavBar() {
    const [abrirMenu, cambiarAbrirMenu] = useState(false);
  return (
    <nav className='flex navColor p-5 flex-wrap fixed w-full top-0 z-50'>
        <div className='text-white flex-1'>
            <Link className='uppercase font-bol text-xl tracking-tight text-red-500:hover' href={'/'}>Urbanridez</Link>
        </div>
        <div className="block lg:hidden">
            <button onClick={()=>{cambiarAbrirMenu(!abrirMenu)}} className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div id='menu' className={`w-full block lg:flex lg:items-center lg:w-auto ${abrirMenu ? 'opacity-100' : 'opacity-0 hidden'} sm:opacity-100`}>
            <div className="text-sm lg:flex-grow text-white text-center uppercase ">
                <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 hover:text-red-700 px-2 active:text-red-700">
                    Inicio
                </Link>
                <Link href="/catalogo" className="block mt-4 lg:inline-block lg:mt-0 hover:text-red-700 px-2 active:text-red-700">
                    Catalogo
                </Link>
                <Link href="/contacto" className="block mt-4 lg:inline-block lg:mt-0 hover:text-red-700 px-2 active:text-red-700">
                    Contacto
                </Link>
            </div>
        </div>
    </nav>
  )
}
