
const modelos = ['a4', 'a5', 'a6']
const piezas = ['fondo-canos', 'tapa-funda', 'terminado']

export default function Objetivos() {

    const piezaNombre = (pieza:string) : string => {
        return pieza === 'fondo-canos'?'Fondo-Caños': pieza === 'tapa-funda' ? 'Tapa-Funda':pieza === 'terminado'?'Terminado':''
    }
    
    return <main>
        <form className="px-12 py-12 bg-gray-50 rounded-3xl shadow-md m-12 space-y-6">
            <h2 className="text-center text-xl">Agregar objetivo</h2>
            <div className="space-x-6 py-4">
                <label htmlFor="sector">Sector</label>
                <input type="text" name="sector" id="sector" value='soldadura' disabled />
            </div> 
                <select name='modelo' id='modelo' className="select select-primary w-full max-w-xs">
                {modelos.map((modelo, i) => <option key={i} value={modelo}>{modelo.toUpperCase()}</option>)}
                </select>
                <select name='pieza' id='pieza' className="select select-primary w-full max-w-xs">
                {piezas.map((pieza, i) => <option key={i} value={pieza}>{piezaNombre(pieza)}</option>)}
                </select>            
                <input type="number" name="cantidad-objetivo" id='cantidad-objetivo' min={1} max={300} placeholder="Cantidad objetivo (total)" className="input input-bordered input-primary w-full max-w-xs"/>
                <input type="number" name='cantidad-entrega' id='cantidad-entrega' min={1} max={25} className="input input-bordered input-primary w-full max-w-xs" placeholder="Cantidad por canasto"/>
        
            <h3>Hora de inicio</h3>
            <div className="flex">
                    <input type="number" name="hora-inicio" id="hora-inicio" min={0} max={24} />
                    <input type="number" name="min-inicio" id="min-inicio" min={0} max={59} />
            </div>

            <h3>Hora de finalización</h3>
            <div className="flex">
                <div>
                    <label htmlFor="hora-fin" className="block">Hs(0 a 24)</label>
                    <input type="number" name="hora-fin" id="hora-fin" min={0} max={24} />
                </div>
                <div>
                    <label htmlFor="min-fin" className="block">Mins(0 a 59)</label>
                    <input type="number" name="min-fin" id="min-fin" min={0} max={59} />
                </div>
            </div>
        </form>
    </main>
}