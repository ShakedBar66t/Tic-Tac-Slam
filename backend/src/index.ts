import cors from "cors";
import express, { Application, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend requests
    methods: "GET,POST", // Allow only necessary HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
  })
);
app.use(express.json()); // Allow JSON request body

// 🏀 **Existing Route: Get Riddle (Unchanged)**
app.get("/riddle", (req, res) => {
  const mockRiddle = {
    date: "2025-01-15",
    points: 0,
    rowCriteria: [
      "https://res.cloudinary.com/drld1bejg/image/upload/v1737381308/Tic-Tac-Slam/OKCThunder_d8iljb.png",
      "https://res.cloudinary.com/drld1bejg/image/upload/v1737381363/Tic-Tac-Slam/ATLHawks_ru3xbb.png",
      "https://res.cloudinary.com/drld1bejg/image/upload/v1737381485/Tic-Tac-Slam/TORaptors_g8nlnv.png",
    ],
    colCriteria: [
      "https://res.cloudinary.com/drld1bejg/image/upload/v1737381693/Tic-Tac-Slam/LALakers_oy3y3j.jpg",
      "https://res.cloudinary.com/drld1bejg/image/upload/v1737382128/Tic-Tac-Slam/CLVCavs-removebg-preview_x06ps4.png",
      "https://res.cloudinary.com/drld1bejg/image/upload/v1737382038/Tic-Tac-Slam/GWState-removebg-preview_xctr4c.png",
    ],
    grid: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  };

  res.json(mockRiddle);
});

// 🏀 **Existing Route: Validate Player Selection (Unchanged)**
app.post("/validate", (req, res) => {
  const { player, row, col } = req.body;

  const validPlayers = [
    ["LeBron James", "Kevin Durant", "Stephen Curry"],
    ["Kobe Bryant", "Michael Jordan", "Shaquille O'Neal"],
    ["Tim Duncan", "Dirk Nowitzki", "Giannis Antetokounmpo"],
  ];

  const isCorrect = validPlayers[row][col] === player;
  res.json({ valid: isCorrect });
});

// 🏀 **New Route: Fetch NBA Players (Fixes CORS Issue)**
app.get("/api/players", async (req: Request, res: Response): Promise<void> => {
  try {
    const searchQuery = req.query.search as string | undefined;
    if (!searchQuery) {
      res.status(400).json({ message: "Missing search query" });
      return;
    }

    // ✅ Load API key from .env
    const apiKey = process.env.BALDONTLIE_API_KEY;
    if (!apiKey) {
      res.status(500).json({ message: "API Key is missing" });
      return;
    }

    console.log("Using API Key:", apiKey); // Debugging to ensure key is loaded

    const response = await axios.get("https://api.balldontlie.io/v1/players", {
      params: { search: searchQuery },
      headers: { Authorization: apiKey }, // Fix: No 'Bearer' needed
    });

    res.json(response.data);
  } catch (error: any) {
    if (error.response) {
      console.error("🔴 API Error Response Data:", error.response.data);
      console.error("🔴 API Error Status:", error.response.status);
      console.error("🔴 API Error Headers:", error.response.headers);
      res.status(error.response.status).json({ message: "Failed to fetch players", details: error.response.data });
    } else {
      console.error("🔴 API Request Failed:", error.message);
      res.status(500).json({ message: "Failed to fetch players", details: error.message });
    }
  }
});


// Start the backend server
app.listen(port, () => {
  console.log(`✅ Backend running at http://localhost:${port}`);
});
