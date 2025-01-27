import React, { useState } from "react";
import PlayerSearchModal from "./PlayerSearchModal"; // Import the modal component

interface GameGridProps {
  riddle: {
    points: number; // User's points
    colCriteria: string[]; // URLs for column criteria images
    rowCriteria: string[]; // URLs for row criteria images
    grid: (string | null)[][]; // The grid itself
  };
  onSubmitGuess: (row: number, col: number, guess: string) => void; // Function to handle guess submission
}

const GameGrid: React.FC<GameGridProps> = ({ riddle, onSubmitGuess }) => {
  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    setIsModalOpen(true);
  };

  const handlePlayerSelect = (player: string) => {
    if (selectedCell) {
      onSubmitGuess(selectedCell.row, selectedCell.col, player);
    }
    setSelectedCell(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Grid Layout */}
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)", // 4 equal columns (including points and criteria)
        }}
      >
        {/* Points Cell */}
        <div
          className="flex items-center justify-center rounded-lg font-bold text-lg text-blue-600"
          style={{ aspectRatio: "1 / 1" }} // Makes the cell square
        >
          Points: <span className="ml-2 ">{riddle.points}</span>
        </div>

        {/* Column Criteria */}
        {riddle.colCriteria.map((imgUrl: string, index: number) => (
          <div
            key={index}
            className="flex justify-center items-center rounded-lg"
            style={{ aspectRatio: "1 / 1" }} // Makes the cell square
          >
            <img
              src={imgUrl}
              alt={`Column ${index + 1}`}
              className="h-24 w-24 object-contain"
            />
          </div>
        ))}

        {/* Row Criteria and Grid Rows */}
        {riddle.grid.map((row: (string | null)[], rowIndex: number) => (
          <React.Fragment key={rowIndex}>
            {/* Row Criteria */}
            <div
              className="flex justify-center items-center rounded-lg"
              style={{ aspectRatio: "1 / 1" }} // Makes the cell square
            >
              <img
                src={riddle.rowCriteria[rowIndex]}
                alt={`Row ${rowIndex + 1}`}
                className="h-24 w-24 object-contain"
              />
            </div>

            {/* Grid Cells */}
            {row.map((cell: string | null, colIndex: number) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`bg-white border border-gray-300 rounded-lg shadow-md flex items-center justify-center text-lg font-semibold ${
                  selectedCell?.row === rowIndex &&
                  selectedCell?.col === colIndex
                    ? "bg-blue-300"
                    : "hover:bg-blue-100"
                }`}
                style={{ aspectRatio: "1 / 1" }} // Makes the cell square
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell || ""}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Player Search Modal */}
      <PlayerSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectPlayer={handlePlayerSelect}
      />
    </div>
  );
};

export default GameGrid;
