import "./App.css";
import { useState, useEffect } from "react";
import { shuffleArray } from "./utils";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import Modal from "./components/Modal";
import EndGameModal from "./components/EndGameModal";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const [cardCount, setCardCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWinner, setIsWinner] = useState(null);

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeEndGameModal = () => {
    setIsProcessing(true);
    resetAll();
  };

  // Set the difficulty level
  const handleDifficultyClick = (e) => {
    setDifficulty(e.target.id);
    setIsProcessing(false);
    closeModal();
  };

  // Update card count based on difficulty
  useEffect(() => {
    if (difficulty === "Easy") {
      setCardCount(6);
      // resetAll();
    } else if (difficulty === "Medium") {
      setCardCount(12);
      // resetAll();
    } else if (difficulty === "Hard") {
      setCardCount(18);
      // resetAll();
    } else if (difficulty === "Insane") {
      setCardCount(36);
      // resetAll();
    }
  }, [difficulty]);

  // Check local storage for a best score
  useEffect(() => {
    // Get any previous top score from local storage
    const prevTopScore = JSON.parse(localStorage.getItem("prevTopScore"));

    if (prevTopScore) {
      setBestScore(prevTopScore);
    }
  }, []);

  // Batch update when a pokemon card is clicked
  useEffect(() => {
    if (clickedPokemon) {
      setIsProcessing(true); // Prevent further clicks while processing
      setScore((prevScore) => prevScore + 1);

      // Flip all cards and shuffle
      setFlipped((prevFlip) => !prevFlip);
      setTimeout(() => {
        setPokemonData((prevData) => shuffleArray(prevData));
        setFlipped((prevFlip) => !prevFlip); // Reset flipped back after 1 second
        setIsProcessing(false); // Allow clicks again
      }, 1000);

      // Reset clickedPokemon after processing
      setClickedPokemon(null);
    }
  }, [clickedPokemon]);

  // Update best score
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("prevTopScore", JSON.stringify(score));
    }
  }, [score]);

  useEffect(() => {
    if (score === cardCount) {
      setIsWinner(true);
    }
  });

  // Logic for checking if a new pokemon was clicked and updating clicked to true
  const handleClick = (pokemonName) => {
    if (isProcessing) return;
    setPokemonData((prevData) => {
      const updatedData = prevData.map((pokemon) => {
        if (pokemon.name === pokemonName) {
          if (pokemon.clicked) {
            setIsWinner(false);
            return pokemon;
          } else {
            setClickedPokemon(pokemonName); // Set to trigger score update in useEffect
            return { ...pokemon, clicked: true };
          }
        }
        return pokemon;
      });

      return updatedData;
    });
  };

  const resetScoreBoard = () => {
    setScore(0);
  };

  // Get first 50 pokemon list data from API
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

  // For each pokemon, get data from local storage or fetch from API and set for pokemonCardData
  useEffect(() => {
    // Have to have a function within useEffect as cannot use await directly in useEffect
    const fetchData = async () => {
      // Attempt to get any cached data from local storage
      const cachedData = localStorage.getItem("pokemonData");
      // If there's cached data, use it to set the state
      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setPokemonData(parsedData.slice(0, cardCount)); // Limit to card count
        // Otherwise
      } else {
        // Fetch list of pokemon data from the API
        const list = await getPokemonList();
        // Use Promise.all to wait for all t  he asynchronous operations to finish.
        const pokemonCardData = await Promise.all(
          // Must use anonymous async function in order to then use await
          list.map(async (entry) => {
            // For each entry, return the object via getPokemonDetails
            return await getPokemonDetails(entry.url);
          })
        );
        setPokemonData(pokemonCardData);
        localStorage.setItem("pokemonData", JSON.stringify(pokemonCardData));
        setPokemonData(pokemonCardData.slice(0, cardCount)); // Limit to card count
      }
    };

    fetchData();
  }, [cardCount]);

  // Reset all "clicked" to false
  const resetAll = () => {
    setPokemonData((prevData) =>
      // Set new data to previous data but copy each pokemon, updating clicked to false
      prevData.map((pokemon) => ({
        ...pokemon,
        clicked: false,
      }))
    );
    resetScoreBoard();
    setFlipped(false);
    setIsModalOpen(true);
    setIsWinner(null);
  };

  return (
    <>
      <Header />
      <Modal
        handleDifficultyClick={handleDifficultyClick}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        text="Select a difficulty:"
      />
      <div className="game-area">
        <GameBoard
          pokemonData={pokemonData}
          handleClick={handleClick}
          resetBoard={resetAll}
          score={score}
          bestScore={bestScore}
          flipped={flipped}
        />
      </div>
      <EndGameModal isWinner={isWinner} closeEndGameModal={closeEndGameModal} />
    </>
  );
}

export default App;
