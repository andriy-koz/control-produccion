'use client'

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import {
  doc,
  setDoc,
  collection,
  query,
  getDocs,
  deleteDoc,
} from 'firebase/firestore'
import { database } from '@/firebase'

const modelos = ['a4', 'a5', 'a6']
const piezas = ['fondo-canos', 'tapa-funda', 'terminado']

export default function Objetivos() {
  const [modelo, setModelo] = useState('a4')
  const [pieza, setPieza] = useState('fondo-canos')
  const [cantObj, setCantObj] = useState(0)
  const [cantEntrega, setCantEntrega] = useState(0)
  const [hsInicio, setHsInicio] = useState(0)
  const [minInicio, setMinInicio] = useState(0)
  const [hsFin, setHsFin] = useState(0)
  const [minFin, setMinFin] = useState(0)
  const [objetivos, setObjetivos] = useState<any>([])
  const [objetivosLoading, setObjetivosLoading] = useState<boolean>(false)

  useEffect(() => {
    const getObjetivos = async () => {
      const q = query(collection(database, 'objetivos'))
      const querySnapshot = await getDocs(q)
      const objetivos: any = []
      querySnapshot.forEach((doc: any) => {
        objetivos.push(doc.data())
      })
      setObjetivos(objetivos)
    }
    getObjetivos()
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const fecha = new Date()
    const dia = fecha.getDay()
    const mes = fecha.getMonth()

    const docData = {
      id: uuidv4(),
      cantidad_entrega: cantEntrega,
      cantidad_objetivo: cantObj,
      hora_fin: hsFin,
      hora_inicio: hsInicio,
      min_fin: minFin,
      min_inicio: minInicio,
      modelo: modelo,
      pieza: pieza,
      sector: 'soldadura',
      dia,
      mes,
    }

    await setDoc(doc(database, 'objetivos', docData.id), docData)

    setObjetivos([...objetivos, docData])

    setModelo('a4')
    setPieza('fondo-canos')
    setCantObj(0)
    setCantEntrega(0)
    setHsInicio(0)
    setHsFin(0)
    setMinInicio(0)
    setMinFin(0)
    setObjetivosLoading(false)
  }

  const piezaNombre = (pieza: string): string => {
    return pieza === 'fondo-canos'
      ? 'Fondo-Caños'
      : pieza === 'tapa-funda'
      ? 'Tapa-Funda'
      : pieza === 'terminado'
      ? 'Terminado'
      : ''
  }

  const handleDelete = (id: string) => async () => {
    await deleteDoc(doc(database, 'objetivos', id))
    setObjetivos(objetivos.filter((objetivo: any) => objetivo.id !== id))
  }

  return (
    <main>
      <div className='overflow-x-auto'>
        <table className='table px-12'>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Pieza</th>
              <th>Objetivo</th>
            </tr>
          </thead>
          <tbody>
            {objetivos &&
              objetivos.map((objetivo: any, i: number) => (
                <tr key={i}>
                  <td>{objetivo.modelo.toUpperCase()}</td>
                  <td>{piezaNombre(objetivo.pieza)}</td>
                  <td>{objetivo.cantidad_objetivo}</td>
                  <td>
                    <button
                      className='btn btn-secondary btn-outline'
                      onClick={handleDelete(objetivo.id)}>
                      borrar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <form
        className='px-12 py-12 bg-base-200 rounded-3xl shadow-md m-12 space-y-6 text-center'
        onSubmit={e => {
          handleSubmit(e)
          setObjetivosLoading(true)
        }}>
        <h2 className='text-center text-xl'>Agregar objetivo</h2>

        <div className='py-2'>
          <label htmlFor='sector' className='block'>
            Sector
          </label>
          <input
            className='w-full max-w-xs'
            type='text'
            name='sector'
            id='sector'
            value='soldadura'
            disabled
          />
        </div>

        <div>
          <h3>Modelo</h3>
          <select
            value={modelo}
            name='modelo'
            id='modelo'
            className='select select-primary w-full max-w-xs'
            onChange={(e: any) => setModelo(e.target.value)}>
            {modelos.map((modelo, i) => (
              <option key={i} value={modelo}>
                {modelo.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3>Pieza</h3>
          <select
            value={pieza}
            name='pieza'
            id='pieza'
            className='select select-primary w-full max-w-xs'
            placeholder='pieza'
            onChange={(e: any) => setPieza(e.target.value)}>
            {piezas.map((pieza, i) => (
              <option key={i} value={pieza}>
                {piezaNombre(pieza)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3>Cantidad objetivo (total dia)</h3>
          <input
            value={cantObj}
            type='number'
            name='cantidad-objetivo'
            id='cantidad-objetivo'
            min={1}
            max={300}
            onChange={(e: any) => setCantObj(parseInt(e.target.value))}
            className='input input-bordered input-primary w-full max-w-xs'
          />
        </div>

        <div>
          <h3>Cantidad por canasto</h3>
          <input
            value={cantEntrega}
            type='number'
            name='cantidad-entrega'
            id='cantidad-entrega'
            min={1}
            max={25}
            onChange={(e: any) => setCantEntrega(parseInt(e.target.value))}
            className='input input-bordered input-primary w-full max-w-xs'
          />
        </div>

        <div>
          <h3>Hora de inicio</h3>
          <div className='flex justify-center'>
            <input
              type='number'
              name='hora-inicio'
              id='hora-inicio'
              min={0}
              max={24}
              placeholder='hs'
              className='input input-bordered input-primary w-full max-w-xs'
              onChange={(e: any) => setHsInicio(parseInt(e.target.value))}
              value={hsInicio}
            />
            <span className='px-2 flex items-center'>:</span>
            <input
              type='number'
              name='min-inicio'
              id='min-inicio'
              min={0}
              max={59}
              placeholder='mins'
              className='input input-bordered input-primary w-full max-w-xs'
              onChange={(e: any) => setMinInicio(parseInt(e.target.value))}
              value={minInicio}
            />
          </div>
        </div>

        <div>
          <h3>Hora de finalización</h3>
          <div className='flex justify-center'>
            <input
              type='number'
              name='hora-fin'
              id='hora-fin'
              min={0}
              max={48}
              placeholder='hs'
              className='input input-bordered input-primary w-full max-w-xs'
              onChange={(e: any) => setHsFin(parseInt(e.target.value))}
              value={hsFin}
            />
            <span className='px-2 flex items-center'>:</span>
            <input
              type='number'
              name='min-fin'
              id='min-fin'
              min={0}
              max={59}
              placeholder='mins'
              className='input input-bordered input-primary w-full max-w-xs'
              onChange={(e: any) => setMinFin(parseInt(e.target.value))}
              value={minFin}
            />
          </div>
        </div>

        <button type='submit' className='btn btn-primary mx-auto block'>
          {objetivosLoading ? (
            <span className='loading loading-spinner loading-md'></span>
          ) : (
            'Guardar'
          )}
        </button>
      </form>
    </main>
  )
}
