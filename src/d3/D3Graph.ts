import Graph from "../graph/Graph.js";
import * as d3 from "d3";
import D3_CONFIG from "./D3_CONFIG.js";
import { Observable, Event, D3EventBus } from "../utils/Observable.js";

import D3Simulation from "./D3Simulation.js";
import D3Appendable from "./D3Appendable.js";
import D3Relationship from "./D3Relationship.js";
import Relationship from "../graph/Relationship.js";
import D3Node from "./D3Node.js";
import Node from "../graph/Node.js";
import D3DragHandler from "./D3DragHandler.js";
import { zoom } from "d3";

export default class D3Graph extends Graph implements D3Appendable {
  $doc: Document;
  $svg: d3.Selection<SVGElement, unknown, null, undefined>;

  static width: number;
  static height: number;

  d3_color = D3_CONFIG.colorScale;
  d3Simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;
  d3DragHandler: D3DragHandler;

  d3Relationships: D3Relationship[];
  $selection: d3.Selection<any, any, any, undefined>;

  constructor(graph: Graph, doc: Document) {
    super(graph.relationships);
    this.$doc = doc;
    this.$svg = d3.select(doc.body).select<SVGElement>("#svg");
    // get width of element with id "svg"

    D3Graph.width = this.$svg.node()?.getBoundingClientRect().width ?? 0;
    D3Graph.height = this.$svg.node()?.getBoundingClientRect().height ?? 0;
    this.d3Simulation = D3Simulation.create(d3);
    this.d3DragHandler = D3DragHandler.create(d3, this.d3Simulation);

    this.$selection = this._append(this.$svg);

    console.log(this.$selection);
    this.d3Relationships = this.relationships.map(
      (relationship: Relationship) => {
        return new D3Relationship(relationship, this.$selection);
      }
    );

    const _nodes = this.d3Relationships.reduce(
      (nodes: D3Node[], relationship: D3Relationship) => {
        return [...nodes, ...relationship.getD3Nodes()];
      },
      []
    );

    D3Simulation.simulation!.nodes(_nodes).on("tick", () => {
      D3Simulation.isActive = true;
      D3EventBus.notifyAll(new Event(D3Simulation.TICK_EVENT, {}));
    });
    D3Simulation.simulation!.nodes(_nodes).on("end", () => {
      D3Simulation.simulation!.alphaTarget(0.01).restart();
    });

    const zoomBehavior = d3.zoom().on("zoom", (d) => this._onZoom(d)) as any;
    this.$svg.call(zoomBehavior).on("dblclick.zoom", null);
  }

  _onZoom(d: any) {
    this.$selection.attr("transform", d.transform);
  }

  delete() {
    this.$svg.selectAll("*").remove();
    D3Simulation.simulation = null;
    D3DragHandler.dragHandler = null;
    D3EventBus.clear();
    D3Node.d3Nodes = [];
    Node.nodes = [];
  }

  _append($svg: d3.Selection<SVGElement, unknown, null, undefined>) {
    return $svg.append("g").attr("class", "graph");
  }

  zoomed = (d: any) => {
    console.log("zoomed", d);
    this.$svg.attr("transform", () => d.transform);
  };
}
