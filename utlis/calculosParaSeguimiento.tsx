import convertirAHorasYMinutos from './convertirAHorasYMinutos'

export default function calculosParaSeguimiento(
    objetivo: any,
    entregas: any,
    horaActual: any,
    minActual: any
) {
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
    let semaforo = 'verde'
    const entregasSuma = sumarEntregas(
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
    const entregas_realizadas = entregasSuma.suma / objetivo.cantidad_entrega
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
        .padStart(2, '0')}:${objetivo.min_inicio.toString().padStart(2, '0')}`

    const progreso = (entregasSuma.suma / objetivo.cantidad_objetivo) * 100

    return {progreso, estimado_proxima_entrega, piezas_estimadas, entregasSuma, semaforo, piezas_hora}
}
