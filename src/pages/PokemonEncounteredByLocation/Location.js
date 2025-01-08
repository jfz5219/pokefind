import { useLoaderData, useParams, useLocation } from 'react-router-dom'
import PokemonInArea from './PokemonInArea';
import { useState, useEffect } from 'react';
import KantoMap from '../../map/kanto_map.jpg'
import {ReactComponent as ClickableCoordinates} from "../../map/clickable_coordinates.svg"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import {formatString} from '../../reusable/FormatString'

import "../../css/map.css"
import "../../css/PokemonEncounteredByLocation.css"
import "../../css/EvolutionChain.css"

import {getLocationAreaID} from "../../reusable/getLocationAreaID"


export default function Location() {
  const location = useLoaderData()
  const [activeBtn, setActiveBtn] = useState();

  // Data for first area in location, but if there's no areas, then there's no data 
  const [area_data, setAreaData] = useState(location.areas[0] || [])

  useEffect(() => {
     // First area listed in the location will be shown

     const location_svg = document.getElementById(location.id)
      if (location_svg) {
        location_svg.classList.add('flash-color-deactive')
      }

      // Only activate btn(first btn) if there are areas in the location 
      if (area_data.url) {
          const location_area_id = getLocationAreaID(area_data.url)
          setActiveBtn(location_area_id)
      } 

  });

  // Only one area location can be active to show that area's pokemon
  const activateButton = (location_area_id) =>{
    // Set button to be active style
    setActiveBtn(location_area_id)
  }

  console.log(area_data)
  return (
    <div className='mt-5'>
        
        <h1 className='text-center'>{formatString(location.name)}</h1>
        <div className='light-shadow'>
            <div className='pokemon-by-location secondary-color'>
                <div className='map-container'>
                    <ClickableCoordinates id='map' className="map-svg" />
                    <img src={KantoMap} alt="kanto map"/>
                </div>
            </div>
            
            {/* If there's an area, then display info */}
            {location.areas.length  !== 0 ? (
                  <div className='location-area-container evolution-container forth-color'>
                      <div className={location.areas.length === 1 ?  "one container flex-column":"many container flex-column"}>
                          <div className='mb-1 d-flex flex-column align-items-start'>
                              <h4>Pokemon Located in {formatString(area_data.name)}</h4>
                              <div className='d-flex'>
                                  <p className='opacity-75'>Areas within {formatString(location.name)}</p>
                                  <OverlayTrigger key='top' placement='top'overlay={
                                      <Tooltip id='tooltip'>
                                        Each location may have sections of areas, such as floors in a building or cave. Each area has its own set of possible Pokémon encounters.
                                      </Tooltip>
                                  }>
                                      <Button variant="secondary" className='question-icon mx-2 opacity-75'>
                                          <span>?</span>
                                      </Button>
                                  </OverlayTrigger>
                              </div>
                          </div>

                        <div className='area-btn-container'>
                      {location.areas.map((area) => 
                        {
                          // example url:"https://pokeapi.co/api/v2/location-area/298/"
                          const location_area_id = getLocationAreaID(area.url)
                          return (
                            
                            <button key={location_area_id} onClick={(e) => {
                                activateButton(location_area_id)
                                setAreaData(area)
                              }} className={activeBtn === location_area_id ? "location-area-btn active" : "location-area-btn"}>
                                {formatString(area.name)}
                            </button>
                          );
                        })}
                        </div>
                      </div>

                      <PokemonInArea area_data={area_data || []} />
                  </div>

                  ) : (
                      <div className='evolution-container secondary-color'>
                        <p>Pokemon is not attainable within this location</p>
                      </div>
              )}
        </div>
    </div>
  )
}

export const locationLoader = async ({ params }) => {
    const { location_name } = params
  
    try {

      const res = await fetch('https://pokeapi.co/api/v2/location/' + location_name)
      // Fully wait for the json response to be available before returning
      const res_json = await res.json()

      return res_json
      
    } catch (err) {
      const error = new Error(`Could not find the location, ${location_name}.`)
      error.url = "/pokemon-encountered-by-location"
      error.page_name = "Encounter Map"
      throw error

    }

}