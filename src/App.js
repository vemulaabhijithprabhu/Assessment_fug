import React, { useState, useEffect } from 'react';
import './App.css';

function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F3FF33', '#33FFF3', '#FF9633'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function Grid() {
    const rows = 15;
    const cols = 20;
    const [cells, setCells] = useState(
        Array.from({ length: rows * cols }, () => ({ active: false, fading: false }))
    );
    const [fadingColor, setFadingColor] = useState('#333');
    const [activeColor, setActiveColor] = useState('#FFF');

    useEffect(() => {
        function activateCell(index) {
            setCells(cells => {
                const newCells = [...cells];
                newCells[index] = { active: true, fading: true };
                return newCells;
            });
            setTimeout(() => {
                setCells(cells => {
                    const newCells = [...cells];
                    newCells[index] = { active: true , fading: false };
                    return newCells;
                });
            }, 600);
            setTimeout(() => {
                setCells(cells => {
                    const newCells = [...cells];
                    newCells[index] = { active: false, fading: false };
                    return newCells;
                });
            }, 600);
        }

        function randomColumn() {
            return Math.floor(Math.random() * cols);
        }

        function fall() {
            const col = randomColumn();
            let row = 0;

            function drop() {
                if (row < rows) {
                    const index = row * cols + col;
                    activateCell(index);
                    row++;
                    setTimeout(drop, 100); // Delay between cells in the same column
                }
            }
            drop();
        }

        const intervalId = setInterval(fall, 150);
        const colorChangeInterval = setInterval(() => {
            setActiveColor(getRandomColor());
            setFadingColor(getRandomColor());
        }, 2500);

        return () => {
            clearInterval(intervalId);
            clearInterval(colorChangeInterval);
        };
    }, [rows, cols]);

    return (
        <div className="grid">
            {cells.map((cell, index) => (
                <div
                    key={index}
                    className={`cell ${cell.active ? 'active' : ''} ${cell.fading ? 'fading' : ''}`}
                    style={{
                        '--active-color': activeColor,
                        '--fading-color': fadingColor,
                    }}
                ></div>
            ))}
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <video id="background-video" autoPlay loop muted>
                <source src="your-background-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="grid-container">
                <Grid />
            </div>
        </div>
    );
}

export default App;
