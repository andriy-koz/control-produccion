
const modelos = ['a4', 'a5', 'a6']
const piezas = ['fondo-canos', 'tapa-funda', 'terminado']

export default function Objetivos() {

    const piezaNombre = (pieza:string) : string => {
        return pieza === 'fondo-canos'?'Fondo-Caños': pieza === 'tapa-funda' ? 'Tapa-Funda':pieza === 'terminado'?'Terminado':''
    }
    
    return <main>
        <form className="px-12 py-12 bg-gray-50 rounded-3xl shadow-md m-12 space-y-6">
            <h2 className="text-center text-xl">Agregar objetivo</h2>
            <div className="space-x-6 py-2">
                <label htmlFor="sector">Sector</label>
                <input type="text" name="sector" id="sector" value='soldadura' disabled />
            </div> 
                <select name='modelo' id='modelo' className="select select-primary w-full max-w-xs">
                <option disabled selected value="">Modelo</option>
                {modelos.map((modelo, i) => <option key={i} value={modelo}>{modelo.toUpperCase()}</option>)}
                </select>
                <select name='pieza' id='pieza' className="select select-primary w-full max-w-xs" placeholder="Pieza">
                <option disabled selected value="">Pieza</option>
                {piezas.map((pieza, i) => <option key={i} value={pieza}>{piezaNombre(pieza)}</option>)}
                </select>            
                <input type="number" name="cantidad-objetivo" id='cantidad-objetivo' min={1} max={300} placeholder="Cantidad objetivo (total)" className="input input-bordered input-primary w-full max-w-xs"/>
                <input type="number" name='cantidad-entrega' id='cantidad-entrega' min={1} max={25} className="input input-bordered input-primary w-full max-w-xs" placeholder="Cantidad por canasto"/>
        
            <div>
                <h3>Hora de inicio</h3>
                <div className="flex">
                        <input type="number" name="hora-inicio" id="hora-inicio" min={0} max={24} placeholder="hs" className="input input-bordered input-primary w-full max-w-xs" />
                        <span className="px-2 flex items-center">:</span>
                        <input type="number" name="min-inicio" id="min-inicio" min={0} max={59} placeholder="mins" className="input input-bordered input-primary w-full max-w-xs" />
                </div>
            </div>

            <div>
                <h3>Hora de finalización</h3>
                <div className="flex">
                        <input type="number" name="hora-fin" id="hora-fin" min={0} max={24} placeholder="hs" className="input input-bordered input-primary w-full max-w-xs" />
                        <span className="px-2 flex items-center">:</span>
                        <input type="number" name="min-fin" id="min-fin" min={0} max={59} placeholder="mins" className="input input-bordered input-primary w-full max-w-xs" />
                </div>
            </div>
            <button type="submit" className="btn btn-primary mx-auto block">Guardar</button>
        </form>
    </main>
}