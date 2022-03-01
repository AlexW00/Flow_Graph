// ====================================================== //
// ======================== Node ======================== //
// ====================================================== //

import { Observable } from "../utils/Observable";

export default class Node extends Observable {
  // ~~~~~~~~~~~~~~~~~ Node ~~~~~~~~~~~~~~~~ //
  name: string;
  nodeType: NodeType;
  weight: number = 50;

  constructor(name: string, nodeType: NodeType) {
    super();
    this.name = name;
    this.nodeType = nodeType;
  }

  id() {
    return this.name + "-" + this.nodeType;
  }
}

export enum NodeType {
  TEXT_NODE = "TEXT_NODE",
  REFERENCE_NODE = "REFERENCE_NODE",
}
