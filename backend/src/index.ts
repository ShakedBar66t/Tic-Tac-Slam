import cors from "cors";
import express from "express";

const app = express();
const port = 5001;

app.use(cors()); // Enable CORS middleware

app.get("/riddle", (req, res) => {
    const mockRiddle = {
        date: "2025-01-15",
        criteria: ["Team A", "Team B", "MVPs"],
        grid: [
            ["LeBron James", "Shaked Barsheshet", "Stephen Curry"],
            ["Kobe Bryant", "Michael Jordan", "Shaquille O'Neal"],
            ["Tim Duncan", "Dirk Nowitzki", "Giannis Antetokounmpo"],
        ],
    };

    res.json(mockRiddle);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
