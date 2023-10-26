'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { database } from '../../firebase'

export default function Seguimiento() {
  const [objetivos, setObjetivos] = useState<any>([])
  const [entregas, setEntregas] = useState<any>([])
  const [horaActual, setHoraActual] = useState<any>(0)
  const [minActual, setMinActual] = useState<any>(0)

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

    const fecha = new Date()
    setHoraActual(fecha.getHours())
    setMinActual(fecha.getMinutes())
  }, [])

  const sumarEntregas = (modelo: string, pieza: string, id: any) => {
    let sum = 0
    let hora_ultima_entrega = '00:00'
    let hora = 0
    entregas.forEach((entrega: any) => {
      if (
        entrega.modelo === modelo &&
        entrega.pieza === pieza &&
        entrega.id_objetivo === id
      ) {
        sum += parseInt(entrega.cantidad_entrega)
      }
      if (hora < entrega.hora) {
        hora = entrega.hora
        hora_ultima_entrega = convertirAHorasYMinutos(
          entrega.hora + entrega.minuto / 60
        )
      }
    })
    return { suma: sum, ultima_entrega: hora_ultima_entrega }
  }

  function convertirAHorasYMinutos(decimal: any) {
    const horas = Math.floor(decimal)
    const minutos = Math.round((decimal - horas) * 60)
    return `${horas}:${minutos.toString().padStart(2, '0')}`
  }

  return (
    <div>
      {objetivos.map((objetivo: any) => {
        let semaforo = 'verde'
        const entregas = sumarEntregas(
          objetivo.modelo,
          objetivo.pieza,
          objetivo.id
        )
        const piezas_hora =
          objetivo.cantidad_objetivo /
          (parseInt(objetivo.hora_fin) +
            parseInt(objetivo.min_fin) / 60 -
            parseInt(objetivo.hora_inicio) -
            parseInt(objetivo.min_inicio) / 60)
        const tiempo_transcurrido =
          horaActual +
          minActual / 60 -
          objetivo.hora_inicio -
          objetivo.min_inicio / 60
        const tiempo_por_entrega = objetivo.cantidad_entrega / piezas_hora
        const entregas_objetivo = tiempo_transcurrido / tiempo_por_entrega
        const entregas_realizadas = entregas.suma / objetivo.cantidad_entrega

        if (entregas_objetivo - 0.25 < entregas_realizadas + 1) {
          semaforo = 'verde'
        } else if (
          entregas_objetivo - 0.25 > entregas_realizadas + 1 &&
          entregas_objetivo < entregas_realizadas
        ) {
          semaforo = 'amarillo'
        } else {
          semaforo = 'rojo'
        }

        const estimado_proxima_entrega = convertirAHorasYMinutos(
          Math.ceil(entregas_objetivo) * tiempo_por_entrega +
            parseInt(objetivo.hora_inicio) +
            parseInt(objetivo.min_inicio) / 60
        )

        const hora_inicio = `${objetivo.hora_inicio
          .toString()
          .padStart(2, '0')}:${objetivo.min_inicio.toString().padStart(2, '0')}`

        return (
          <div key={objetivo.id}>
            <h1>{objetivo.modelo}</h1>
            <p>{objetivo.pieza}</p>
            <p>{objetivo.cantidad}</p>
            <p>{entregas.suma}</p>
            <p>semaforo: {semaforo}</p>
            <p>piezas por hora: {piezas_hora.toFixed(2)}</p>
            <p>hora de inicio: {hora_inicio}</p>
            <p>
              tiempo transcurrido:{' '}
              {convertirAHorasYMinutos(tiempo_transcurrido)}
            </p>
            <p>estimado para proxima entrega: {estimado_proxima_entrega}</p>
            <p>ultima entrega: {entregas.ultima_entrega}</p>
          </div>
        )
      })}
    </div>
  )
}
