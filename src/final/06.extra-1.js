// useEffect: HTTP requests
// 💯 handle errors
// http://localhost:3000/isolated/final/06.extra-1.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // const [status, setStatus] = React.useState('idle')
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)

  const [{status, pokemon, error}, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const idle = status === 'idle'
  const pending = status === 'pending'
  const resolved = status === 'resolved'
  const rejected = status === 'rejected'

  console.log({status, pokemon, error})

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    // setPokemon(null)
    // setError(null)
    // setStatus('pending')
    setState({status: 'pending'})

    fetchPokemon(pokemonName).then(
      pokemon => {
        // setPokemon(pokemon)
        // setStatus('resolved')
        setState({pokemon, status: 'resolved'})
      },
      error => {
        // setError(error)
        // setStatus('rejected')
        setState({error, status: 'rejected'})
      },
    )
  }, [pokemonName])

  if (rejected) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (idle) {
    return 'Submit a pokemon'
  } else if (pending) {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (resolved) {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
