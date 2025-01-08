import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { formatString } from '../../reusable/FormatString';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


export const EvolutionChain  = ({ chain, from_location_page }) => {
    const navigate = useNavigate();
    
    useEffect(()=>{
        
        // Find the first element with the desired class
        const first_evo_container = document.querySelector('.evo-container');
        // If evo-arrow exist, that means the pokemon has evolution
        if (first_evo_container.classList.contains('evo-arrow')) {
            first_evo_container.classList.remove('evo-arrow'); // Removes `::before` styles
        }

        const branches = document.querySelectorAll('.tree-branches');
        
        // If 3 or more evolutions within a branch, then we only need one arrow
        branches.forEach((branch) => {
            const evo_containers = branch.children;
            
            if (evo_containers.length > 2) {

                // Delete all arrow from this branch
                Array.from(evo_containers).forEach(container => {
                    container.classList.remove('evo-arrow')
                });
                
                // Add a arrow to the previous evolution pokemon
                const pokemon_container = branch.previousElementSibling
                pokemon_container.classList.add('group-arrow')
            }
        });

    },[])

return(
    <>
        {chain.map((pokemon) => (
            <div key={pokemon.id} className='evo-container evo-arrow'>
                    {pokemon.exist_in_version ?
                        <div className='pokemon-container'>
                            <div>
                                <div className="img-frame" onClick={(e) => {
                                    if (from_location_page) {
                                        navigate(`/search-pokemon-location/${pokemon.evolution_name}`);
                                    } else {
                                        navigate(`/pokedex/${pokemon.evolution_name}`);
                                    }
                                    }}>
                                    <img src={pokemon.image} alt="image of pokemon" className=""/>
                                </div>
                                <p className="text-center" key={`pokemon-${pokemon.id}`} >{formatString(pokemon.evolution_name)}</p>
                            </div>
                        </div>                        
                        :
                        <OverlayTrigger key='top' placement='top'overlay={
                            <Tooltip id='tooltip'>
                                {formatString(pokemon.evolution_name)} is not attainable in FireRed.
                            </Tooltip>}>

                            <div className='pokemon-container not_in_version'>
                                <div>
                                    <div className="img-frame">
                                        <img src={pokemon.image} alt="image of pokemon" className=""/>
                                    </div>
                                    <p className="text-center" key={`pokemon-${pokemon.id}`} >{formatString(pokemon.evolution_name)}</p>
                                </div>
                            </div>
                        </OverlayTrigger>


                    }

                    {/* If current pokemon has more evolution, then display the next chain again */}
                    {pokemon.next_chain.length > 0 && (
                        <div className="tree-branches">
                            <EvolutionChain chain={pokemon.next_chain} from_location_page ={from_location_page} />
                        </div>
                    )}

            </div>         
        ))}

    </>

)

}
