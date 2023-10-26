'use client'

import { useSession } from 'next-auth/react'

import Link from 'next/link'

export default function Home() {
  const { data: session } = useSession()
  return (
    <main className='px-12 py-6'>
      <h1 className='text-2xl text-center mb-6'>Control de producción</h1>
      {session ? (
        <div className='flex flex-col align-middle space-y-4'>
          <Link href={'/objetivos'} className='btn'>
            Objetivos
          </Link>
          <Link href={'/entregas'} className='btn'>
            Entregas
          </Link>
          <Link href={'/seguimiento'} className='btn'>
            Seguimiento
          </Link>
        </div>
      ) : (
        <p className='text-center'>Iniciar sesion para acceder al contenido</p>
      )}
    </main>
  )
}
