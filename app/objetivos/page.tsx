'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { doc, setDoc, collection } from 'firebase/firestore'
import { database } from '../../firebase'

const modelos = ['a4', 'a5', 'a6']
const piezas = ['fondo-canos', 'tapa-funda', 'terminado']

export default function Objetivos() {
    const [modelo, setModelo] = useState('a4')
    const [pieza, setPieza] = useState('fondo-canos')
    const [cantObj, setCantObj] = useState(0)
    const [cantEntrega, setCantEntrega] = useState(0)
    const [hsInicio, setHsInicio] = useState(0)
    const [minInicio, setMinInicio] = useState(0)
    const [hsFin, setHsFin] = useState(0)
    const [minFin, setMinFin] = useState(0)

    const handleSubmit = async (e:any) => {
        e.preventDefault()

        const fecha = new Date()
        const dia = fecha.getDay()
        const mes = fecha.getMonth()

        const docData = {
            id: uuidv4(),
            cantidad_entrega: cantEntrega, 
            cantidad_objetivo: cantObj,
            hora_fin: hsFin,
            hora_inicio: hsInicio,
            min_fin: minFin,
            min_inicio: minInicio,
            modelo: modelo,
            pieza: pieza,
            sector: "soldadura",
            dia,
            mes,  
        }

       await setDoc(doc(database, "objetivos", docData.id), docData) 

       setModelo('a4')
       setPieza('fondo-canos')
       setCantObj(0)
       setCantEntrega(0)
       setHsInicio(0)
       setHsFin(0)
       setMinInicio(0)
       setMinFin(0)
    }
    
    const piezaNombre = (pieza:string) : string => {
        return pieza === 'fondo-canos'?'Fondo-Caños': pieza === 'tapa-funda' ? 'Tapa-Funda':pieza === 'terminado'?'Terminado':''
    }

    return <main>
        <form className="px-12 py-12 bg-gray-50 rounded-3xl shadow-md m-12 space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-center text-xl">Agregar objetivo</h2>

            <div className="space-x-6 py-2">
                <label htmlFor="sector">Sector</label>
                <input type="text" name="sector" id="sector" value='soldadura' disabled />
            </div>

            <div>
                <h3>Modelo</h3>
                <select value={modelo} name='modelo' id='modelo' className="select select-primary w-full max-w-xs" onChange={(e:any) => setModelo(e.target.value)}>
                    {modelos.map((modelo, i) => <option key={i} value={modelo}>{modelo.toUpperCase()}</option>)}
                </select>
            </div>

            <div>
                <h3>Pieza</h3>
                <select value={pieza} name='pieza' id='pieza' className="select select-primary w-full max-w-xs" placeholder="pieza" onChange={(e:any) => setPieza(e.target.value)}>
                    {piezas.map((pieza, i) => <option key={i} value={pieza}>{pieza}</option>)}
                </select>
            </div>

            <div>
                <h3>Cantidad objetivo (total dia)</h3>
                <input value={cantObj} type="number" name="cantidad-objetivo" id='cantidad-objetivo'
                    min={1} max={300} onChange={(e:any) => setCantObj(e.target.value)}
                    className="input input-bordered input-primary w-full max-w-xs"
                    />
            </div>

            <div>
                <h3>Cantidad por canasto</h3>
                <input value={cantEntrega} type="number" name='cantidad-entrega' id='cantidad-entrega'
                    min={1} max={25} onChange={(e:any) => setCantEntrega(e.target.value)}
                    className="input input-bordered input-primary w-full max-w-xs"
                    />
            </div>
        
            <div>
                <h3>Hora de inicio</h3>
                <div className="flex">
                        <input type="number" name="hora-inicio" id="hora-inicio" min={0} max={24} 
                            placeholder="hs" className="input input-bordered input-primary w-full max-w-xs" 
                            onChange={(e:any) => setHsInicio(e.target.value)} value={hsInicio}
                            />
                        <span className="px-2 flex items-center">:</span>
                        <input type="number" name="min-inicio" id="min-inicio" min={0} max={59} 
                            placeholder="mins" className="input input-bordered input-primary w-full max-w-xs" 
                            onChange={(e:any) => setMinInicio(e.target.value)} value={minInicio}
                            />
                </div>
            </div>

            <div>
                <h3>Hora de finalización</h3>
                <div className="flex">
                        <input type="number" name="hora-fin" id="hora-fin" min={0} max={24} 
                            placeholder="hs" className="input input-bordered input-primary w-full max-w-xs" 
                            onChange={(e:any) => setHsFin(e.target.value)} value={hsFin}
                            />
                        <span className="px-2 flex items-center">:</span>
                        <input type="number" name="min-fin" id="min-fin" min={0} max={59} 
                            placeholder="mins" className="input input-bordered input-primary w-full max-w-xs" 
                            onChange={(e:any) => setMinFin(e.target.value)} value={minFin} 
                            />
                </div>
            </div>

            <button type="submit" className="btn btn-primary mx-auto block">Guardar</button>
        </form>
    </main>
}