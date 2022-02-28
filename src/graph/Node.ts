// ====================================================== //
// ======================== Node ======================== //
// ====================================================== //

import { SimulationNodeDatum } from "d3";

export default class Node implements SimulationNodeDatum {
  // ~~~~~~~~~~~~~~~~~ Node ~~~~~~~~~~~~~~~~ //
  name: string;
  nodeType: NodeType;

  // ~~~~~~~~~ SimulationNodeDatum ~~~~~~~~~ //
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;

  constructor(name: string, nodeType: NodeType) {
    this.name = name;
    this.nodeType = nodeType;
  }
}

export enum NodeType {
  TEXT_NODE = "TEXT_NODE",
  REFERENCE_NODE = "REFERENCE_NODE",
}
