"use client"
import React, { useState, useEffect, useCallback } from 'react';

interface GridProps {
    onScoreUpdate: (score: number) => void;
    onLevelUpdate: (level: number) => void;
    onLinesUpdate: (lines: number) => void;
}

const Grid: React.FC<GridProps> = ({ onScoreUpdate, onLevelUpdate, onLinesUpdate }) => {
    const rows = 22;
    const columns = 12;
    const [grid, setGrid] = useState(Array(rows * columns).fill(false));
    const [currentShape, setCurrentShape] = useState<number[]>([]);
    const [shapeIndex, setShapeIndex] = useState(0);
    const [position, setPosition] = useState(columns * 2 + 4);
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lines, setLines] = useState(0);

    const shapesList = [
        [1, 2, columns + 1, columns + 2],     // squareShape
        [1, columns + 1, columns * 2 + 1, columns * 3 + 1], // lShape
        [2, columns + 2, columns * 2 + 2, columns * 2 + 1], // jShape
        [1, 2, columns + 2, columns + 3],    // zShape
        [2, 3, columns + 1, columns + 2],    // sShape
        [1, columns + 1, columns + 2, columns + 3], // tShape
        [1, 2, columns + 2, columns + 3],    // reverseZShape
    ];

    const placeShape = (shape: number[], position: number) => {
        return shape.map(index => index + position);
    };

    const checkCollision = (shape: number[], offset: number) => {
        return shape.some(index => {
            const pos = index + offset;
            const x = pos % columns;
            const y = Math.floor(pos / columns);
            return (
                x < 1 ||                        // Left edge
                x >= columns - 1 ||             // Right edge
                y >= rows - 1 ||                // Bottom edge (one row above the last)
                (y > 0 && grid[pos])            // Collision with existing piece
            );
        });
    };

    const mergeShapeToGrid = (shape: number[]) => {
        setGrid(prevGrid => {
            const newGrid = [...prevGrid];
            shape.forEach(index => {
                if (index >= 0) newGrid[index] = true;
            });
            return newGrid;
        });
    };

    const clearFullLines = () => {
        setGrid(prevGrid => {
            let newGrid = [...prevGrid];
            let linesCleared = 0;

            for (let row = rows - 2; row >= 0; row--) { // Stop before the last row
                if (newGrid.slice(row * columns + 1, row * columns + columns - 1).every(Boolean)) {
                    for (let col = 1; col < columns - 1; col++) {
                        newGrid[row * columns + col] = false;
                    }
                    linesCleared++;
                }
            }

            if (linesCleared > 0) {
                setLines(prevLines => prevLines + linesCleared);
                setScore(prevScore => prevScore + linesCleared);
                if (lines + linesCleared >= level * 10) {
                    setLevel(prevLevel => prevLevel + 1);
                }
                onScoreUpdate(score + linesCleared);
                onLinesUpdate(lines + linesCleared);
                onLevelUpdate(level + (lines + linesCleared >= level * 10 ? 1 : 0));
            }

            // Apply gravity effect
            for (let row = rows - 3; row >= 0; row--) { // Stop before the last two rows
                for (let col = 1; col < columns - 1; col++) {
                    if (newGrid[row * columns + col] && !newGrid[(row + 1) * columns + col]) {
                        newGrid[(row + 1) * columns + col] = true;
                        newGrid[row * columns + col] = false;
                    }
                }
            }

            return newGrid;
        });
    };

    const handleMove = (offset: number) => {
        const newShape = currentShape.map(index => index + offset);
        const isValidMove = !checkCollision(newShape, 0) && newShape.every(index => index >= 0 && index < rows * columns);

        if (isValidMove) {
            setCurrentShape(newShape);
            setPosition(prev => prev + offset);
        } else if (offset === columns) {
            mergeShapeToGrid(currentShape);
            clearFullLines();
            setShapeIndex(prevIndex => (prevIndex + 1) % shapesList.length);
            setPosition(columns * 2 + 4);
            setCurrentShape(placeShape(shapesList[(shapeIndex + 1) % shapesList.length], columns * 2 + 4));
        }
    };

    const rotateShape = () => {
        const centerIndex = currentShape[0];
        const centerX = centerIndex % columns;
        const centerY = Math.floor(centerIndex / columns);

        const newShape = currentShape.map(index => {
            const x = index % columns;
            const y = Math.floor(index / columns);

            // Rotation 90 degrees clockwise around the center
            const newX = centerX + centerY - y;
            const newY = centerY - centerX + x;

            return newY * columns + newX;
        });

        const isValidRotation = !checkCollision(newShape, 0) && newShape.every(index => index >= 0 && index < rows * columns);

        if (isValidRotation) {
            setCurrentShape(newShape);
        }
    };

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                handleMove(columns);
            }, 1000 - (level - 1) * 100);
            return () => clearInterval(interval);
        }
    }, [currentShape, isPaused, level]);

    useEffect(() => {
        setCurrentShape(placeShape(shapesList[shapeIndex], columns * 2 + 4));
    }, [shapeIndex]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") handleMove(-1);
        if (event.key === "ArrowRight") handleMove(1);
        if (event.key === "ArrowDown") handleMove(columns);
        if (event.key === "ArrowUp") rotateShape();
    }, [currentShape]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    const gridItems = [];
    for (let i = 0; i < rows * columns; i++) {
        const isShape = currentShape.includes(i);
        const isEdge = i % columns === 0 || i % columns === columns - 1 || i < columns || i >= (rows - 1) * columns;
        gridItems.push(
            <div
                key={i}
                className={`col-span-1 border ${grid[i] ? 'bg-slate-500' : isShape ? 'bg-slate-300' : isEdge ? 'bg-cyan-950' : ''}`}
                style={{ height: '20px', width: '20px' }}
            >
                &nbsp;
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center items-center border border-black my-4">
                <div className="grid grid-cols-12 gap-1 justify-center items-center">
                    {gridItems}
                </div>
            </div>
            <button onClick={handlePause} className="px-4 py-2 bg-blue-500 text-white rounded">
                {isPaused ? "Resume" : "Pause"}
            </button>
        </div>
    );
}

export default Grid;
