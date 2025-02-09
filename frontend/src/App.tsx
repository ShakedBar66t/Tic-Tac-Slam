import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GameGrid from "./components/GameGrid";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useFetchRiddle } from "./hooks/useFetchRiddle";

// Initialize React Query Client (Move it here, outside the component)
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

// Separate the app logic into a new component to ensure QueryClientProvider is applied first
const AppContent: React.FC = () => {
  const { data: riddle, isLoading, error } = useFetchRiddle();

  const handleGuessSubmit = (row: number, col: number, guess: string) => {
    if (riddle) {
      const updatedGrid = [...riddle.grid];
      updatedGrid[row][col] = guess;

      // Example: Add points if the guess is correct
      const correctAnswer = true; // Replace with actual validation logic
      const updatedPoints = correctAnswer ? riddle.points + 10 : riddle.points;

      riddle.grid = updatedGrid;
      riddle.points = updatedPoints;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 p-6">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading today's riddle...</p>
        ) : error ? (
          <p className="text-center text-red-500">Failed to load riddle.</p>
        ) : (
          <GameGrid riddle={riddle} onSubmitGuess={handleGuessSubmit} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
