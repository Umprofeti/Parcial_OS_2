'use client'
import BannerPresentacion from '@/components/BannerPresentacion'
import NuevoCatalogo from '@/components/SeccionNuevoCatalogo'
import React from 'react'

export default function HomePage() {
  return (
      <div className='mx-auto'>
        <BannerPresentacion/>
        <NuevoCatalogo/>
      </div>
  )
}
