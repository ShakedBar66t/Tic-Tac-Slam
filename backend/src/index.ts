import cors from "cors";
import express from "express";

const app = express();
const port = 5001;

app.use(cors()); // Enable CORS middleware

app.get("/riddle", (req, res) => {
  const mockRiddle = {
    date: "2025-01-15",
    points: 0, // Initial points for the user
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

app.post("/validate", (req, res) => {
  const { player, row, col } = req.body;

  // Example criteria and valid answers
  const validPlayers = [
    ["LeBron James", "Kevin Durant", "Stephen Curry"],
    ["Kobe Bryant", "Michael Jordan", "Shaquille O'Neal"],
    ["Tim Duncan", "Dirk Nowitzki", "Giannis Antetokounmpo"],
  ];

  // Validate player name
  const isCorrect = validPlayers[row][col] === player;

  res.json({ valid: isCorrect });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
