import Graph from "../graph/Graph.js";
import * as d3 from "d3";
import Relationship from "../graph/Relationship.js";
import Node from "../graph/Node.js";
// dynamically import d3

export default class D3Graph extends Graph {
  $doc: Document;
  $svg: d3.Selection<SVGElement, unknown, null, undefined>;

  width: number;
  height: number;

  d3_color = d3.scaleOrdinal(d3.schemeCategory10);
  d3_simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;
  d3_nodes: d3.Selection<SVGGElement, Node, SVGGElement, unknown>;
  d3_circles: d3.Selection<SVGCircleElement, Node, SVGGElement, unknown>;

  constructor(graph: Graph, doc: Document) {
    super(graph.relationships);
    this.$doc = doc;
    this.$svg = d3.select(doc.body).select<SVGElement>("svg");
    this.width = parseInt(this.$svg.attr("width"));
    this.height = parseInt(this.$svg.attr("height"));
    this.d3_simulation = this._createSimulation();

    this.d3_nodes = this._appendNodes(this.$svg, this.getNodeList());
    this.d3_circles = this._appendCircles(this.d3_nodes, this.d3_color);

    this.d3_simulation.nodes(this.getNodeList() as any).on("tick", () => {
      this.d3_circles.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
      this.d3_nodes.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });
    // start simulation

    const collisionForce = d3.forceCollide(75);
    this.d3_simulation.force("collisionForce", collisionForce);
  }

  _createSimulation(): d3.Simulation<d3.SimulationNodeDatum, undefined> {
    return d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id((d: any) => d.name)
          .strength(0.1)
          .distance(250)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2));
  }

  _appendNodes(
    $svg: d3.Selection<SVGElement, unknown, null, undefined>,
    nodes: Node[]
  ) {
    return $svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g");
  }

  _appendCircles(
    $nodes: d3.Selection<SVGGElement, Node, SVGGElement, unknown>,
    color: d3.ScaleOrdinal<string, string>
  ) {
    return $nodes
      .append("circle")
      .attr("r", 75)
      .attr("fill", () => {
        return color("1");
      });
  }
}
