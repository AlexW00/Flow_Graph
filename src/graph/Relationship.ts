// ====================================================== //
// ==================== Relationship ==================== //
// ====================================================== //

import Node from "./Node";
import Link from "./Link";

export default class Relationship {
  link: Link;
  node1: Node;
  node2: Node;
  id(): string {
    return this.node1.name + "-" + this.node2.name;
  }

  constructor(link: Link, node1: Node, node2: Node) {
    this.link = link;
    this.node1 = node1;
    this.node2 = node2;
  }
}
