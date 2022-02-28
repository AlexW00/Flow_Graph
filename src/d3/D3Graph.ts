import Graph from "../graph/Graph.js";
import * as d3 from "d3";
import D3Links from "./D3Links.js";
import D3Nodes from "./D3Nodes.js";
import D3Circles from "./D3Circles.js";
import D3Labels from "./D3Labels.js";
import D3Simulation from "./D3Simulation.js";
import D3DragHandler from "./D3DragHandler.js";

export default class D3Graph extends Graph {
  $doc: Document;
  $svg: d3.Selection<SVGElement, unknown, null, undefined>;

  width: number;
  height: number;

  d3_color = d3.scaleOrdinal(d3.schemeCategory10);
  d3_simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;
  d3_dragHandler: d3.DragBehavior<Element, unknown, unknown>;

  d3_Links: D3Links;
  d3_Nodes: D3Nodes;
  d3_Circles: D3Circles;
  d3_Labels: D3Labels;

  constructor(graph: Graph, doc: Document) {
    super(graph.relationships);
    this.$doc = doc;
    this.$svg = d3.select(doc.body).select<SVGElement>("svg");
    this.width = parseInt(this.$svg.attr("width"));
    this.height = parseInt(this.$svg.attr("height"));

    this.d3_simulation = D3Simulation.create(d3, this);
    this.d3_dragHandler = D3DragHandler.create(d3, this.d3_simulation);

    this.d3_Links = new D3Links(this.getNodeConnections(), this.$svg);
    this.d3_Nodes = new D3Nodes(this.getNodeList(), this.$svg);
    this.d3_Circles = new D3Circles(this.d3_Nodes.$selection, this.d3_color);
    this.d3_Labels = new D3Labels(this.d3_Nodes.$selection);

    D3DragHandler.applyDragHandler(this.d3_Nodes.$selection as any);
    D3Simulation.startTickingOn(this.getNodeList(), [
      this.d3_Links,
      this.d3_Nodes,
    ]);
  }
}
