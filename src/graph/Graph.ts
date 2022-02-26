// ====================================================== //
// ======================== Graph ======================= //
// ====================================================== //

import Relationship from "./Relationship";
import Node from "./Node";

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
}
