import { useLoaderData, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Overlay from 'react-bootstrap/Overlay';
import'../../css/map.css'; 
import KantoMap from '../../map/kanto_map.jpg'; 
import PinIcon from '../../map/map_pin_icon.png'
import Loading from '../Loading';
import { ReactComponent as ClickableCoordinates } from '../../map/clickable_coordinates.svg';
import { EvolutionChainLocation } from './EvolutionChainLocation';
import Accordion from 'react-bootstrap/Accordion';
import { formatString } from '../../reusable/FormatString';

export default function Location() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true)
    const location = useLocation();
    const { pokemon_id } = useParams()
    const [pokemon, setPokemon] = useState(null);
    const [locations_details, setLocationDetails] = useState(null)
    const [sevii_details, setSeviiDetails] = useState(null);
    const [show, setShow] = useState(false);
    const [offcanvas_detail, setOffcanvasDetail] = useState(null)

    const locations_details_ref = useRef(locations_details); 

    // const map_location_target = useRef(null);
    const [map_icon_target, setMapIconLocation] = useState(null);
    const [map_icon_show, setMapIconShow] = useState(false);

    const location_to_areas = useLoaderData()

    
    const handleLocationClick = (e, locationId) => {      
        const details = locations_details_ref.current
        const location_detail = details.find(location => location.id === locationId)
        setOffcanvasDetail(location_detail)
        setMapIconLocation(e.target)
        setShow(true)
        setMapIconShow(true)
        
      
      };

    const handleClose = () => {      

        setShow(false);
    
      };

    // setTimeout will start at the same time as useEffect, once the page rendering is completed
    // (svgs are loaded for highlighted map loctions), then make page content visible
    setTimeout(() =>
      setLoading(false)   
    , 1000)

    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_id}`);
            const pokemon_data = await response.json();
            setPokemon(pokemon_data);
            console.log(pokemon_data.id)

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }

        fetchData();
        
        const locations_details = []
        const sevii_island = []
        location_to_areas.forEach(location =>{
            // Add event handler to map locations
            const map_location = document.getElementById(location.id);
            console.log(map_location)
            if (map_location) {
              map_location.setAttribute('trigger', `trigger="click"`);
              map_location.style.cursor = 'pointer';
              map_location.onclick = (e) => handleLocationClick(e,location.id);
              locations_details.push(location)
              map_location.classList.add('flash-color');
          }
            else{
              locations_details.push(location)
              sevii_island.push(location)
            }
        })

          setLocationDetails(locations_details)

          // Because of how React works, the way I attached handleLocationClick to the map locations don't 
          // allow locations_details to be accessed. Even tho you can setStuff within the handler and be able 
          // to re-render with the  updated locations_details, you still can't access the setted variable
          locations_details_ref.current = locations_details;
          setSeviiDetails(sevii_island)
        

          return () => {

              const childrenWithClass = document.querySelectorAll(`.flash-color`);

              // reset map
              childrenWithClass.forEach(child => {
                  child.classList.remove(`flash-color`)
                  child.style.cursor = 'default'
            });
            document.removeEventListener('click', handleLocationClick);
            setMapIconShow(false)
            setLoading(true)
      
          };

      }, [pokemon_id]);

    return (

        <div className='mt-5'>

        {isLoading && <Loading/>}

        <div className={isLoading && "d-none"} >
            
            <div>
                {pokemon && <h1 className='text-center mt-4'>{JSON.stringify(pokemon.name).replace(/"/g, '')}</h1>}
            </div>

            <div className='maps-outer-container .map-background secondary-color light-shadow'>
                <div className='container'>
                    <div className="map-container">
                        <div className='pokemon-map-img'>
                            {pokemon && 
                            
                            <img 
                            onClick={()=>{
                              navigate(`/pokedex/${pokemon.name}`, {state:{previousLocationPathname: location.pathname}})
                          }} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${pokemon.id}.png`}  alt="image of pokemon"/>
                          
                          }
                        </div>
                        <p className='map-title'>Kanto Region</p>
                        <img src={KantoMap} alt="Responsive Image" className="map-image"/>
                        <ClickableCoordinates id='map' className="map-svg" />
                    </div>
                    
                    {sevii_details && sevii_details.length > 0 ? 
                        <div className='sevii-container'> 
                            {/* <img src={SeviiIsland} alt="Responsive Image" className="map-image"/> */}
                            <p className='map-title'>Sevii Island</p>
                            {sevii_details.map((location) => {
                                return (
                                    <Button variant="primary"  id={`sevii-${location.id}`} key={`location-${location.id}`} 
                                        onClick={(e) => handleLocationClick(e,location.id)} className=''>
                                        {location.name}
                                    </Button>
                                );
                            })} 
                        </div>
                    :<div className='map-container'></div>}
                </div>

            </div>

            
            {offcanvas_detail ? 
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title><h4>{offcanvas_detail.name}</h4></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {offcanvas_detail.areas_detail.map(area => {return (<Accordion className='mb-4'>
                            <div className='fw-bold'>{area.name}</div>
                            <div className='mb-2'>total encounter potential: <span className='fw-semibold'>{area.max_chance}%</span></div>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>encounter details</Accordion.Header>
                                  <Accordion.Body className='py-2'>
                                      {area.encounter_details.map(encounter => {return(
                                      <div className='py-2'>
                                        <p>encounter chance: <span className='fw-semibold'>{encounter.chance}%</span></p>
                                        <p>max level: <span className='fw-semibold'>{encounter.max_level}</span></p>
                                        <p>method: <span className='fw-semibold'>{encounter.method.name}</span></p>
                                        <ul style={{ padding: "0rem" }} >condition values: {encounter.condition_values.length === 0  ? 
                                            <ul><li><span className='fw-semibold'>none</span></li></ul>:encounter.condition_values.map(condition => {return(<li><span className='opacity-100'>{condition.name}</span></li>)})}
                                        </ul>
                                      </div>
                                      )})}
                                      
                                  </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>)})}
                        
                    </Offcanvas.Body>
                </Offcanvas>
            :null}

          <Overlay target={map_icon_target} show={map_icon_show} placement="top">
                  {({
                    placement: _placement,
                    arrowProps: _arrowProps,
                    show: _show,
                    popper: _popper,
                    hasDoneInitialMeasure: _hasDoneInitialMeasure,
                    ...props
                  }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                      }}
                    >
                        <img src={PinIcon} alt="Responsive Image" className="pin-icon"/>

                    </div>
                  )}
          </Overlay>


            {pokemon && <EvolutionChainLocation pokemon_name={pokemon.name} evolution_chain_url={pokemon.evolution_chain.url} from_location_page={true} />} 

        </div>

        </div>
    )
}


