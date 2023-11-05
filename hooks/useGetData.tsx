import { useState, useEffect } from 'react'

export default function useGetData() {
  const [objetivos, setObjetivos] = useState<any>([])
  const [entregas, setEntregas] = useState<any>([])
  const [horaActual, setHoraActual] = useState<any>(0)
  const [minActual, setMinActual] = useState<any>(0)

  const getEntregas = async () => {
    await fetch('http://localhost:80/api/entregas')
      .then(res => res.json())
      .then(data => {
        setEntregas(data)
      })
  }

  const getObjetivos = async () => {
    await fetch('http://localhost:80/api/objetivos')
      .then(res => res.json())
      .then(data => {
        setObjetivos(data)
      })
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
