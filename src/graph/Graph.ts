// ====================================================== //
// ======================== Graph ======================= //
// ====================================================== //

import Relationship from "./Relationship";
import Node from "./Node";
import Link from "./Link";

export default class Graph {
  relationships: Relationship[];

  constructor(relationships: Relationship[] = []) {
    this.relationships = relationships;
  }

  addRelationship(relationship: Relationship) {
    this.relationships.push(relationship);
  }

  removeRelationshipById(id: string) {
    this.relationships = this.relationships.filter(
      (relationship) => relationship.id() !== id
    );
  }

  getRelationshipById(id: string) {
    return this.relationships.find((relationship) => relationship.id() === id);
  }

  getNodeList(): Node[] {
    return this.relationships
      .map((relationship) => relationship.getNodes())
      .reduce((acc, val) => acc.concat(val), []);
  }

  getLinkList(): Link[] {
    return this.relationships.map((relationship) => relationship.link);
  }

  getNodeConnections(): NodeConnection[] {
    return this.relationships.map((relationship) => {
      return {
        source: relationship.node1,
        target: relationship.node2,
      };
    });
  }
}

export interface NodeConnection {
  source: Node;
  target: Node;
}
