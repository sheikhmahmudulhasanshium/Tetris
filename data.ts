import { ShapeCollection } from './type';

const shapeData: ShapeCollection = {
  square: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#FFD700', // Yellow
    rotations: 1,
    rotationIndex: 0
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: '#800080', // Purple
    rotations: 4,
    rotationIndex: 0
  },
  L: {
    shape: [
      [1, 0],
      [1, 0],
      [1, 1]
    ],
    color: '#FFA500', // Orange
    rotations: 4,
    rotationIndex: 0
  },
  J: {
    shape: [
      [0, 1],
      [0, 1],
      [1, 1]
    ],
    color: '#0000FF', // Blue
    rotations: 4,
    rotationIndex: 0
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: '#FF0000', // Red
    rotations: 2,
    rotationIndex: 0
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: '#008000', // Green
    rotations: 2,
    rotationIndex: 0
  },
  I: {
    shape: [
      [1],
      [1],
      [1],
      [1]
    ],
    color: '#00FFFF', // Cyan
    rotations: 2,
    rotationIndex: 0
  }
};

export default shapeData;
