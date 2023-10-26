'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, doc, setDoc } from 'firebase/firestore'
import { database } from '../../firebase'
import { v4 as uuidv4 } from 'uuid'

export default function Entregas() {
  // Obtener todos los objetivos
  const [objetivos, setObjetivos] = useState<any>([])
  const [entregas, setEntregas] = useState<any>([])

  useEffect(() => {
    const getEntregas = async () => {
      const q = query(collection(database, 'entregas'))
      const querySnapshot = await getDocs(q)
      const tempEntregas: any = []
      querySnapshot.forEach((doc: any) => {
        tempEntregas.push(doc.data())
      })
      setEntregas(tempEntregas)
    }
    getEntregas()
    const getObjetivos = async () => {
      const q = query(collection(database, 'objetivos'))
      const querySnapshot = await getDocs(q)
      const tempObjetivos: any = []
      querySnapshot.forEach((doc: any) => {
        tempObjetivos.push(doc.data())
      })
      setObjetivos(tempObjetivos)
    }
    getObjetivos()
  }, [])

  const sumarEntregas = (modelo: string, pieza: string, id: any) => {
    let sum = 0
    entregas.forEach((entrega: any) => {
      if (
        entrega.modelo === modelo &&
        entrega.pieza === pieza &&
        entrega.id_objetivo === id
      ) {
        sum += parseInt(entrega.cantidad_entrega)
      }
    })
    return sum
  }

  // Manejar las entregas correspondientes a cada objetivo
  const handleEntrega = async (
    e: any,
    modelo: any,
    pieza: any,
    id_objetivo: any
  ) => {
    e.preventDefault()

    const date = new Date()

    const mins = date.getMinutes()
    const hs = date.getHours()

    const entrega = {
      cantidad_entrega: e.target.cantidad_entrega.value,
      pieza,
      sector: 'soldadura',
      modelo,
      hora: hs,
      minuto: mins,
      id: uuidv4(),
      id_objetivo,
    }

    const docRef = doc(database, 'entregas', entrega.id)
    await setDoc(docRef, entrega)
    setEntregas([...entregas, entrega])
  }

  return (
    <div>
      {objetivos &&
        objetivos.map((objetivo: any) => {
          const entregas = sumarEntregas(
            objetivo.modelo,
            objetivo.pieza,
            objetivo.id
          )
          const progreso = (entregas / objetivo.cantidad_objetivo) * 100
          return (
            <form
              onSubmit={e =>
                handleEntrega(e, objetivo.modelo, objetivo.pieza, objetivo.id)
              }
              key={objetivo.id}
              className='px-8 py-4 my-4 bg-base-200'>
              <div className='flex items-center justify-center gap-6'>
                <div className='flex-1 text-center'>
                  <p className='uppercase text-secondary'>{objetivo.modelo}</p>
                  <p className='uppercase'>{objetivo.pieza}</p>
                  <input
                    type='number'
                    name='cantidad_entrega'
                    defaultValue={objetivo.cantidad_entrega}
                    className='input input-bordered input-primary w-full max-w-xs text-center'
                  />
                </div>
                <button type='submit' className='btn btn-primary flex-1'>
                  Enviar
                </button>
              </div>
              <progress
                className='progress progress-success w-full mt-4'
                value={progreso}
                max='100'></progress>
              <p className='text-center text-sm'>
                {entregas} / {objetivo.cantidad_objetivo}
              </p>
            </form>
          )
        })}
    </div>
  )
}
