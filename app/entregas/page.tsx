'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc } from 'firebase/firestore'
import { database } from '@/firebase'
import useGetData from '@/hooks/useGetData'
import { sumarEntregas } from '@/utlis/sumarEntregas'

export default function Entregas() {
    const [entregas, objetivos, horaActual, minActual] = useGetData()
    const [estadoEntregas, setEstadoEntregas] = useState()

    // Manejar las entregas correspondientes a cada objetivo
    const handleEntrega = async (
        e: any,
        modelo: any,
        pieza: any,
        id_objetivo: any,
        total_entregas : any
    ) => {
        e.preventDefault()

        const date = new Date()

        const mins = date.getMinutes()
        const hs = date.getHours()

        const entrega = {
            cantidad_entrega: parseInt(e.target.cantidad_entrega.value),
            pieza,
            sector: 'soldadura',
            modelo,
            hora: hs,
            minuto: mins,
            id: uuidv4(),
            id_objetivo,
        }

        const docRef = doc(database, 'entregas', entrega.id)
        await setDoc(docRef, entrega)
        setEstadoEntregas(total_entregas)
      }
      
      return (
        <div>
            {objetivos &&
                objetivos.map((objetivo: any) => {
                  const { total_entregas } = sumarEntregas(
                    entregas,
                    objetivo.modelo,
                    objetivo.pieza,
                    objetivo.id
                    )
                    const progreso =
                        (total_entregas / objetivo.cantidad_objetivo) * 100
                    return (
                        <form
                            onSubmit={(e) =>
                                handleEntrega(
                                    e,
                                    objetivo.modelo,
                                    objetivo.pieza,
                                    objetivo.id,
                                    total_entregas
                                )
                            }
                            key={objetivo.id}
                            className="px-8 py-4 my-4 bg-base-200"
                        >
                            <div className="flex items-center justify-center gap-6">
                                <div className="flex-1 text-center">
                                    <p className="uppercase text-secondary">
                                        {objetivo.modelo}
                                    </p>
                                    <p className="uppercase">
                                        {objetivo.pieza}
                                    </p>
                                    <input
                                        type="number"
                                        name="cantidad_entrega"
                                        defaultValue={objetivo.cantidad_entrega}
                                        className="input input-bordered input-primary w-full max-w-xs text-center"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-1"
                                >
                                    Enviar
                                </button>
                            </div>
                            <progress
                                className="progress progress-success w-full mt-4"
                                value={progreso}
                                max="100"
                            ></progress>
                            <p className="text-center text-sm">
                                {total_entregas} / {objetivo.cantidad_objetivo}
                            </p>
                        </form>
                    )
                })}
        </div>
    )
}
