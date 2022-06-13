import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {unPokeDetalleAccion} from '../redux/pokeDucks'

function Detalle() {

    const dispatch = useDispatch()

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(unPokeDetalleAccion())
        }
        fetchData()
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemones.unPokemon)

  return pokemon ? (
    <div>
        <div className="card text-center">
            <div className="card-body">
                <img src={pokemon.foto} className="img-fluid" alt=''/>
                <div className="card-title text-uppercase">{pokemon.nombre}</div>
                <p className="card-text">Alto: {pokemon.alto} | Peso: {pokemon.peso}</p>
            </div>
        </div>
    </div>
  ) : null
}

export default Detalle