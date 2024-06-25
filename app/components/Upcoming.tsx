import React from 'react';
import { ShapeData } from '@/type';

interface UpcomingProps {
  upcomingShape: ShapeData | null;
}

const columns = 6;
const rows = 6;
const CELL_SIZE = 20; // Ensure CELL_SIZE is consistent with Grid.tsx and Upcoming.tsx

const Upcoming: React.FC<UpcomingProps> = ({ upcomingShape }) => {
  const renderShape = () => {
    if (!upcomingShape) return null;

    const shape = upcomingShape.shape;
    const shapeRows = shape.length;
    const shapeCols = shape[0].length;

    // Calculate starting index to center the shape
    const startCol = Math.floor((columns - shapeCols) / 2);
    const startRow = Math.floor((rows - shapeRows) / 2);

    const shapeGridItems: JSX.Element[] = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        // Check if the current cell is part of the shape
        if (
          i >= startRow &&
          i < startRow + shapeRows &&
          j >= startCol &&
          j < startCol + shapeCols &&
          shape[i - startRow][j - startCol] === 1
        ) {
          shapeGridItems.push(
            <div
              key={`${i}-${j}`}
              className="w-full h-full col-span-1 border border-black"
              style={{ backgroundColor: upcomingShape.color, width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
            >
              &nbsp;
            </div>
          );
        } else {
          shapeGridItems.push(
            <div
              key={`${i}-${j}`}
              className="w-full h-full col-span-1 bg-cyan-100 border border-black"
              style={{ width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px` }}
            >
              &nbsp;
            </div>
          );
        }
      }
    }

    return shapeGridItems;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p>Upcoming</p>
      <div className="bg-green justify-center items-center border border-red-950 mt-2">
        <div className="grid grid-cols-6">
          {renderShape()}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
