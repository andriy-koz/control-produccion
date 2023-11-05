'use client'

import useGetData from '@/hooks/useGetData'
import { sumarEntregas } from '@/utlis/sumarEntregas'

export default function Entregas() {
  const [entregas, objetivos, horaActual, minActual, refetch] = useGetData()

  const datosParaRenderizar = objetivos.map((objetivo: any) => {
    const { total_entregas } = sumarEntregas(
      entregas,
      objetivo.modelo,
      objetivo.pieza,
      objetivo.objetivoId
    )
    const progreso = (total_entregas / objetivo.cantidadObjetivo) * 100
    return {
      ...objetivo,
      total_entregas,
      progreso,
    }
  })

  const handleEntrega = async (
    e: any,
    modelo: any,
    pieza: any,
    objetivoId: any
  ) => {
    e.preventDefault()

    const date = new Date()

    const mins = date.getMinutes()
    const hs = date.getHours()

    const entrega = {
      cantidadEntrega: parseInt(e.target.cantidad_entrega.value),
      pieza,
      sector: 'soldadura',
      modelo,
      hora: hs,
      minuto: mins,
      entregaId: 0,
      objetivoId,
    }

    await fetch(process.env.NEXT_PUBLIC_API_URL + '/entregas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entrega),
    })

    refetch()
  }

  return (
    <div>
      {objetivos &&
        datosParaRenderizar.map((objetivo: any) => {
          return (
            <form
              onSubmit={e => {
                handleEntrega(
                  e,
                  objetivo.modelo,
                  objetivo.pieza,
                  objetivo.objetivoId
                )
              }}
              key={objetivo.objetivoId}
              className='px-8 py-4 my-4 bg-base-200'>
              <div className='flex items-center justify-center gap-6'>
                <div className='flex-1 text-center'>
                  <p className='uppercase text-secondary'>{objetivo.modelo}</p>
                  <p className='uppercase'>{objetivo.pieza}</p>
                  <input
                    type='number'
                    name='cantidad_entrega'
                    defaultValue={objetivo.cantidadEntrega}
                    className='input input-bordered input-primary w-full max-w-xs text-center'
                  />
                </div>

                <button type='submit' className='btn btn-primary flex-1'>
                  Entregar
                </button>
              </div>
              <progress
                className='progress progress-success w-full mt-4'
                value={objetivo.progreso}
                max='100'></progress>
              <p className='text-center text-sm'>
                {objetivo.total_entregas} / {objetivo.cantidadObjetivo}
              </p>
            </form>
          )
        })}
    </div>
  )
}
