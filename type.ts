export type ShapeMatrix = number[][];

export interface ShapeData {
shape: ShapeMatrix;
color: string;
rotations: number;
rotationIndex: number;
name: string;
}

export interface ShapeCollection {
[key: string]: Omit<ShapeData, 'name'>;
}