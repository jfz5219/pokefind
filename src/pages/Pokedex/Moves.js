import { useState, useEffect } from 'react'

export default function Moves({moves}) {
    const[all_moves_details, setMoves] = useState(null) 
    ////////////// Moves

    useEffect(() => {

        async function fetchMove() {
            const moves_level_up = await Promise.all(
                moves.map(async(each_move) => {
            
                // Right after the move is found to be in firered version, then .find() will return firered version's move details
                const version_move_details =  each_move.version_group_details.find(version => version.version_group.name === "firered-leafgreen") 
        
                // Only return the move if it exists in firered, version_move_details will be undefined if not in firered
                // Also only return moves that are attained by "leveling up"
                if (version_move_details !== undefined && version_move_details.move_learn_method.name === 'level-up') {
        
                    const response = await fetch(each_move.move.url)
                    const move_details = await response.json()
        
                    // Format the firered version's move details and return along with the actual move name
                    return{
                        name: each_move.move.name,
                        level_learned_at: version_move_details.level_learned_at,
                        power: move_details.power,
                        type: move_details.type.name,
                        accuracy: move_details.accuracy,
                        damage_class: move_details.damage_class.name
                    }
        
                    
                }})
                
            )
            // ex: [move, undefined, move], get rid of undefineds
            return moves_level_up.filter(move => move !== undefined)
        }

        // Make sure fetched moves are available from promise for setMoves and 
        // sorting the moves by ascending order of the pokemon's level
        fetchMove().then((fetched_moves) => {
            console.log(fetched_moves)
            fetched_moves.sort((a, b) => a.level_learned_at - b.level_learned_at);
            setMoves(fetched_moves)
        })

    }, [moves])


  return (
    <div className='mt-5 flex-fill w-100'>
        <h4>Moves Learned by Leveling Up</h4>
        {all_moves_details && 

        <div className='move-container table-responsive'>
        <table class="table table-sm table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">Lv.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Accuracy</th>
                    <th scope="col">Power</th>
                    <th scope="col">Type</th>
                    <th scope="col">Category</th>
                </tr>
            </thead>
            <tbody>
            {all_moves_details.map(move => {
            return(     
                
                    <tr key={move.name}>
                        <th scope="row">{move.level_learned_at}</th>
                        <td>{move.name}</td>
                        <td>{move.accuracy}</td>
                        <td>{move.power}</td>
                        <td> <div className={'type type-'+`${move.type}`}>{move.type}</div></td>
                        <td>{move.damage_class}</td>
                    </tr>

                )})}
            </tbody>  
        </table>
        </div>
        }


    </div>
  )
}
