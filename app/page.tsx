import Link from 'next/link';

export default async function Home() {
  return (
    <main className="flex flex-col align-middle px-12 py-6 space-y-4">
      <h1 className='text-2xl text-center mb-2'>Control de producción</h1>
      <button className='btn'><Link href={'/objetivos'}>Objetivos</Link></button>
      <button className='btn'>Entregas</button>
      <button className='btn'>Resumen</button>
    </main>
  )
}
