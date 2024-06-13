"use client"
import React, { useState } from "react";
import Grid from "./Grid";
import ScoreBoard from "./ScoreBoard";
import Upcoming from "./Upcoming";

const Body = () => {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [lines, setLines] = useState(0);

    const handleScoreUpdate = (newScore: number) => {
        setScore(newScore);
    };

    const handleLevelUpdate = (newLevel: number) => {
        setLevel(newLevel);
    };

    const handleLinesUpdate = (newLines: number) => {
        setLines(newLines);
    };

    return (
        <div className="flex gap-x-4">
            <div className="flex justify-between items-center flex-col">
                <ScoreBoard score={score} level={level} lines={lines} />
                <Grid onScoreUpdate={handleScoreUpdate} onLevelUpdate={handleLevelUpdate} onLinesUpdate={handleLinesUpdate} />
            </div>
            <div className="mt-12">
                <Upcoming />
            </div>
        </div>
    );
}

export default Body;
