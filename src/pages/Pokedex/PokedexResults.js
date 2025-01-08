import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PokedexResults({pokedex_results}) {

    useEffect(()=>{

    })
    const navigate = useNavigate();
    
    return (

    <table class="pokedex-results table table-sm table-dark">
    <thead>
        <tr>
        <th scope="col">No.</th>
        <th scope="col">Name</th>
        <th scope="col">Image</th>
        <th scope="col">Type</th>           
        </tr>
    </thead>
    <tbody>
        {pokedex_results && pokedex_results.map(pokemon =>{
            return(<tr key={pokemon.index} className='hover-active' onClick={()=>{navigate(`/pokedex/${pokemon.name}`)}}>
                        <th scope="row">{pokemon.index}</th>
                        <td>{pokemon.name}</td>
                        <td className='table-image'><img src={pokemon.image} alt={`${pokemon.name} sprite`} loading="lazy" ></img></td>
                        <td className='table-type'>
                            <div className='type-container'>
                            {pokemon.type.map(each_type =>
                            {return(<div key={each_type.type.name} className={'type-'+`${each_type.type.name}`}>{each_type.type.name}</div>)})}   
                            </div>
                        </td>
                    </tr>
                    )
        })            

        }

    </tbody>
    </table>

  )
}
