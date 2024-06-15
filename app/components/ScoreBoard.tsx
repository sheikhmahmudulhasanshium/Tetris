import React from 'react';

interface ScoreBoardProps {
    score: number;
    level: number;
    lines: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level, lines }) => {
    return (
        <div className="flex  items-center bg-gray-200 p-4 rounded shadow-md justify-center space-x-2 mb-3">
            <div className="flex space-x-2 items-center">
                <h2 className="text-lg font-bold">Score:</h2>
                <p className='text-center'>{score}</p>
            </div>
            <div className=" flex space-x-2 items-center">
                <h2 className="text-lg font-bold">Level:</h2>
                <p className='text-center'>{level}</p>
            </div>
            <div className='flex space-x-2 items-center'>
                <h2 className="text-lg font-bold">Lines:</h2>
                <p className='text-center'>{lines}</p>
            </div>
        </div>
    );
}

export default ScoreBoard;
