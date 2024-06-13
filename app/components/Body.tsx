"use client"
import React, { useState } from 'react';
import Grid from './Grid';
import ScoreBoard from './ScoreBoard';
import Upcoming from './Upcoming';
import Controls from './Controls';

const Body = () => {
    // State for score, level, lines, and upcoming shape
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lines, setLines] = useState(0);
    const [nextShape, setNextShape] = useState<number[]>([]);

    // Event handlers to update state
    const handleScoreUpdate = (newScore: number) => {
        setScore(newScore);
    };

    const handleLevelUpdate = (newLevel: number) => {
        setLevel(newLevel);
    };

    const handleLinesUpdate = (newLines: number) => {
        setLines(newLines);
    };

    const handleNextShapeUpdate = (shape: number[]) => {
        setNextShape(shape);
    };

    return (
        <div className="flex gap-8 p-8 bg-gray-100 min-h-screen">
            {/* Left side: Grid */}
            <div className="flex flex-col justify-between items-center bg-white p-6 rounded-lg shadow-md">
                <Grid
                    onScoreUpdate={handleScoreUpdate}
                    onLevelUpdate={handleLevelUpdate}
                    onLinesUpdate={handleLinesUpdate}
                    onNextShapeUpdate={handleNextShapeUpdate}
                    score={score}
                    level={level}
                    lines={lines}
                    isPaused={false} // Example: Pass isPaused state if required by Grid
                />
            </div>
            
            {/* Right side: Controls, ScoreBoard, and Upcoming */}
            <div className="flex flex-col justify-between items-center bg-white p-6 rounded-lg shadow-md text-center">
                <Controls />
                <ScoreBoard score={score} level={level} lines={lines} />

                <div className="mt-6">
                    <p className="text-lg font-semibold mb-4">Upcoming</p>
                    <Upcoming nextShape={nextShape} columns={12} />
                </div>
            </div>
        </div>
    );
};

export default Body;
