export const getLocationAreaID = (url) => {
        // example url:"https://pokeapi.co/api/v2/location-area/298/"
        // get 298
        const location_area_id = url.match(/\/(\d+)\/$/)[1];

    return location_area_id
};