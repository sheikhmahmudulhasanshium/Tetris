import React, { useEffect, useState, useCallback } from 'react';
import { ShapeMatrix, ShapeData } from '@/type';

export interface GridProps {
  currentShape: ShapeData | null;
  setCurrentShape: React.Dispatch<React.SetStateAction<ShapeData | null>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  gameOver: boolean;
  setUpcomingShape: React.Dispatch<React.SetStateAction<ShapeData | null>>;
}

const ROWS = 20;
const COLS = 12;
const CELL_SIZE = 20;
const DEFAULT_COLOR = '#9FF0F0'; // white
const DROP_INTERVAL = 1000;

const Grid: React.FC<GridProps> = ({
  currentShape,
  setCurrentShape,
  setGameOver,
  gameOver,
}) => {
  const initialGrid: string[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => DEFAULT_COLOR)
  );

  const [grid, setGrid] = useState<string[][]>(initialGrid);
  const [position, setPosition] = useState({ row: 0, col: Math.floor(COLS / 2) - 2 });
  const [paused, setPaused] = useState(false);

  const isCellOccupied = (row: number, col: number): boolean => {
    if (!currentShape) return false;

    const shapeMatrix: ShapeMatrix = currentShape.shape;

    for (let i = 0; i < shapeMatrix.length; i++) {
      for (let j = 0; j < shapeMatrix[i].length; j++) {
        if (shapeMatrix[i][j] === 1) {
          const occupiedRow = row + i;
          const occupiedCol = col + j;

          if (
            occupiedRow >= 0 &&
            occupiedRow < ROWS &&
            occupiedCol >= 0 &&
            occupiedCol < COLS &&
            grid[occupiedRow][occupiedCol] !== DEFAULT_COLOR
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const moveShape = useCallback(
    (direction: 'left' | 'right' | 'down') => {
      if (!currentShape) return;

      const { row, col } = position;
      let newRow = row;
      let newCol = col;

      if (direction === 'left') newCol--;
      if (direction === 'right') newCol++;
      if (direction === 'down') newRow++;

      // Check if the new position is valid
      if (!isCellOccupied(newRow, newCol) && newRow < ROWS) {
        setPosition({ row: newRow, col: newCol });
      } else if (direction === 'down') {
        // Lock the shape in place
        const updatedGrid = grid.map(row => [...row]);
        currentShape.shape.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            if (cell === 1) {
              const gridRow = position.row + rowIndex;
              const gridCol = position.col + colIndex;
              if (gridRow >= 0 && gridRow < ROWS && gridCol >= 0 && gridCol < COLS) {
                updatedGrid[gridRow][gridCol] = currentShape.color;
                
              }
            }
          });
        });

        setGrid(updatedGrid);
        setCurrentShape(null); // Prepare for the next shape
        setPosition({ row: 0, col: Math.floor(COLS / 2) - 2 }); // Reset position

        // Check for game over condition
        if (currentShape.shape.length + position.row <= ROWS) {
          setGameOver(true);
        }
      }
    },
    [currentShape, position, grid, setCurrentShape, setGameOver]
  );

  const rotateShape = () => {
    if (!currentShape) return;

    const rotatedShape = currentShape.shape[0].map((_, index) =>
      currentShape.shape.map(row => row[index]).reverse()
    );

    const newShape: ShapeData = { ...currentShape, shape: rotatedShape };

    if (!isCellOccupied(position.row, position.col)) {
      setCurrentShape(newShape);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (paused || gameOver) return;

    switch (e.key) {
      case 'ArrowLeft':
        moveShape('left');
        break;
      case 'ArrowRight':
        moveShape('right');
        break;
      case 'ArrowDown':
        moveShape('down');
        break;
      case 'ArrowUp':
        rotateShape();
        break;
      case ' ':
        setPaused(!paused);
        break;
    }
  }, [moveShape, rotateShape, paused, gameOver]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, paused, gameOver]);

  useEffect(() => {
    if (paused || gameOver) return;

    const dropInterval = setInterval(() => {
      moveShape('down');
    }, DROP_INTERVAL);

    return () => clearInterval(dropInterval);
  }, [paused, gameOver, moveShape]);

  useEffect(() => {
    if (!currentShape) return;

    const updatedGrid = initialGrid.map(row => [...row]);

    currentShape.shape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          const gridRow = position.row + rowIndex;
          const gridCol = position.col + colIndex;
          if (gridRow >= 0 && gridRow < ROWS && gridCol >= 0 && gridCol < COLS) {
            updatedGrid[gridRow][gridCol] = currentShape.color;
          }
        }
      });
    });

    setGrid(updatedGrid);
  }, [currentShape, position, gameOver]);

  useEffect(() => {
    if (currentShape && currentShape.shape.length + position.row > ROWS) {
      setGameOver(true);
    }
  }, [currentShape, position, setGameOver]);

  return (
    <div className="grid grid-cols-12 gap-0">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-full h-full border  col-span-1"
            style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px`, backgroundColor: cell }}
          >
            &nbsp;
          </div>
        ))
      )}
    </div>
  );
};

export default Grid;
