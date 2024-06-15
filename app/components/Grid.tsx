import React, { useState, useEffect, useCallback } from 'react';

interface TetrisShape {
    shape: number[][];
    color: string;
    rotations: number;
    rotationIndex: number;
}

const tetrisShapes: { [key: string]: TetrisShape } = {
    square: {
        shape: [[1, 1], [1, 1]],
        color: 'bg-red-900',
        rotations: 1,
        rotationIndex: 0,
    },
    iShape: {
        shape: [[1], [1], [1], [1]],
        color: 'bg-blue-900',
        rotations: 2,
        rotationIndex: 0,
    },
    JShape: {
        shape: [[1, 0, 0], [1, 1, 1]],
        color: 'bg-green-900',
        rotations: 4,
        rotationIndex: 0,
    },
    LShape: {
        shape: [[0, 0, 1], [1, 1, 1]],
        color: 'bg-yellow-500',
        rotations: 4,
        rotationIndex: 0,
    },
    TShape: {
        shape: [[1, 1, 1], [0, 1, 0]],
        color: 'bg-cyan-900',
        rotations: 4,
        rotationIndex: 0,
    },
    SShape: {
        shape: [[0, 1, 1], [1, 1, 0]],
        color: 'bg-slate-900',
        rotations: 2,
        rotationIndex: 0,
    },
    ZShape: {
        shape: [[1, 1, 0], [0, 1, 1]],
        color: 'bg-pink-900',
        rotations: 2,
        rotationIndex: 0,
    },
};

interface GridCell {
    state: number;
    color: string;
}

interface GridProps {
    setUpcomingShape: (shape: TetrisShape) => void;
    setGameOver: (gameOver: boolean) => void;
    gameOver: boolean;
}

