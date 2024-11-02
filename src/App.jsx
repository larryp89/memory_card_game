import "./App.css";
import { useState, useEffect } from "react";
import { shuffleArray } from "./utils";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import Modal from "./components/Modal";
import EndGameModal from "./components/EndGameModal";

function App() {
  const [allPokemonData, setAllPokemonData] = useState([]); // Store all Pokemon data
  const [pokemonData, setPokemonData] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedPokemon, setClickedPokemon] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const [cardCount, setCardCount] = useState(6); // Default to Easy
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

  // Set the difficulty level and update card count
  const handleDifficultyClick = (e) => {
    const newDifficulty = e.target.id;
    setDifficulty(newDifficulty);

    // Update card count based on new difficulty
    let newCardCount;
    switch (newDifficulty) {
      case "Easy":
        newCardCount = 6;
        break;
      case "Medium":
        newCardCount = 12;
        break;
      case "Hard":
        newCardCount = 18;
        break;
      case "Insane":
        newCardCount = 36;
        break;
      default:
        newCardCount = 6;
    }
    setCardCount(newCardCount);

    // Update displayed Pokemon based on new card count
    setPokemonData(
      allPokemonData.slice(0, newCardCount).map((pokemon) => ({
        ...pokemon,
        clicked: false,
      }))
    );

    setIsProcessing(false);
    closeModal();
  };

  // Check local storage for a best score
  useEffect(() => {
    const prevTopScore = JSON.parse(localStorage.getItem("prevTopScore"));
    if (prevTopScore) {
      setBestScore(prevTopScore);
    }
  }, []);

  // Batch update when a pokemon card is clicked
  useEffect(() => {
    if (clickedPokemon) {
      setIsProcessing(true);
      setScore((prevScore) => prevScore + 1);

      setFlipped((prevFlip) => !prevFlip);
      setTimeout(() => {
        setPokemonData((prevData) => shuffleArray(prevData));
        setFlipped((prevFlip) => !prevFlip);
        setIsProcessing(false);
      }, 1000);

      setClickedPokemon(null);
    }
  }, [clickedPokemon]);

  // Update best score
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("prevTopScore", JSON.stringify(score));
    }
  }, [score, bestScore]);

  useEffect(() => {
    if (score === cardCount) {
      setIsWinner(true);
    }
  }, [score, cardCount]);

  const handleClick = (pokemonName) => {
    if (isProcessing) return;
    setPokemonData((prevData) => {
      const updatedData = prevData.map((pokemon) => {
        if (pokemon.name === pokemonName) {
          if (pokemon.clicked) {
            setIsWinner(false);
            return pokemon;
          } else {
            setClickedPokemon(pokemonName);
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

  const getPokemonList = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  };

  const getPokemonDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const image = data.sprites.front_default;
    const name = data.name;
    const clicked = false;
    return { name, image, clicked };
  };

  // Initial data fetch - only runs once
  useEffect(() => {
    const fetchData = async () => {
      let pokemonCardData;
      // Retrieve any cashed data
      const cachedData = localStorage.getItem("pokemonData");
      // If there is cached data, parse it
      if (cachedData) {
        pokemonCardData = JSON.parse(cachedData);
      } else {
        // If there isn't, make API call and then set as local storag
        const list = await getPokemonList();
        pokemonCardData = await Promise.all(
          list.map(async (entry) => {
            return await getPokemonDetails(entry.url);
          })
        );
        localStorage.setItem("pokemonData", JSON.stringify(pokemonCardData));
      }

      setAllPokemonData(pokemonCardData); // Store all Pokemon data
      setPokemonData(pokemonCardData.slice(0, cardCount)); // Set initial display data
    };

    fetchData();
  }, []); // Empty dependency array - only runs once

  const resetAll = () => {
    // Reset using current cardCount but maintain order from allPokemonData
    setPokemonData(
      allPokemonData.slice(0, cardCount).map((pokemon) => ({
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
      <EndGameModal isWinner={isWinner} closeEndGameModal={closeEndGameModal} score={score} cardCount={cardCount} />
    </>
  );
}

export default App;
