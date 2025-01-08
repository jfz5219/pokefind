import { useEffect, useState, useRef} from 'react';

import { SearchBar } from "../../reusable/SearchBar.js";
import { SearchResultsList } from "./SearchResultsList.js";
import "../../css/SearchPokemonLocation.css"
import Loading from '../Loading.js';

function SearchPokemonLocation() {
  const [is_loading, isLoading] = useState(false)
  const [is_mounted, isMounted] = useState(false)
  const [filtered_list, setFilteredList] = useState([]);
  const [all_pokemon_list, setPokemonList] = useState([]);
  


// Once location area changes, get new area's pokemon encounters
useEffect(() => {

    // SearchResultsList is mounted 2000s later, so quickly fetched data cannot be properly attached to slow mounted component
    // Solution: that's why we set is_mounted = true after Timeout is done (<Loading/> is false now), so then we can 
    // start to fetch data and have it properly passed down to the mounted component.
    
    if (is_mounted) {

        // Because fetching pokemon may take some time, so show loading animation again (that was previously set to false in initalization of SearchBar)
        isLoading(true)

        // Initialize pokemon list 
        const fetchData = async () => {
          const response = await fetch("https://pokeapi.co/api/v2/pokedex/2/");
          const result = await response.json()
          const pokemon_list = await result.pokemon_entries
          setPokemonList(pokemon_list);
          setFilteredList(pokemon_list)
          isLoading(false)
      };

      fetchData();
    }

    

}, [is_mounted]); 

  return (
    <div className='search container  mt-5'>
      <h1 class="text-center mb-5">Discover a Pokemon's Location</h1>
      <div className="search-bar-container w-100">

        <SearchBar setFilteredList={setFilteredList}  all_pokemon_list={all_pokemon_list} isLoading={isLoading} isMounted={isMounted}/>
        
        {is_loading ? <Loading/> : 
        <SearchResultsList filtered_list={filtered_list}/>
        } 

      </div>
    </div>
  );
}

export default SearchPokemonLocation;