const Grid: React.FC<GridProps> = ({ setUpcomingShape, setGameOver, gameOver }) => {
    const columns = 12;
    const rows = 20;
    const [grid, setGrid] = useState<GridCell[][]>(Array.from({ length: rows }, () =>
        Array(columns).fill({ state: 0, color: 'bg-cyan-100' })
    ));
    const [currentShape, setCurrentShape] = useState<TetrisShape | null>(null);
    const [currentShapePosition, setCurrentShapePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const isCollision = useCallback((shape: TetrisShape, pos: { x: number, y: number }) => {
        for (let i = 0; i < shape.shape.length; i++) {
            for (let j = 0; j < shape.shape[i].length; j++) {
                if (
                    shape.shape[i][j] === 1 &&
                    (grid[pos.y + i] && grid[pos.y + i][pos.x + j]?.state) !== 0
                ) {
                    return true;
                }
            }
        }
        return false;
    }, [grid]);

    const mergeShapeIntoGrid = useCallback((shape: TetrisShape, pos: { x: number, y: number }) => {
        const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
        for (let i = 0; i < shape.shape.length; i++) {
            for (let j = 0; j < shape.shape[i].length; j++) {
                if (shape.shape[i][j] === 1) {
                    newGrid[pos.y + i][pos.x + j] = { state: 1, color: shape.color };
                }
            }
        }
        setGrid(newGrid);
    }, [grid]);

    const rotateShape = useCallback(() => {
        if (currentShape) {
            const newRotationIndex = (currentShape.rotationIndex + 1) % currentShape.rotations;
            const rotatedShape = rotateMatrix(currentShape.shape);
            const newPos = { x: currentShapePosition.x, y: currentShapePosition.y };

            // Adjust position if rotation causes shape to go out of bounds
            if (newPos.x + rotatedShape[0].length > columns) {
                newPos.x = columns - rotatedShape[0].length;
            }

            if (!isCollision({ shape: rotatedShape, color: currentShape.color, rotations: currentShape.rotations, rotationIndex: newRotationIndex }, newPos)) {
                setCurrentShape({ ...currentShape, shape: rotatedShape, rotationIndex: newRotationIndex });
            }
        }
    }, [currentShape, currentShapePosition, isCollision]);

    useEffect(() => {
        const initializeShape = () => {
            const shapeKeys = Object.keys(tetrisShapes);
            const randomShapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
            const initialX = Math.floor(columns / 2) - Math.floor(tetrisShapes[randomShapeKey].shape[0].length / 2);
            const initialY = 0;
            const newShape = tetrisShapes[randomShapeKey];

            if (isCollision(newShape, { x: initialX, y: initialY })) {
                setGameOver(true);
            } else {
                setCurrentShape(newShape);
                setCurrentShapePosition({ x: initialX, y: initialY });
                setUpcomingShape(tetrisShapes[shapeKeys[Math.floor(Math.random() * shapeKeys.length)]]);
            }
        };

        initializeShape();
    }, [isCollision, setGameOver, setUpcomingShape]);

    const moveShape = useCallback((dx: number, dy: number) => {
        if (currentShape) {
            const newPos = { x: currentShapePosition.x + dx, y: currentShapePosition.y + dy };
            if (!isCollision(currentShape, newPos)) {
                setCurrentShapePosition(newPos);
                return true;
            } else if (dy !== 0) {
                mergeShapeIntoGrid(currentShape, currentShapePosition);
                setCurrentShape(null);
                const shapeKeys = Object.keys(tetrisShapes);
                const randomShapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
                const initialX = Math.floor(columns / 2) - Math.floor(tetrisShapes[randomShapeKey].shape[0].length / 2);
                const newShape = tetrisShapes[randomShapeKey];
                if (isCollision(newShape, { x: initialX, y: 0 })) {
                    setGameOver(true);
                } else {
                    setCurrentShape(newShape);
                    setCurrentShapePosition({ x: initialX, y: 0 });
                    setUpcomingShape(tetrisShapes[shapeKeys[Math.floor(Math.random() * shapeKeys.length)]]);
                }
                return false;
            }
        }
    }, [currentShape, currentShapePosition, isCollision, mergeShapeIntoGrid, setGameOver, setUpcomingShape]);

    useEffect(() => {
        if (!gameOver) {
            const interval = setInterval(() => {
                moveShape(0, 1);
            }, 500);

            return () => clearInterval(interval);
        }
    }, [moveShape, gameOver]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            moveShape(-1, 0);
        } else if (event.key === 'ArrowRight') {
            moveShape(1, 0);
        } else if (event.key === 'ArrowDown') {
            moveShape(0, 1);
        } else if (event.key === 'ArrowUp') {
            rotateShape();
        }
    }, [moveShape, rotateShape]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const rotateMatrix = (matrix: number[][]): number[][] => {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const rotatedMatrix: number[][] = [];

        for (let i = 0; i < cols; i++) {
            rotatedMatrix.push([]);
            for (let j = rows - 1; j >= 0; j--) {
                rotatedMatrix[i].push(matrix[j][i]);
            }
        }

        return rotatedMatrix;
    };

    const resetGame = () => {
        setGrid(Array.from({ length: rows }, () => Array(columns).fill({ state: 0, color: 'bg-cyan-100' })));
        setGameOver(false);
        const shapeKeys = Object.keys(tetrisShapes);
        const randomShapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
        const initialX = Math.floor(columns / 2) - Math.floor(tetrisShapes[randomShapeKey].shape[0].length / 2);
        const newShape = tetrisShapes[randomShapeKey];
        setCurrentShape(newShape);
        setCurrentShapePosition({ x: initialX, y: 0 });
        setUpcomingShape(tetrisShapes[shapeKeys[Math.floor(Math.random() * shapeKeys.length)]]);
    };

    const renderGrid = () => {
        const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
        if (currentShape) {
            const shapeToRender = currentShape.shape;
            for (let i = 0; i < shapeToRender.length; i++) {
                for (let j = 0; j < shapeToRender[i].length; j++) {
                    if (shapeToRender[i][j] === 1) {
                        const x = currentShapePosition.x + j;
                        const y = currentShapePosition.y + i;
                        if (y >= 0 && y < rows && x >= 0 && x < columns) {
                            newGrid[y][x] = { state: 1, color: currentShape.color };
                        }
                    }
                }
            }
        }
        return newGrid;
    };
    
    return (
        <div className="flex flex-col items-center">
            {!gameOver && (
                <div className="grid grid-cols-12 gap-1 mb-4">
                    {renderGrid().map((row, rowIndex) =>
                        row.map((cell, cellIndex) => (
                            <div
                                key={`${rowIndex}-${cellIndex}`}
                                style={{ height: '20px', width: '20px' }}
                                className={`border border-gray-200 ${cell.color}`}
                            />
                        ))
                    )}
                </div>
            )}
            {gameOver && (
                <div className='flex justify-center items-center text-4xl py-12 text-cyan-950'>Game Over</div>
            )}
            {gameOver && (
                <button onClick={resetGame} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Reset Game
                </button>
            )}
        </div>
    );
};

export default Grid;