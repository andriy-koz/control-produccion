'use client'

import useGetData from '@/hooks/useGetData'
import calculosParaSeguimiento from '@/utlis/calculosParaSeguimiento'

export default function Seguimiento() {
  const [entregas, objetivos, horaActual, minActual] = useGetData()

  return (
    <div className='space-y-4'>
      {objetivos.map((objetivo: any) => {
        const {
          progreso,
          estimado_proxima_entrega,
          piezas_estimadas,
          total_entregas,
          semaforo,
          piezas_hora,
          ultima_entrega,
        } = calculosParaSeguimiento(objetivo, entregas, horaActual, minActual)

        return (
          <div
            key={objetivo.objetivoId}
            className='flex flex-col justify-center items-center bg-base-200 py-4 gap-2'>
            <h1 className='uppercase text-secondary text-xl'>
              {objetivo.modelo}
              <span className='uppercase ml-1 text-base text-base-content'>
                {objetivo.pieza}
              </span>
            </h1>
            <div className='flex justify-center items-center text-center'>
              <div className='stats shadow'>
                <div className='stat'>
                  <div className='stat-title'>Entergados</div>
                  <div className='stat-value'>{total_entregas}</div>
                  <div className='stat-desc'>
                    La última entrega fue a las {ultima_entrega}
                  </div>
                </div>
                <div
                  className={`mt-4 mr-2 radial-progress ${
                    semaforo === 'verde' ? 'text-success' : ''
                  } ${semaforo === 'amarillo' ? 'text-warning' : ''} ${
                    semaforo === 'rojo' ? 'text-error' : ''
                  } }`}
                  style={
                    {
                      '--value': `${progreso}`,
                    } as React.CSSProperties
                  }>
                  {Math.round(progreso)}%
                </div>
              </div>
            </div>
            <div className='stats shadow mx-auto text-center'>
              <div className='stat'>
                <div className='stat-title'>Piezas por hora</div>
                <div className='stat-value'>{piezas_hora.toFixed(2)}</div>
                <div className='stat-desc'>
                  Estimado {Math.round(piezas_estimadas)} piezas
                </div>
              </div>
              <div className='stat'>
                <div className='stat-title'>Objetivo</div>
                <div className='stat-value'>{objetivo.cantidadObjetivo}</div>
                <div className='stat-desc'>
                  Próxima entrega a las {estimado_proxima_entrega}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
