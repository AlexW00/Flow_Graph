import Link from "../graph/Link";
import D3Appendable from "./D3Appendable";
import D3Relationship, { D3NodeConnection } from "./D3Relationship";
import D3Tickable from "./D3Tickable";
import { EventBus } from "../utils/Observable";
import D3Simulation from "./D3Simulation";
import {
  calcClosestPointsOfCircles,
  makeCircleFromD3Node,
  VectorPair,
} from "../utils/LinearAlgebra";
import D3_CONFIG from "./D3_CONFIG";

export default class D3Link extends Link implements D3Appendable, D3Tickable {
  $selection!: any;
  nodeConnection: D3NodeConnection;
  path: VectorPair = {
    source: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
  };

  constructor(
    $svg: d3.Selection<SVGGElement, D3Relationship, SVGGElement, unknown>,
    link: Link,
    nodeConnection: D3NodeConnection
  ) {
    super(link.linkDirection, link.linkOptions);
    this.nodeConnection = nodeConnection;
    this._append($svg);
    EventBus.addEventListener(D3Simulation.TICK_EVENT, this.onTicked);
  }

  _append(
    $svg: d3.Selection<SVGGElement, D3Relationship, SVGGElement, unknown>
  ) {
    this._appendArrowHead($svg);
    this.$selection = $svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data([this.path])
      .enter()
      .append("line")
      .style("stroke", D3_CONFIG.link.strokeColor)
      .style("stroke-width", D3_CONFIG.link.strokeWidth)
      .attr("marker-end", () => "url(#arrow)");
  }

  _appendArrowHead(
    $svg: d3.Selection<SVGGElement, D3Relationship, SVGGElement, unknown>
  ) {
    $svg
      .append("svg:defs")
      .append("svg:marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", D3_CONFIG.link.arrow.height) //so that it comes towards the center.
      .attr("markerWidth", D3_CONFIG.link.arrow.width)
      .attr("markerHeight", D3_CONFIG.link.arrow.height)
      .attr("orient", "auto")
      .style("stroke", D3_CONFIG.link.strokeColor)
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5");
  }

  _updatePath() {
    const closestPoints = calcClosestPointsOfCircles(
      makeCircleFromD3Node(this.nodeConnection.source),
      makeCircleFromD3Node(this.nodeConnection.target)
    );
    this.path.source = closestPoints[0];
    this.path.target = closestPoints[1];
  }

  onTicked = (): void => {
    this._updatePath();
    this.$selection
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y);
  };
}
