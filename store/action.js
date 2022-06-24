
export const pokemonColors = {
  normal: "#b5b9c4",
  fighting: "#eb4971",
  flying: "#A890F0",
  poison: "#9f6e97",
  ground: "#f78552",
  rock: "#B8A038",
  bug: "#8BD674",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#FFA756",
  water: "#58ABF6",
  grass: "#8BBE8A",
  electric: "#f2cb55",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#eca8c3",
};

export const pokemonTypeColors = {
  normal: "#9DA0AA",
  fighting: "#D04164",
  flying: "#748FC9",
  poison: "#A552CC",
  ground: "#DD7748",
  rock: "#B8A038",
  bug: "#8CB230",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#FD7D24",
  water: "#4A90DA",
  grass: "#62B957",
  electric: "#EED535",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#ED6EC7",
};

export function setNext(payload){
  return {type: 'NEXT/SETNEXT', payload}
}

export function addPokemons(payload) {
  return {type: 'POKEMONS/ADDPOKEMONS', payload}
}

export function addMoves(payload) {
  return {type: 'POKEMONDETAIL/ADDMOVES', payload}
}

export function addTypes(payload) {
  return {type: 'POKEMONDETAIL/ADDTYPES', payload}
}

export function addPokebag(payload) {
  return {type: 'POKEBAG/ADDPOKEBAG', payload}
}

export function deletePokebag(payload){
  return {type: 'POKEBAG/DELETEPOKEBAG', payload}
}

export function setLoading(payload) {
  return {type: 'LOADING/SETLOADING', payload}
}

export function setPokemonDetail(payload) {
  return {type: 'POKEMONDETAIL/SETPOKEMONDETAIL', payload}
}

export function fetchPokemons(next){
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      let url = ''
      if (next){
        url = next
      } else {
        url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
      }
      const res = await fetch(url)
      let result = await res.json()      

      const pokemonsArray = [];
      for await (const pokemon of result.results) {
        const pokemonDetailsResponse = await fetch(pokemon.url);
        // console.log(pokemon.url,'-----detail')
        const pokemonDetails = await pokemonDetailsResponse.json()

        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.substring(1),
          type: pokemonDetails.types[0].type.name,
          types: pokemonDetails.types,
          moves: pokemonDetails.moves,
          order: pokemonDetails.order,
          imgUrl: pokemonDetails.sprites.other["official-artwork"].front_default,
          species: pokemonDetails.species.name,
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
          ability1: pokemonDetails.abilities[0].ability.name,
          ability2: pokemonDetails.abilities[1]?.ability.name,
          exp: pokemonDetails.base_experience,
          stats: pokemonDetails.stats,
        });
      }
      await dispatch(addPokemons(pokemonsArray))
      await dispatch(setNext(result.next))
      dispatch(setLoading(false))
    } catch (error) {
      console.log(error,'\n---ERROR FETCH POKEMON---')
      dispatch(setLoading(false))
    }
  }
}

// export function fetchPokemonDetail(url){
//   return async (dispatch) => {
//     try {
//       dispatch(setLoading(true))
//       const res = await fetch(url)
//       let result = await res.json()
//       await dispatch(setPokemonDetail(+url.split("pokemon/")[1].split('/')[0]))
//       await dispatch(addMoves(result.moves))
//       await dispatch(addTypes(result.types))
//       dispatch(setLoading(false))
//     } catch (error) {
//       console.log(error,'\n---ERROR FETCH POKEMON---')
//       dispatch(setLoading(false))
//     }
//   }
// }
