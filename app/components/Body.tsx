// Body.tsx
"use client"
import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import ScoreBoard from './ScoreBoard';
import Upcoming from './Upcoming';
import useRandomShape from '../hooks/useRandomShapes';
import { ShapeData } from '@/type';

const Body: React.FC = () => {
  const { currentShape, nextShape, updateShapes } = useRandomShape();
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!currentShape) {
      updateShapes();
    }
  }, [currentShape, updateShapes]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center flex-col">
        <ScoreBoard score={0} level={1} lines={0} />
        <Grid
          currentShape={currentShape}
          setUpcomingShape={updateShapes}
          setGameOver={setGameOver}
          gameOver={gameOver}
          setCurrentShape={updateShapes}
        />
      </div>
      {!gameOver && (
        <div className="absolute left-0 pl-16 sm:pl-16 md:pl-12 lg:pl-16 bottom-20">
          <Upcoming upcomingShape={nextShape} />
        </div>
      )}
    </div>
  );
};

export default Body