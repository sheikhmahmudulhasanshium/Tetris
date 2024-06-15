"use client"

import React from 'react';
import Grid from './Grid';
import ScoreBoard from './ScoreBoard';
import Upcoming from './Upcoming';

// Define type for Tetris shapes
interface TetrisShape {
    shape: number[][];
    color: string;
}

const Body = () => {
    const [upcomingShape, setUpcomingShape] = React.useState<TetrisShape | null>(null);
    const [gameOver, setGameOver] = React.useState(false);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center flex-col">
                <ScoreBoard score={0} level={1} lines={0} />
                <Grid setUpcomingShape={setUpcomingShape} setGameOver={setGameOver} gameOver={gameOver} />
            </div>
            {!gameOver && (
                <div className="absolute left-0 pl-16 sm:pl-16 md:pl-12 lg:pl-16 bottom-20">
                    <Upcoming upcomingShape={upcomingShape} />
                </div>
            )}
        </div>
    );
}

export default Body;
