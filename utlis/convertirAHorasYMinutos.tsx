export default function convertirAHorasYMinutos(decimal: any) {
    const horas = Math.floor(decimal)
    const minutos = Math.round((decimal - horas) * 60)
    return `${horas}:${minutos.toString().padStart(2, '0')}`
}
