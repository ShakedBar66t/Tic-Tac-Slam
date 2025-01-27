import React, { useState, useEffect } from "react";
import { searchPlayers } from "../services/nbaApi";

interface PlayerSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlayer: (player: string) => void;
}

const PlayerSearchModal: React.FC<PlayerSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPlayer,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!searchQuery.trim()) {
        setPlayers([]);
        return;
      }
  
      const results = await searchPlayers(searchQuery);
      setPlayers(results); // Update the players list
    };
  
    fetchPlayers();
  }, [searchQuery]);
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <input
          type="text"
          placeholder="Search for a player..."
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul className="max-h-48 overflow-y-auto">
          {players.map((player) => (
            <li
              key={player.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelectPlayer(player.first_name + " " + player.last_name);
                onClose();
              }}
            >
              {player.first_name} {player.last_name} - {player.team.full_name}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PlayerSearchModal;
