import convertirAHorasYMinutos from './convertirAHorasYMinutos'
import { sumarEntregas } from './sumarEntregas'

export default function calculosParaSeguimiento(
    objetivo: any,
    entregas: any,
    horaActual: any,
    minActual: any
) {
    let semaforo = 'verde'
    const { total_entregas, ultima_entrega } = sumarEntregas(
        entregas,
        objetivo.modelo,
        objetivo.pieza,
        objetivo.id
    )
    const piezas_hora =
        objetivo.cantidad_objetivo /
        (objetivo.hora_fin +
            objetivo.min_fin / 60 -
            objetivo.hora_inicio -
            objetivo.min_inicio / 60)
    const piezas_15mins = piezas_hora / 4
    const tiempo_transcurrido =
        horaActual +
        minActual / 60 -
        objetivo.hora_inicio -
        objetivo.min_inicio / 60
    const tiempo_por_entrega = objetivo.cantidad_entrega / piezas_hora
    const piezas_estimadas = piezas_hora * tiempo_transcurrido

    if (
        piezas_estimadas - total_entregas <=
        objetivo.cantidad_entrega + piezas_15mins
    ) {
        semaforo = 'verde'
    } else if (
        piezas_estimadas - total_entregas >
            objetivo.cantidad_entrega + piezas_15mins &&
        piezas_estimadas - total_entregas <
            objetivo.cantidad_entrega + piezas_hora
    ) {
        semaforo = 'amarillo'
    } else {
        semaforo = 'rojo'
    }

    const estimado_proxima_entrega = convertirAHorasYMinutos(
        Math.ceil(piezas_estimadas / objetivo.cantidad_entrega) *
            tiempo_por_entrega +
            objetivo.hora_inicio +
            objetivo.min_inicio / 60
    )

    const progreso = (total_entregas / objetivo.cantidad_objetivo) * 100

    return {
        progreso,
        estimado_proxima_entrega,
        piezas_estimadas,
        total_entregas,
        semaforo,
        piezas_hora,
        ultima_entrega,
    }
}
