import convertirAHorasYMinutos from './convertirAHorasYMinutos'
import { sumarEntregas } from './sumarEntregas'

export default function calculosParaSeguimiento(
    objetivo: any,
    entregas: any,
    horaActual: any,
    minActual: any
) {
    let semaforo = 'verde'
    const {suma, ultima_entrega} = sumarEntregas(
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
    const tiempo_transcurrido =
        horaActual +
        minActual / 60 -
        objetivo.hora_inicio -
        objetivo.min_inicio / 60
    const tiempo_por_entrega = objetivo.cantidad_entrega / piezas_hora
    const entregas_objetivo = tiempo_transcurrido / tiempo_por_entrega
    const entregas_realizadas = suma / objetivo.cantidad_entrega
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
            objetivo.hora_inicio +
            objetivo.min_inicio / 60
    )

    const progreso = (suma / objetivo.cantidad_objetivo) * 100

    return {
        progreso,
        estimado_proxima_entrega,
        piezas_estimadas,
        suma,
        semaforo,
        piezas_hora,
        ultima_entrega
    }
}
