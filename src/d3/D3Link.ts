import { NodeConnection } from "../graph/Graph";
import Link from "../graph/Link";
import D3Appendable from "./D3Appendable";
import D3Relationship from "./D3Relationship";
import D3Tickable from "./D3Tickable";
import { EventBus } from "../utils/Observable";
import D3Simulation from "./D3Simulation";

export default class D3Link extends Link implements D3Appendable, D3Tickable {
  nodeConnection: NodeConnection;
  $selection!: d3.Selection<
    SVGLineElement,
    NodeConnection,
    SVGElement,
    unknown
  >;

  constructor(
    $svg: d3.Selection<SVGGElement, D3Relationship, SVGGElement, unknown>,
    link: Link,
    nodeConnection: NodeConnection
  ) {
    super(link.linkDirection, link.linkOptions);
    this.nodeConnection = nodeConnection;
    this._append($svg);
    EventBus.addEventListener(D3Simulation.TICK_EVENT, this.onTicked);
  }

  _append(
    $svg: d3.Selection<SVGGElement, D3Relationship, SVGGElement, unknown>
  ) {
    this.$selection = $svg
      .append("g")
      .lower()
      .attr("class", "links")
      .selectAll("line")
      .data([this.nodeConnection])
      .enter()
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1);
  }

  onTicked = (): void => {
    this.$selection
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);
  };
}
