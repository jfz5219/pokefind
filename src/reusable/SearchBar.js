import { useEffect, useState } from "react";

// import "./SearchBar.css";

export const SearchBar = ({ setFilteredList, all_pokemon_list, isLoading, isMounted}) => {
  const [input, setInput] = useState("");

  

  const findPokemon = (value) => {

        // Display all pokemon if input is none
        if (value.length !== 0) {
          console.log("yes")
          const results = all_pokemon_list.filter((pokemon) => {
            
            // This is for "Search Pokemon Location" bc the path to pokemon's name is different
            if (pokemon.pokemon_species !== undefined) {
              // Note to self: Don't create new pokemon variable, just manpulate 'pokemon' 
              // If you create new variable, it's not accessible outside
                pokemon = pokemon.pokemon_species
                
            } 

            // Only return if these conditions are meant
            return (
              value &&
              pokemon &&
              pokemon.name &&
              pokemon.name.toUpperCase().startsWith(value.toUpperCase())
            ); 
        });
          setFilteredList(results);
        } else {
          setFilteredList(all_pokemon_list)
        }
    

  };


  useEffect(()=>{

    let timer
    // if(input.trim() !== ""){
        isLoading(true)
        timer = setTimeout(()=>{
          isLoading(false)
          isMounted(true)
          console.log('search bar true')
          findPokemon(input)
        }, 600)
    // }
    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <div className="input-wrapper w-100">
      {/* <FaSearch id="search-icon" /> */}
      <input
        className="search-bar"
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
      />
    </div>
  );
};