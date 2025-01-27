import React, { useEffect, useState } from "react";
import axios from "axios";
import GameGrid from "./components/GameGrid";

interface Riddle {
  points: number;
  colCriteria: string[];
  rowCriteria: string[];
  grid: (string | null)[][];
}

const App: React.FC = () => {
  const [riddle, setRiddle] = useState<Riddle | null>(null);

  // Fetch the riddle data from the backend
  const fetchRiddle = async () => {
    try {
      const response = await axios.get("http://localhost:5001/riddle");
      setRiddle(response.data);
    } catch (error) {
      console.error("Error fetching riddle:", error);
    }
  };

  useEffect(() => {
    fetchRiddle();
  }, []);

  // Handle guess submission
  const handleGuessSubmit = (row: number, col: number, guess: string) => {
    if (riddle) {
      const updatedGrid = [...riddle.grid];
      updatedGrid[row][col] = guess;

      // Example: Add points if the guess is correct
      const correctAnswer = true; // Replace with actual validation logic
      const updatedPoints = correctAnswer ? riddle.points + 10 : riddle.points;

      setRiddle({ ...riddle, grid: updatedGrid, points: updatedPoints });
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
        Tic-Tac-Slam
      </h1>
      {riddle ? (
        <GameGrid riddle={riddle} onSubmitGuess={handleGuessSubmit} />
      ) : (
        <p className="text-center text-gray-500">Loading today's riddle...</p>
      )}
    </div>
  );
};

export default App;
