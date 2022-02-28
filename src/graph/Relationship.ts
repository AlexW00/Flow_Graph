// ====================================================== //
// ==================== Relationship ==================== //
// ====================================================== //

import Node from "./Node";
import Link from "./Link";
import { NodeConnection } from "./Graph";

export default class Relationship implements NodeConnection {
  link: Link;
  source: Node;
  target: Node;
  id(): string {
    return this.source.name + "-" + this.target.name;
  }

  constructor(link: Link, node1: Node, node2: Node) {
    this.link = link;
    this.source = node1;
    this.target = node2;
  }

  getNodes(): Node[] {
    return [this.source, this.target];
  }

  getNodeConnection(): NodeConnection {
    return {
      source: this.source,
      target: this.target,
    };
  }
}
