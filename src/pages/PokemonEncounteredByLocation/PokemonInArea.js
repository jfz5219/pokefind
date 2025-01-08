import { useState, useEffect } from 'react';
import {getPokemonID} from "../../reusable/getPokemonID"
import { useNavigate, useLocation } from "react-router-dom";

const PokemonInArea = ({ area_data }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [pokemon_list, setPokemonList] = useState([]);


    // Once location area changes, get new area's pokemon encounters
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${area_data.url}`);
            const result = await response.json()
            const encounters = result.pokemon_encounters
            // Go through each pokemon encounter and ...
            const pokemons = encounters.map(pokemon_encounter =>
                // Only return pokemons that appear in Fire Red version or else make it null
                pokemon_encounter.version_details
                .some(each_version => each_version.version.name === "firered") ? pokemon_encounter.pokemon : null)
                // Lastly, filter out any nulls in the pokemons list (ex: [pokemon, null, pokemon] -> [[pokemon, pokemon]])
                .filter(pokemon => pokemon !== null)
            
          setPokemonList(pokemons);
          console.log(area_data.url)
        };
    
        fetchData();
      }, [area_data]); // Only runs if `area_data` changes

    return (

      <div className='pokemon-in-area w-100 mb-4'>
          {pokemon_list.length !== 0 ?

          <ul className='container pokemon-gallery'>
              {pokemon_list.map((pokemon_data) => 
                    {
                      const pokemon_id = getPokemonID(pokemon_data.url)
                      // example url:"https://pokeapi.co/api/v2/location-area/298/"
                      // const location_area_id = area.url.match(/\/(\d+)\/$/)[1];
                      return (
                        <li key={pokemon_id} >
                            <div className='pokemon-container' onClick={()=>{navigate(`/pokedex/${pokemon_data.name}`, { state: { previousLocationPathname: location.pathname } }) }}>
                                  <div className="img-frame" >
                                      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${pokemon_id}.png`} alt="image of pokemon" className=""/>
                                  </div>
                                  <p className="text-center" key={`pokemon-${pokemon_id}`} >{pokemon_data.name}</p>
                            </div>
                        </li> 
                      );
              })}
          </ul>
        : <div className='container mt-5 opacity-50'><p>There are no pokemon in this area. Try a different area or location.</p></div>}
          
      </div>
    );
  };
  
  export default PokemonInArea;

// export default function PokemonInArea() {
//     const location_area_data = useLoaderData()
//   return (
//     <div>{location_area_data.id}</div>
//   )
// }
// export const pokemonInAreaLoader = async ({ params }) => {
//     const { location_area_id } = params
  
//     const res = await fetch('https://pokeapi.co/api/v2/location-area' + location_area_id)
  
//     if (!res.ok) {
//       throw Error('Could not find the location.')
//     }
  
//     return res.json()
//   }