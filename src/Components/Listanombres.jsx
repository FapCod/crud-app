import React,{useState} from 'react'
import uniqid from 'uniqid'

const Listanombres = () => {

    const [nombre,setNombre] = useState('')

    const [listaNombres,setListarNombres]= useState([])
    const [modoEdicion,setModoEdicion]=useState(false)
    const [id,setId]= useState('')
    const [error,setError]=useState(null)

    const agregarNombre=(e)=> {
        e.preventDefault()
        
        if(!nombre.trim()){
            // alert('Ingrese un nombre')
            setError('Debe de ingresar un nombre')
        }else{
        const nuevoNombre={
            id:uniqid(),
            tituloNombre:nombre
        }
        setListarNombres([...listaNombres,nuevoNombre])
        setNombre('')
        setError(null)
    }
    }

    const eliminarNombre=(id)=> {
        const nuevaLista= listaNombres.filter(item=>item.id !== id)
        setListarNombres(nuevaLista)
    }
    const editar=(item)=> {
        setModoEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }
    const editarNombre=(e)=> {
        e.preventDefault()
        const nuevoArray= listaNombres.map(elementos=>elementos.id === id ? {id:id,tituloNombre:nombre} : elementos)
        setListarNombres(nuevoArray)
        setModoEdicion(false);
        setNombre('');
    }
    /* const listarNombre= (e)=> {
        e.preventDefault()
        if(!nombre.trim()){ //trim verifica si hay caracteres y si no hay esta vacio
           alert('El nombre esta vacio')}
    } */
    
   


    return (
        <div>
            <h2>Aplicacion para crud</h2>
            <div className="row">
                <div className="col"><h2>Listado de nombres</h2>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           listaNombres.map( item=>
                            <tr  key={item.id}>
                            <th scope="row">{item.id} </th>
                            <td>{item.tituloNombre} </td>
                            <td> <button className="btn btn-success" onClick={() =>{editar(item)}} >Editar</button></td>
                            <td> <button className="btn btn-danger" onClick={() =>{eliminarNombre(item.id)}}>Eliminar</button></td>
                            </tr>
                            
                           )
                       }
                       
                    </tbody>
                    </table>
                </div>
                <div className="col"><h2>Formulario para anadir nombres</h2>
                <form onSubmit={(e)=>{modoEdicion ? editarNombre(e) : agregarNombre(e)}} className="form-group" action="">
                    <input 
                    className="form-control mb-2" 
                    onChange={(e) =>{setNombre(e.target.value)}}    
                    type="text" placeholder="Introducir nombre"
                    value={nombre} />
                    <input className="btn btn-info btn-block"  type="submit" 
                    value={modoEdicion ? 'Editar Nombre' : 'Registrar Nombre'}/>
                </form>
                {
                    error !== null ? (
                        <div className="alert alert-danger" role="alert">
                        {error}
                        </div>
                    ) : (
                        // <div className="alert alert-success" role="alert">
                        // Agreado correctamente!
                        // </div>
                        <div></div>
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default Listanombres