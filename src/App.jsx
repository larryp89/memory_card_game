import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import GameBoard from "./components/GameBoard";

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  // Must define an async function as using await
  const getPokemonList = async () => {
    // Await the promise from fetch, which returns the response object
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    // Check if the response is okay (status in the range 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Extract the JSON data (returned as a promise) from the response object
    const data = await response.json();
    // Return only the results array from the data object, which contains the Pokémon
    return data.results;
  };

  // Returns the name and image for url
  const getPokemonDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const image = data.sprites.front_default;
    const name = data.name;
    const clicked = false;
    return { name, image, clicked };
  };

  useEffect(() => {
    // Have to have a function within useEffect as cannot use await in useEffect
    const fetchData = async () => {
      // Attempt to get any cahced data from local storage
      const cachedData = localStorage.getItem("pokemonData");
      // If there's cached data, use it to set the state
      if (cachedData) {
        setPokemonData(JSON.parse(cachedData));
        // Otherwise
      } else {
        // Fetch list of pokemon data from the API
        const list = await getPokemonList();
        // Use Promise.all to wait for all the asynchronous operations to finish.
        const pokemonCardData = await Promise.all(
          // Note that must use async anonymous function in order to then use await
          list.map(async (entry) => {
            // For each entry, return the object via getPokemonDetails
            return await getPokemonDetails(entry.url);
          })
        );
        setPokemonData(pokemonCardData);
        localStorage.setItem("pokemonData", JSON.stringify(pokemonCardData));
      }
    };

    fetchData();
  }, []);

  const checkIfClicked = (pokemonName) => {
    pokemonData.map((pokemon) => {
      // If the pokemon name equals pokemon name
      if (pokemon.name === pokemonName) {
        if (pokemon.clicked) console.log(pokemon.clicked);
        else {
          console.log(pokemon.clicked);
        }
      }
    });
  };

  // Reset each clicked to false
  const resetAll = () => {
    setPokemonData((prevData) =>
      // Set new data to previous data but copy each pokemon, updating clicked to false
      prevData.map((pokemon) => ({
        ...pokemon,
        clicked: false,
      }))
    );
  };

  // Change clicked from false to true if the class is clicked
  const handleClick = (pokemonName) => {
    checkIfClicked(pokemonName);
    setPokemonData((prevData) =>
      prevData.map((pokemon) =>
        pokemon.name === pokemonName
          ? { ...pokemon, clicked: !pokemon.clicked }
          : pokemon
      )
    );
  };

  return (
    <GameBoard
      pokemonData={pokemonData}
      setPokemonData={setPokemonData}
      handleClick={handleClick}
      resetBoard={resetAll}
    />
  );
}

export default App;
