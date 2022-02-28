import { Selection } from "d3";
import Node from "../graph/Node";
import D3Appendable from "./D3Appendable";
import D3Tickable from "./D3Tickable";

export default class D3Nodes implements D3Appendable, D3Tickable {
  nodes: Node[];
  $selection: d3.Selection<SVGGElement, Node, SVGGElement, unknown>;

  constructor(
    nodes: Node[],
    $svg: d3.Selection<SVGElement, unknown, null, undefined>
  ) {
    this.nodes = nodes;
    this.$selection = this._appendToSvg($svg);
  }

  _appendToSvg($svg: Selection<SVGElement, unknown, null, undefined>) {
    return $svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(this.nodes)
      .enter()
      .append("g");
  }

  onTicked(): void {
    this.$selection.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
  }
}
