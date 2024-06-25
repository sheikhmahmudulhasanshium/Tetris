"use client"
import { useState, useEffect, useCallback } from 'react';
import shapeData from '@/data';
import { ShapeData } from '@/type';

const shapes = Object.keys(shapeData);

const getRandomShape = (): ShapeData => {
  const shapeName = shapes[Math.floor(Math.random() * shapes.length)];
  return { ...shapeData[shapeName], name: shapeName };
};

const useRandomShape = () => {
  const [currentShape, setCurrentShape] = useState<ShapeData>(getRandomShape);
  const [nextShape, setNextShape] = useState<ShapeData>(getRandomShape);

  const updateShapes = useCallback(() => {
    setCurrentShape(nextShape);
    setNextShape(getRandomShape());
  }, [nextShape]);

  useEffect(() => {
    const interval = setInterval(updateShapes, 500); // Change interval time as needed
    return () => clearInterval(interval);
  }, [updateShapes]);

  return { currentShape, nextShape, updateShapes };
};

export default useRandomShape;
