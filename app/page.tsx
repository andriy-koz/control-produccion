import FirebaseTest from '../components/FirebaseTest';
import {DocumentData, collection, getDocs} from 'firebase/firestore';
import {database, app} from '../firebase';
import Link from 'next/link';

export default async function Home() {
  
  // const dbInstance = collection(database, 'objetivos');
  // const querySnapshot = await getDocs(dbInstance);  
  // const myArray: DocumentData[] = []
  // querySnapshot.forEach(doc => myArray.push(doc.data()));

  return (
    <main className="flex flex-col align-middle px-12 py-6 space-y-4">
      <h1 className='text-2xl text-center mb-2'>Control de producción</h1>
      <button className='btn'><Link href={'/objetivos'}>Objetivos</Link></button>
      <button className='btn'>Entregas</button>
      <button className='btn'>Resumen</button>
    </main>
  )
}
