import axios from "axios";

const API_KEY = 'f12c0cfbc3msh88d8c4db5479d59p198a97jsndc8292a4e988'; // Replace with your key
const API_HOST = "free-nba.p.rapidapi.com";

export const searchPlayers = async (query: string) => {
  if (!query.trim()) return [];
  const options = {
    method: "GET",
    url: `https://${API_HOST}/players`,
    params: {
      search: query, // Use the search query
      per_page: "10", // Limit to 10 results
    },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data; // Return the array of players
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
};
