import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {actualizarUsuarioAccion, editarFotoAccion} from '../redux/usuarioDucks'

const Perfil = () => {

    const usuario = useSelector(store => store.usuario.user)
    const loading = useSelector(store => store.usuario.loading)

    const [nombreUsuario, setNombreUsuario] = React.useState(usuario.displayname)
    const [activarFormulario, setActivarFormulario] =  React.useState(false)

    const [error, setError] = React.useState(false)

    const dispatch = useDispatch()

    const actualizarUsuario = () => {
        if (!nombreUsuario.trim()) {
            console.log('nombre vacio')
            return
        }
        dispatch(actualizarUsuarioAccion(nombreUsuario))
        setActivarFormulario(false)
    }

    const seleccionarArchivo = imagen => {
        console.log(imagen.target.files[0])
        const imagenCliente = imagen.target.files[0]

        if (imagenCliente === undefined) {
            console.log('No se seleccionó ninguna imagen')
            return
        }

        if ( imagenCliente.type === 'image/png' || imagenCliente.type === "image/jpeg" ) {
            dispatch(editarFotoAccion(imagenCliente))
            setError(false)
        }else {
            setError(true)
        }
    }

  return (
    <div className='mt-5 text-center'>
        <div className="card">
            <div className="card-body">
                <img className='img-fluid' src={usuario.photoURL} width="150px" alt="" />
                <h5 className="card-title">Nombre: {usuario.displayname}</h5>
                <p className="card-text">Email: {usuario.email}</p>
                <button className="btn btn-dark" onClick={() => setActivarFormulario(true)}>
                    Editar Nombre
                </button>

                <div className="input-group mb-3 mt-2 justify-content-center">
                    <input type="file" className="form-control" id="inputGroupFile02" style={{display:'none'}} onChange={e => seleccionarArchivo(e)} disabled={loading}/>
                    <label className={loading ? "btn btn-dark disabled" : "btn btn-dark"} htmlFor="inputGroupFile02">Actualizar Imagen</label>
                </div>
                {
                    error &&
                    <div className="alert alert-warning mt-3">Solo archivos PNG o JPEG</div>
                }
                {
                    loading &&
                    <div className="card-body mt-2">
                        <div className="d-flex justify-content-center">
                            <div className="spinner-grow text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                }
                {
                    activarFormulario &&
                        <div className="card-body mt-2">
                            <div className="row justify-content-center">
                                <div className="col-md-5">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)}/>
                                        <div className="input-group-append">
                                            <button className="btn btn-dark" onClick={() => actualizarUsuario()}>
                                                Actualizar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Perfil