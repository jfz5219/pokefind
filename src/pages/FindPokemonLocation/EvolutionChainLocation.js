import { useEffect, useState } from "react"
import '../../css/EvolutionChain.css'
import { EvolutionChain } from "./EvolutionChain";
import { formatString } from "../../reusable/FormatString";

export const EvolutionChainLocation = ({ evolution_chain_url, pokemon_name, from_location_page }) => {
    const [evolutionChain, setEvolutionChain] = useState('');
    const [from_search_pokemon_location_page, setFromLocationPage] = useState(from_location_page)
    
    useEffect(() => {
        const getEvolutionChain = async () => {
          try {
    
            const response = await fetch(evolution_chain_url);
            const evolution_data = await response.json();
            const evolutions = []
    
            // Evolution chain is formatted as nested arrays. Ex: {Pichu[Pikachu[Raichu]]}
            const chain = evolution_data.chain;

            // Recursive function to traverse the evolution chain
            async function parseEvolutionChain(chains) {

              // For each evolution within the chain, return info
              const results = Promise.all(chains.map(async (chain) => {
                // Add the current pokemon to the evolutions list 
                
                let evolution_name =''
                if (chain.species.name) {
                  evolution_name = chain.species.name
                } else {
                  evolution_name = pokemon_name
                }

                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution_name}`);
                const pokemon_data = await response.json();
                const game_indices = pokemon_data.game_indices

                // Only pokemon that can exist in firered can be pushed to evolutions
                const game_ver_found = game_indices.some(game => game.version.name === "firered");

                return { id: pokemon_data.id,
                    evolution_name: evolution_name,
                    image: pokemon_data.sprites.front_default,
                    exist_in_version: game_ver_found,
                    // If next_chain has length, that means to call the function again and 
                    // loop through that chain's evolution, else return nothing
                    next_chain: chain.evolves_to.length > 0 ? await parseEvolutionChain(chain.evolves_to) : []
                };
              

              }))
              return (await results).filter(Boolean)
            }

            const evolution_chain = await parseEvolutionChain([chain]);
            setEvolutionChain(evolution_chain)

          } catch (error) {
            console.error("Error fetching evolution chain:", error);
          }
        };

        (async () => {
          try {
               // Wait for all the parseEvolutionChain to be done and then get the returned evolutions to setEvolutionChain
              await getEvolutionChain();
        } catch (error) {
              console.error("Error fetching data:", error);
          }
      })();

      }, []);

    return(
        <>
        
            {evolutionChain.length !== 0 && <div className="evolution-container forth-color w-100 mt-4 light-shadow">
              
                {from_search_pokemon_location_page?
                    <h4 className="text-center pb-3">Where to find {formatString(pokemon_name)}'s other evolutions</h4>
                    :<h4 className="text-center pb-3">Evolutions</h4>
                }

                <p>{from_search_pokemon_location_page}</p>
                
                <EvolutionChain chain = {evolutionChain} from_location_page={from_location_page}/>

            </div>}

        </>

    )
}
