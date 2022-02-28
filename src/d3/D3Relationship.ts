import { Selection } from "d3";
import { NodeConnection } from "../graph/Graph";

import Relationship from "../graph/Relationship";
import D3Appendable from "./D3Appendable";
import D3Link from "./D3Link";
import D3Node from "./D3Node";

export default class D3Relationship
  extends Relationship
  implements D3Appendable
{
  $selection: d3.Selection<SVGGElement, D3Relationship, SVGGElement, unknown>;

  d3Node1: D3Node;
  d3Node2: D3Node;
  d3Link: D3Link;

  constructor(
    relationship: Relationship,
    $svg: d3.Selection<SVGElement, unknown, null, undefined>
  ) {
    super(relationship.link, relationship.source, relationship.target);

    this.$selection = this._appendToSvg($svg);
    this.d3Node1 = new D3Node(this.source, this.$selection);
    this.d3Node2 = new D3Node(this.target, this.$selection);
    this.d3Link = new D3Link(
      this.$selection,
      this.link,
      this.getD3NodeConnection()
    );
  }

  _appendToSvg($svg: Selection<SVGElement, unknown, null, undefined>) {
    return $svg
      .append("g")
      .attr("class", "relationship")
      .selectAll("g")
      .data([this as D3Relationship])
      .enter()
      .append("g");
  }

  getD3Nodes(): D3Node[] {
    return [this.d3Node1, this.d3Node2];
  }

  getD3NodeConnection(): NodeConnection {
    return {
      source: this.d3Node1,
      target: this.d3Node2,
    };
  }
}
