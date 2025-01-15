import React, { useEffect, useState } from "react";
import axios from "axios";

const App: React.FC = () => {
    const [riddle, setRiddle] = useState<any>(null);

    useEffect(() => {
        axios.get("http://localhost:5001/riddle").then((response) => {
            setRiddle(response.data);
        });
    }, []);

return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
                Tic-Tac-Slam
            </h1>
            {riddle ? (
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                    {riddle.grid.map((row: string[], rowIndex: number) =>
                        row.map((cell: string, colIndex: number) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className="bg-white border border-gray-300 p-6 rounded-lg shadow-md flex items-center justify-center text-lg font-semibold text-gray-700 hover:bg-blue-100 transition"
                            >
                                {cell}
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}
        </div>
    );
};

export default App;
