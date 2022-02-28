import { NodeConnection } from "../graph/Graph";
import D3Appendable from "./D3Appendable";
import D3Tickable from "./D3Tickable";

export default class D3Links implements D3Appendable, D3Tickable {
  nodeConnections: NodeConnection[];
  $selection!: d3.Selection<
    SVGLineElement,
    NodeConnection,
    SVGElement,
    unknown
  >;

  constructor(
    nodeConnections: NodeConnection[],
    $svg: d3.Selection<SVGElement, unknown, null, undefined>
  ) {
    this.nodeConnections = nodeConnections;
    this._appendToSvg($svg);
  }

  _appendToSvg($svg: d3.Selection<SVGElement, unknown, null, undefined>) {
    this.$selection = $svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(this.nodeConnections)
      .enter()
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1);
  }

  onTicked(): void {
    this.$selection
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);
  }
}
