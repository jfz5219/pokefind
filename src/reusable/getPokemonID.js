
// Ex: Get 20 from "https://pokeapi.co/api/v2/pokemon/20/"
export const getPokemonID = (url) => {
    const parts = url.split('/'); // Split the URL by '/'
    const lastId = parts[parts.length - 2]; // Get the second last element

return lastId
};