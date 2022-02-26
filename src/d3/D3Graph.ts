import Graph, { NodeConnection } from "../graph/Graph.js";
import * as d3 from "d3";
import Relationship from "../graph/Relationship.js";
import Node from "../graph/Node.js";
import Link from "../graph/Link";
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
  d3_links: d3.Selection<SVGLineElement, NodeConnection, SVGElement, unknown>;
  d3_labels: d3.Selection<SVGTextElement, Node, SVGGElement, unknown>;
  d3_titles: d3.Selection<HTMLTitleElement, Node, SVGGElement, unknown>;

  constructor(graph: Graph, doc: Document) {
    super(graph.relationships);
    this.$doc = doc;
    this.$svg = d3.select(doc.body).select<SVGElement>("svg");
    this.width = parseInt(this.$svg.attr("width"));
    this.height = parseInt(this.$svg.attr("height"));

    this.d3_simulation = this._createSimulation();
    this.d3_links = this._appendLinks(this.$svg, this.getNodeConnections());
    this.d3_nodes = this._appendNodes(this.$svg, this.getNodeList());
    this.d3_circles = this._appendCircles(this.d3_nodes, this.d3_color);
    this.d3_labels = this._appendLabels(this.d3_nodes);
    this.d3_titles = this._appendTitles(this.d3_nodes);

    const d3_drag_handler = this._createDragHandler();
    d3_drag_handler(this.d3_nodes);

    this.d3_simulation.nodes(this.getNodeList() as any).on("tick", () => {
      this.d3_nodes.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
      this.d3_links
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
    });
    // start simulation

    const collisionForce = d3.forceCollide(75);
    this.d3_simulation.force("collisionForce", collisionForce);
  }

  _appendTitles($nodes: d3.Selection<SVGGElement, Node, SVGGElement, unknown>) {
    return $nodes.append("title").text(function (d) {
      return d.name;
    });
  }

  _appendLabels($nodes: d3.Selection<SVGGElement, Node, SVGGElement, unknown>) {
    return $nodes
      .append("text")
      .text(function (d) {
        return d.name;
      })
      .attr("x", 0)
      .attr("y", 0);
  }

  _createDragHandler() {
    const dragstarted = (e, d) => {
      if (!e.active) this.d3_simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = (e, d) => {
      d.fx = e.x;
      d.fy = e.y;
    };

    const dragended = (e, d) => {
      if (!e.active) this.d3_simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };

    return d3
      .drag()
      .on("start", (e, d) => dragstarted(e, d))
      .on("drag", (e, d) => dragged(e, d))
      .on("end", (e, d) => dragended(e, d));
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

  _appendLinks(
    $svg: d3.Selection<SVGElement, unknown, null, undefined>,
    links: NodeConnection[]
  ): d3.Selection<SVGLineElement, NodeConnection, SVGElement, unknown> {
    return $svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1);
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
