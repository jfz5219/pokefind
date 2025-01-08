import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import '../../css/Pokedex.css'
import '../../css/SearchPokemonLocation.css'
import PokedexResults from './PokedexResults';
import { SearchBar } from '../../reusable/SearchBar';
import Loading from '../Loading';

export default function Pokedex() {

    const pokedex = useLoaderData()
    const [pokemon_list, setPokedexData] = useState([])
    const [filtered_list, setFilteredList] = useState([])
    const [is_loading, isLoading] = useState(true)
    const [is_mounted, isMounted] = useState(false)

    useEffect(() =>{
        
        // PokedexResult is mounted 2000s later, so quickly fetched data cannot be properly attached to slow mounted component
        // Solution: that's why we set is_mounted = true after Timeout is done (<Loading/> is false now), so then we can 
        // start to fetch data and have it properly passed down to the mounted component.
        if (is_mounted) {
        
        // Because fetching pokedex may take some time, so show loading animation again (that was previously set to false in initalization of SearchBar)
        isLoading(true)
        const asyncfetchPokemonData = async (pokedex_list) => {

            const pokemon_data = await Promise.all(pokedex_list.map(async(pokemon) =>{
                const pokemon_name = pokemon.pokemon_species.name
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`);
                const pokemon_data = await response.json()
                return{
                    index: pokemon_data.id,
                    name: pokemon_name,
                    image: pokemon_data.sprites.front_default,
                    type:pokemon_data.types,
                }

            }))

            isLoading(false)

            // Initialize search results
            setPokedexData(pokemon_data)
            setFilteredList(pokemon_data)
            
            };

        asyncfetchPokemonData(pokedex);
        }

    }, [is_mounted])


  return (

    <div className='search container  mt-5"'>
        
        <h1 className='text-center mb-5'>Pokedex</h1>
        
        {/* all_pokemon_list is need for Filtering list in Search bar 
        or just displaying the all the pokemon list when there's no input */}
        <SearchBar setFilteredList={setFilteredList} all_pokemon_list={pokemon_list} isLoading={isLoading} isMounted={isMounted}/>

        {is_loading? 
        <Loading/> :
        /* PokedexResults is initialized from pokemon_data in useEffect */
        <PokedexResults setFilteredList={setFilteredList} pokedex_results={filtered_list}/>
        }
        

    </div>

  )
}


export const pokedexLoader = async () => {

    const response = await fetch("https://pokeapi.co/api/v2/pokedex/2/");
    const result = await response.json()

    if (!response.ok) {
        throw Error('Issue loading pokedex.')
      }
    
    return result.pokemon_entries
}