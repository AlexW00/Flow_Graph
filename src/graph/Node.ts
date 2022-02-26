// ====================================================== //
// ======================== Node ======================== //
// ====================================================== //

export default class Node {
  name: string;
  nodeType: NodeType;

  constructor(name: string, nodeType: NodeType) {
    this.name = name;
    this.nodeType = nodeType;
  }
}

export enum NodeType {
  TEXT_NODE = "TEXT_NODE",
  REFERENCE_NODE = "REFERENCE_NODE",
}
