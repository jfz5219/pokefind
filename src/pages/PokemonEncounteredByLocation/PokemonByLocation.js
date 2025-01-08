import React, { useEffect, useState } from 'react';
import KantoMap from '../../map/kanto_map.jpg'; 
import { ReactComponent as ClickableCoordinates } from '../../map/clickable_coordinates.svg';
import'../../css/map.css'; 
import '../../css/PokemonEncounteredByLocation.css'

import { useNavigate } from "react-router-dom";

function PokemonByLocation() {
  // Step 1: Set up state to store fetched data and loading state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const element = document.getElementById("map");

    // Event listener to handle clicks on the map
    const handleMapClick = async (event) => {
      if (event.target.tagName === 'rect' || event.target.tagName === 'path') {
        const location_id = event.target.getAttribute('id');

        const res = await fetch('https://pokeapi.co/api/v2/location/' + location_id)

        if (!res.ok) {
          throw Error('Could not find the location.')
        }
        const location_info = await res.json(); // Parse the response
        const location_name = location_info.name;


        navigate(`/pokemon-encountered-by-location/${location_name}`);
      }
    };

    // Add the event listener when the component mounts
    document.getElementById('map').addEventListener('click', handleMapClick);

    // Cleanup the event listener when the component unmounts
    return () => {

    // If element still exist (should have unmounted if properly navgiated to the new page) after the handleMapClick, then remove the event listener.
    if (element) {
      element.removeEventListener("click", handleMapClick);
    }
    };
  }, []); // Empty dependency array ensures the listener is added only once

  return (
    <div className='text-center  mt-5'>
{/*         
        <div className="map-container">
            <img src={KantoMap} alt="Responsive Image" className="map-image"/>
            <ClickableCoordinates id='map' className="map-svg clickable" />
        </div> */}
        <h1 className='mb-4'>Pokémon Encountered by Location</h1>
        <div className='maps-outer-container .map-background secondary-color light-shadow'>
              <div className='container'>
                  <div className="map-container">
                      <p className='map-title'>Kanto Region</p>
                      <img src={KantoMap} alt="Responsive Image" className="map-image"/>
                      <ClickableCoordinates id='map' className="map-svg clickable" />
                  </div>
                  
              </div>

        </div>
        <p className='mt-2 opacity-75'>Click on various locations and discover the Pokémon that inhabit each area</p>

    </div>
  );
}

export default PokemonByLocation;

