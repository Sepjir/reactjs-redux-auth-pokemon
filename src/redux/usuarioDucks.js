import {auth, firebase, db, storage} from '../firebase'

//data inicial

const dataInicial = {
    loading: false,
    activo: false,
}


//types
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SESION = 'CERRAR_SESION'

//reducer
export default function usuarioReducer (state = dataInicial, action) {
    switch(action.type) {
        case LOADING:
            return {...state, loading: true}
        case USUARIO_ERROR:
            return {...dataInicial}
        case USUARIO_EXITO:
            return {...state, loading: false, user: action.payload, activo: true}
        case CERRAR_SESION:
            return {...dataInicial}
        default: 
            return {...state}
    }

}

//action
export const ingresoUsuarioAccion = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    
    try {

        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await auth.signInWithPopup(provider)

        console.log(res.user)

        const usuario = {
            uid: res.user.uid,
            email: res.user.email,
            displayname: res.user.displayName,
            photoURL: res.user.photoURL
        }

        const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()

        if (usuarioDB.exists) {
            // si existe el usuario en DB
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuario))
        }else {
            // si no existe el usuario en DB
            await db.collection('usuarios').doc(usuario.email).set(usuario)
            dispatch({
                type: USUARIO_EXITO,
                payload: usuario
            })
            localStorage.setItem('usuario', JSON.stringify(usuario))
        }
        
    } catch (e) {
        console.log(e)
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const leerUsuarioActivoAccion = () => (dispatch) => {
    if (localStorage.getItem('usuario')) {
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }
}

export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    localStorage.removeItem('usuario')
    dispatch({
        type: CERRAR_SESION
    })
}

export const actualizarUsuarioAccion = (nombreActualizado) => async (dispatch, getstate) => {
    dispatch({
        type: LOADING
    })

    const {user} = getstate().usuario
    try {
        
        await db.collection('usuarios').doc(user.email).update({
            displayname: nombreActualizado
        })

        const usuario = {
            ...user,
            displayname: nombreActualizado
        }

        dispatch({
            type: USUARIO_EXITO,
            payload: usuario
        })

        localStorage.setItem('usuario', JSON.stringify(usuario))

    } catch (e) {
        console.log(e)
    }
}

export const editarFotoAccion = (imagenEditada) => async (dispatch, getState) =>{
    dispatch({
        type: LOADING
    })

    const {user} = getState().usuario

    try {
        
        const imagenRef = await storage.ref().child(user.email).child('foto perfil')
        await imagenRef.put(imagenEditada)
        const imagenURL = await imagenRef.getDownloadURL()

        await db.collection('usuarios').doc(user.email).update({
            photoURL: imagenURL
        })

        const usuario = {
            ...user,
            photoURL: imagenURL
        }

        dispatch({
            type: USUARIO_EXITO,
            payload: usuario
        })

        localStorage.setItem('usuario', JSON.stringify(usuario))

    } catch (e) {
        console.log(e)
    }

}