// ====================================================== //
// ======================== Graph ======================= //
// ====================================================== //

import Relationship from "./Relationship";

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
}
