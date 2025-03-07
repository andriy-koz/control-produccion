import convertirAHorasYMinutos from './convertirAHorasYMinutos'

export const sumarEntregas = (
  entregas: any,
  modelo: string,
  pieza: string,
  id: any
) => {
  let hora_ultima_entrega = '00:00'
  let sum = 0
  let hora = 0
  entregas.forEach((entrega: any) => {
    if (
      entrega.modelo === modelo &&
      entrega.pieza === pieza &&
      entrega.objetivoId === id
    ) {
      sum += entrega.cantidadEntrega
      if (entrega.hora > hora) {
        hora = entrega.hora
        hora_ultima_entrega = convertirAHorasYMinutos(
          hora + entrega.minuto / 60
        )
      }
    }
  })
  return { total_entregas: sum, ultima_entrega: hora_ultima_entrega }
}