export const pokemonLocationLoader = async ({ params }) => {

    const { pokemon_id } = params
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon_id +'/encounters')

      const location_areas = await res.json()
  
      const areas_detail = [];
     // Find areas in firered that the specific pokemon appears in and get pokemon's encounter detail of that area
      location_areas.map(area => {
  
          const encounter_details = area.version_details.find(each_version => each_version.version.name === "firered")
          if (typeof encounter_details !== 'undefined') {     
            areas_detail.push({
                  name: formatString(area.location_area.name),
                  url: area.location_area.url,
                  encounter_details:encounter_details.encounter_details,
                  max_chance: encounter_details.max_chance,
                  version: encounter_details.version
              });
          }
  
      })
    
      // if (!res.ok) {
      //   throw Error('Could not find the pokemon.')
      // }
    
      return fetchLocationFromAreaUrls(areas_detail)
      
    } catch (err) {

      const error = new Error(`Pokemon "${pokemon_id}" not found.`);
      error.url = "/search-pokemon-location";  // Attach a URL or any other custom data
      error.page_name = "Locate Pokemon"
      throw error;
    }
    
}

// Get location ids from location_area urls and since each location can have multiple urls
// organize them to a dictionary ex: {[location: area, area], [location: area]}
async function fetchLocationFromAreaUrls(areas_detail) {

  try {
    
      // Ex: {[88_kanto-1: 295_kanto-1-area details, 295_kanto-1-area details], [25_kanto-17: 118_kanto-area-17 details]}
      const location_to_areas = [];

      // Make sure all API calls are dealt with before proceeding
      await Promise.all(

      // Get location from each location_area_url
      areas_detail.map(async (area_detail) => {       
        
          const response = await fetch(area_detail.url);
          if (!response.ok) {
              throw new Error(`Error fetching data from ${area_detail.url}: ${response.statusText}`);
          }
          const location_area = await response.json();
          
          // Ex: Get location_id of 95 from url (https://pokeapi.co/api/v2/location/95/)
          const location_id = location_area.location.url.match(/\/(\d+)\/?$/)[1];
          const location_name = location_area.location.name
          // Output ex: 88_kanto-route-1
          // const location_id_name = location_id + "_" + location_name

          // If location id already exist in location_to_areas array, that means we're
          // trying to pass another area detail to this location and this location has multiple areas
          const location = Object.values(location_to_areas).find(location => location.id === location_id);
          if (location) {
            location.areas_detail.push(area_detail)
          }
          else{
            location_to_areas.push({ id: location_id, name: formatString(location_name), areas_detail: [area_detail] })
          }
      })
      );
      
    return location_to_areas; // You can return the results to use elsewhere
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
