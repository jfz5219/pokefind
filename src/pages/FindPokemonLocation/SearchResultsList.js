// import "./SearchResultsList.css";
// import { SearchResult } from "./SearchResult";
import { useNavigate } from "react-router-dom";
import '../../css/PokemonEncounteredByLocation.css'

export const SearchResultsList = ({ filtered_list }) => {

  const navigate = useNavigate();
  console.log(filtered_list)
  return (
    <div className="outer mt-5">
        <div className="">
            {filtered_list && 

                <ul className='container pokemon-gallery'>
                {filtered_list.map((pokemon_data) => 
                      {
                        // example url:"https://pokeapi.co/api/v2/location-area/298/"
                        // const location_area_id = area.url.match(/\/(\d+)\/$/)[1];
                        return (
                          <li key={pokemon_data.entry_number} >
                              <div className='pokemon-container' onClick={()=>{navigate(`/search-pokemon-location/${pokemon_data.pokemon_species.name}`) }}>
                                    <div className="img-frame" >
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${pokemon_data.entry_number}.png`} alt="image of pokemon" loading="lazy" className=""/>
                                    </div>
                                    <p className="text-center" key={`pokemon-${pokemon_data.entry_number}`} >{pokemon_data.pokemon_species.name}</p>
                              </div>
                          </li> 
                        );
                })}
                </ul>
            }

        </div>
    </div>
  );
};