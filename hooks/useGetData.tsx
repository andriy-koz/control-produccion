import { useState, useEffect } from 'react'
import { query, collection, getDocs } from 'firebase/firestore'
import { database } from '../firebase'

export default function useGetData() {
  const [objetivos, setObjetivos] = useState<any>([])
  const [entregas, setEntregas] = useState<any>([])
  const [horaActual, setHoraActual] = useState<any>(0)
  const [minActual, setMinActual] = useState<any>(0)

  const getEntregas = async () => {
    const q = query(collection(database, 'entregas'))
    const querySnapshot = await getDocs(q)
    const tempEntregas: any = []
    querySnapshot.forEach((doc: any) => {
      tempEntregas.push(doc.data())
    })
    setEntregas(tempEntregas)
  }

  const getObjetivos = async () => {
    const q = query(collection(database, 'objetivos'))
    const querySnapshot = await getDocs(q)
    const tempObjetivos: any = []
    querySnapshot.forEach((doc: any) => {
      tempObjetivos.push(doc.data())
    })
    setObjetivos(tempObjetivos)
  }

  // Llama a las funciones de fetch en el useEffect para la carga inicial
  useEffect(() => {
    getEntregas()
    getObjetivos()

    const fecha = new Date()
    setHoraActual(fecha.getHours())
    setMinActual(fecha.getMinutes())
  }, [])

  const refetch = () => {
    getEntregas()
    getObjetivos()
  }

  return [entregas, objetivos, horaActual, minActual, refetch]
}
