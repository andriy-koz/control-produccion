import Link from 'next/link'

export default async function Home() {
  return (
    <main className='flex flex-col align-middle px-12 py-6 space-y-4'>
      <h1 className='text-2xl text-center mb-2'>Control de producción</h1>
      <Link href={'/objetivos'} className='btn'>
        Objetivos
      </Link>
      <Link href={'/entregas'} className='btn'>
        Entregas
      </Link>
      <Link href={'/seguimiento'} className='btn'>
        Seguimiento
      </Link>
    </main>
  )
}
