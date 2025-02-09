import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "../hooks/useDebounce";

// Define interfaces for TypeScript
interface Player {
  id: number;
  first_name: string;
  last_name: string;
  team: { full_name: string };
}

interface PlayerSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlayer: (player: string) => void;
}

// Custom hook for fetching players
const useFetchPlayers = (searchQuery: string) => {
  return useQuery({
    queryKey: ["players", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      const { data } = await axios.get("http://localhost:5001/api/players", {
        params: { search: searchQuery },
      });
      return data?.data || [];
    },
    enabled: !!searchQuery.trim(), // Prevents execution if query is empty
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
  });
};

// Extracted player list component
const PlayerList: React.FC<{
  players: Player[];
  onSelect: (player: string) => void;
}> = ({ players, onSelect }) => (
  <ul className="max-h-48 overflow-y-auto">
    {players.length > 0 ? (
      players.map((player) => (
        <li
          key={player.id}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(`${player.first_name} ${player.last_name}`)}
        >
          {player.first_name} {player.last_name}
        </li>
      ))
    ) : (
      <p className="text-gray-500 text-sm text-center mt-2">No results found</p>
    )}
  </ul>
);

const PlayerSearchModal: React.FC<PlayerSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPlayer,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 500);
  const { data: players = [], isLoading, error } = useFetchPlayers(debouncedSearch);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-3">Search NBA Players</h2>
        <input
          type="text"
          placeholder="Type player name..."
          className="border border-gray-300 rounded-lg p-2 w-full mb-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">Failed to fetch players. Try again.</p>}
        {isLoading && <p className="text-gray-500 text-sm mb-2">Loading players...</p>}

        <PlayerList players={players} onSelect={(player) => { onSelectPlayer(player); onClose(); }} />

        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PlayerSearchModal;
