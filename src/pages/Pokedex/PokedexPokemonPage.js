import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { EvolutionChainLocation } from '../FindPokemonLocation/EvolutionChainLocation';
import { decimetersToFeetIn } from '../../reusable/decimetersToFeetIn';
import { decagramsToPounds } from '../../reusable/decagramsToPounds';
import { formatString } from '../../reusable/FormatString';
import '../../css/Pokedex.css'
import Moves from './Moves';

export default function PokedexPokemonPage() {
  const {pokemon_name} = useParams()
  const navigate = useNavigate();
  const [moves, setMoves] = useState();
  const [stats, setBaseStats] = useState();
  const [evolution_chain_url, setEvolutionChain] = useState();
  const [basic_info, setBasicInfo] = useState();

  // If this page was navigated from Pokemon in Area or Pokemon Location, then it must have a state.
  // If this page was arrived from non of the previous mentions, then it doesn't need a back button
  const previousLocationPathname = useLocation().state?.previousLocationPathname;
console.log(previousLocationPathname)
  useEffect(()=>{
    const getPokemonInfo = async() =>{

      try {

        // First api call get majority of the Pokemon's data
        const response_1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}/`)
        const pokemon_data_1 = await response_1.json()

        ////////////// Moves (will be separate component that will get all the other move's info)
        const moves = pokemon_data_1.moves
        setMoves(moves)

        ////////////// Stats
        const stats = pokemon_data_1.stats.map(stat_info => 
          {return {
            base_stat_num : stat_info.base_stat, 
            stat_name : stat_info.stat.name
          }})
        setBaseStats(stats)

        // 2nd api call is needed for evolution chain url
        const response_2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_name}`)
        const pokemon_data_2 = await response_2.json()
        const evolution_chain_url = pokemon_data_2.evolution_chain.url
        setEvolutionChain(evolution_chain_url)


        
        ////////////// Basic Info
        // Find firered text description
        const text_description = pokemon_data_2.flavor_text_entries.find(text => text.version.name === "firered")
        const species = pokemon_data_2.genera.find(each_genera => each_genera.language.name === 'en')
        
        const basic_info = {
          pokemon_index: pokemon_data_1.id,
          description: text_description.flavor_text,
          weight: decagramsToPounds(pokemon_data_1.weight),
          height: decimetersToFeetIn(pokemon_data_1.height),
          type: pokemon_data_1.types,
          species: species.genus
        }

        setBasicInfo(basic_info)
        console.log(basic_info)
  
      } catch (error) {
        navigate('/not-found', { state: { message: `Could not find data on ${pokemon_name}.` , url:"/pokedex", page_name: "Pokedex"} });
      }

    }

    getPokemonInfo()
    
  }, [pokemon_name])

  return (
    <>
    <div>{previousLocationPathname ? <div><a className="back-link" onClick={()=> navigate(previousLocationPathname)}>Back to {
    
    previousLocationPathname.split('/')
    .map((part, index, array) => {

      // Last part need to look like "Word - Word"
      if (index === (array.length - 1)){
        return ' - ' + formatString(part)
      } else {
        return ' ' + formatString(part)
      }
      
      
      })}
    
    </a></div>: <div></div>}</div>

    <div className='d-flex flex-wrap justify-content-center mt-5'>
    
    {basic_info && 
    <>
        <div className='name-img-container col-md-5 mt-4 me-md-4'>
            <div className='name'><h1>{pokemon_name}</h1></div>
            <div className='image'><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${basic_info.pokemon_index}.png`}  alt="image of pokemon" className=""/></div>
            <div className="basic-info-item type-container d-flex">{basic_info.type.map(each_type =>{return(<div className={'type-'+`${each_type.type.name}`}>{each_type.type.name}</div>)})}</div>  
        </div>

        <div className='basic-info-container light-shadow secondary-color col-md-5 mt-4 flex-fill  p-4'>

            <div className="basic-info-item"><div><span>National Index</span></div><div className='pokemon-index'>{basic_info.pokemon_index}</div></div>
            <div className="basic-info-item mt-3"><div><span>Description</span></div><div>{basic_info.description}</div></div>
            
            <div className='d-flex flex-wrap basic-info-item'>
                <div className="mt-3 col-6"><div><span>Height</span></div><div className='fw-bold'>{basic_info.height}</div></div> 
                <div className="mt-3 col-6"><div><span>Weight</span></div><div className='fw-bold'>{basic_info.weight}</div></div>
                <div className="mt-3 col-6"><div><span>Species</span></div><div className='fw-bold'>{basic_info.species}</div></div>
            </div>

        </div>

    </>
    }

    {stats && <div className='secondary-color-op col-md-12 mt-4 flex-fill  p-4'>
      
      <table className='w-100 stat-table'><tbody className='mb-3'>{stats.map(stat =>{
      return (   
        <tr>
              <th className='mb-0'>{stat.stat_name}</th>
              <td>
                  <div className='stat-row'>
                      <div  className="" style={{width: `${(stat.base_stat_num/255)*100}%`}}>{stat.base_stat_num}</div>
                  </div>
              </td>
        </tr>
      )
    })}</tbody></table>
    
    </div>}

    {evolution_chain_url && <EvolutionChainLocation pokemon_name={pokemon_name} evolution_chain_url={evolution_chain_url}/>}
    
    {moves && 
        <Moves moves={moves} />
    }

    </div>
    </>
  )
}

