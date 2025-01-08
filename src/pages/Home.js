import PokemonLocation from "../images/Pokemon_Location.jpg"
import PokemonEncounters from "../images/Pokemon_Encounters.jpg"
import "../css/Home.css"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()
    return(
        <div>
            <div class="alert alert-info d-flex align-items-center" role="alert">
                <div>
                    This is a demo exclusively for the Kanto Region in the FireRed game version. Additional regions will be released in the future!
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div  className="find-pokemon-container light-shadow d-flex mt-5 flex-wrap justify-content-between">
                <div className="m-auto col-md-6 d-flex flex-column align-items-center justify-content-between">
                    <div className="text-center">
                        <h1>Locate Pokemon</h1>
                        <p>Search for a Pokémon’s location</p>
                    </div>
                    <div>
                        <button className="primary-btn" onClick={()=>{navigate("/search-pokemon-location")}}>Get Started</button>
                    </div>
                </div> 

                <div className="col-md-5">
                    <img className="w-100" src={PokemonLocation} />
                </div>     
            </div>   

            <div  className="pokemon-encounter-container light-shadow d-flex mt-5 flex-wrap justify-content-between">
                <div className="m-auto col-md-6 d-flex flex-column align-items-center justify-content-between">
                    <div className="text-center">
                        <h1>Encounter Map</h1>
                        <p>View the Pokémon that inhabit the location</p>
                    </div>
                    <div>
                        <button className="primary-btn" onClick={() => navigate("/pokemon-encountered-by-location")}>Get Started</button>
                    </div>
                </div> 
                <div className="col-md-5">
                    <img className="w-100" src={PokemonEncounters} />
                </div>     
            </div>   

            
            {/* <div className="d-flex mt-5 flex-wrap justify-content-between">  
            <div className="image-container">
                <img src={PokemonEncounters} alt="Pokemon Encounters" />
            </div>   
            <div className="info-container">
                <div className="text-center">
                <h1>Encounter Map</h1>
                <p>View the Pokémon that inhabit the location</p>
                </div>
                <div>
                <button onClick={() => navigate("/pokemon-encountered-by-location")}>Get Started</button>
                </div>
            </div>  
            </div>  */}

        </div>
    )
}