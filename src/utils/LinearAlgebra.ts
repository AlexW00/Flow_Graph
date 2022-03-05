import D3Node from "../d3/D3Node";

export interface Circle {
  position: Vector;
  radius: number;
}

export interface Vector {
  x: number;
  y: number;
}

export interface VectorPair {
  source: Vector;
  target: Vector;
}

export function makeCircleFromD3Node(d3Node: D3Node): Circle {
  return {
    position: { x: d3Node.x!!, y: d3Node.y!! },
    radius: d3Node.weightToRadius(),
  };
}

export function calcClosestPointsOfCircles(
  sourceCircle: Circle,
  targetCircle: Circle
): Vector[] {
  const jointVector = calcJointVector(
      sourceCircle.position,
      targetCircle.position
    ),
    jointVectorLength = calcVectorLength(jointVector);

  const sourceCircleRatio = sourceCircle.radius / jointVectorLength,
    targetCircleRatio = targetCircle.radius / jointVectorLength;

  const sourceCircleClosestPoint = {
    x: sourceCircle.position.x + jointVector.x * sourceCircleRatio,
    y: sourceCircle.position.y + jointVector.y * sourceCircleRatio,
  };

  const targetCircleClosestPoint = {
    x: targetCircle.position.x - jointVector.x * targetCircleRatio,
    y: targetCircle.position.y - jointVector.y * targetCircleRatio,
  };

  return [sourceCircleClosestPoint, targetCircleClosestPoint];
}

export function calcVectorLength(vector: Vector): number {
  return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}

export function calcJointVector(sourceVector: Vector, targetVector: Vector) {
  return {
    x: targetVector.x - sourceVector.x,
    y: targetVector.y - sourceVector.y,
  };
}
