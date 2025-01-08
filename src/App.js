import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider } from 'react-router-dom';

// Pages
import PokemonByLocation from './pages/PokemonEncounteredByLocation/PokemonByLocation.js';
import SearchPokemonLocation from './pages/FindPokemonLocation/SearchPokemonLocation.js';
import PokemonLocation, {pokemonLocationLoader} from './pages/FindPokemonLocation/PokemonLocation.js';
import NotFound from './pages/NotFound.js';
import Home from './pages/Home.js';
import Location, {locationLoader} from './pages/PokemonEncounteredByLocation/Location.js'
import PokedexPokemonPage from './pages/Pokedex/PokedexPokemonPage.js';
import Pokedex, {pokedexLoader} from './pages/Pokedex/Pokedex.js'
// import PokemonInArea, {pokemonInAreaLoader} from './pages/PokemonInArea.js';

// Layout
import RootLayout from './skeleton/RootLayout.js'


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>

//           <Route index element={<Home />} />

//           <Route path='pokemon-encountered-by-location' element={<PokemonByLocation />}>
//           </Route>

//           <Route path="/pokemon-encountered-by-location/:location_name" element={<Location />} loader={locationLoader}>
//           </Route>
          
//           <Route path='search-pokemon-location' element={<SearchPokemonLocation />} />

//           <Route path='search-pokemon-location/:pokemon_id' element={<PokemonLocation />} loader={pokemonLocationLoader}/>
          
//           <Route path='pokedex' element={<Pokedex />} loader={pokedexLoader}/>

//           <Route path='pokedex/:pokemon_name' element={<PokedexPokemonPage />} />

//           <Route path="*" element={<NotFound />} />
          
//     </Route>
//   )
// );

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, 
    children: [
      {path: '', element: <Home /> },
      {path: 'pokemon-encountered-by-location', element: <PokemonByLocation />},
      {path: 'pokemon-encountered-by-location/:location_name', element: <Location />, loader: locationLoader,  errorElement:<NotFound/>},
      {path: 'search-pokemon-location', element: <SearchPokemonLocation />},
      {path: 'search-pokemon-location/:pokemon_id', element: <PokemonLocation />, loader: pokemonLocationLoader,  errorElement:<NotFound/>},
      {path: 'pokedex', element: <Pokedex />, loader: pokedexLoader ,  errorElement:<NotFound/>},
      {path: 'pokedex/:pokemon_name', element: <PokedexPokemonPage />, errorElement:<NotFound/>},
      {path: "*", element: <NotFound/>}
    ],
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
