'use client'

import useGetData from '@/hooks/useGetData'
import convertirAHorasYMinutos from '@/utlis/convertirAHorasYMinutos'

export default function Seguimiento() {
    const [entregas, objetivos, horaActual, minActual] = useGetData()

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
                if (parseInt(entrega.hora) > hora) {
                    hora = parseInt(entrega.hora)
                    hora_ultima_entrega = convertirAHorasYMinutos(
                        hora + entrega.minuto / 60
                    )
                }
            }
        })
        return { suma: sum, ultima_entrega: hora_ultima_entrega }
    }

    return (
        <div className="space-y-4">
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
                const tiempo_por_entrega =
                    objetivo.cantidad_entrega / piezas_hora
                const entregas_objetivo =
                    tiempo_transcurrido / tiempo_por_entrega
                const entregas_realizadas =
                    entregas.suma / objetivo.cantidad_entrega
                const piezas_estimadas = piezas_hora * tiempo_transcurrido

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
                    .padStart(2, '0')}:${objetivo.min_inicio
                    .toString()
                    .padStart(2, '0')}`

                const progreso =
                    (entregas.suma / objetivo.cantidad_objetivo) * 100

                return (
                    <div
                        key={objetivo.id}
                        className="flex flex-col justify-center items-center bg-base-200 py-4 gap-2"
                    >
                        <h1 className="uppercase text-secondary text-xl">
                            {objetivo.modelo}
                            <span className="uppercase ml-1 text-base text-base-content">
                                {objetivo.pieza}
                            </span>
                        </h1>
                        <div className="flex justify-center items-center text-center">
                            <div className="stats shadow">
                                <div className="stat">
                                    <div className="stat-title">Entergados</div>
                                    <div className="stat-value">
                                        {entregas.suma}
                                    </div>
                                    <div className="stat-desc">
                                        La última entrega fue a las{' '}
                                        {entregas.ultima_entrega}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`radial-progress ${
                                    semaforo === 'verde' ? 'text-success' : ''
                                } ${
                                    semaforo === 'amarillo'
                                        ? 'text-warning'
                                        : ''
                                } ${semaforo === 'rojo' ? 'text-error' : ''} }`}
                                style={
                                    {
                                        '--value': `${progreso}`,
                                    } as React.CSSProperties
                                }
                            >
                                {Math.round(progreso)}%
                            </div>
                        </div>
                        <div className="stats shadow mx-auto text-center">
                            <div className="stat">
                                <div className="stat-title">
                                    Piezas por hora
                                </div>
                                <div className="stat-value">
                                    {piezas_hora.toFixed(2)}
                                </div>
                                <div className="stat-desc">
                                    Estimado {Math.round(piezas_estimadas)}{' '}
                                    piezas
                                </div>
                            </div>
                            <div className="stat">
                                <div className="stat-title">Objetivo</div>
                                <div className="stat-value">
                                    {objetivo.cantidad_objetivo}
                                </div>
                                <div className="stat-desc">
                                    Próxima entrega a las{' '}
                                    {estimado_proxima_entrega}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
