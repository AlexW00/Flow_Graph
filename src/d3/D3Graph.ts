import Graph from "../graph/Graph.js";
import * as d3 from "d3";
import D3_CONFIG from "./D3_CONFIG.js";
import { Observable, Event, EventBus } from "../utils/Observable.js";

import D3Simulation from "./D3Simulation.js";
import D3Appendable from "./D3Appendable.js";
import D3Relationship from "./D3Relationship.js";
import Relationship from "../graph/Relationship.js";
import D3Node from "./D3Node.js";
import D3DragHandler from "./D3DragHandler.js";

export default class D3Graph extends Graph implements D3Appendable {
  $doc: Document;
  $svg: d3.Selection<SVGElement, unknown, null, undefined>;

  width: number;
  height: number;

  d3_color = D3_CONFIG.color;
  d3Simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;
  d3DragHandler: D3DragHandler;

  d3Relationships: D3Relationship[];
  $selection: d3.Selection<any, any, any, undefined>;

  constructor(graph: Graph, doc: Document) {
    super(graph.relationships);
    this.$doc = doc;
    this.$svg = d3.select(doc.body).select<SVGElement>("svg");
    this.width = parseInt(this.$svg.attr("width"));
    this.height = parseInt(this.$svg.attr("height"));
    this.d3Simulation = D3Simulation.create(d3, this);
    this.d3DragHandler = D3DragHandler.create(d3, this.d3Simulation);

    this.$selection = this._appendToSvg(this.$svg);

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
    D3Simulation.simulation.nodes(_nodes).on("tick", () => {
      EventBus.notifyAll(new Event(D3Simulation.TICK_EVENT, {}));
    });
  }

  _appendToSvg($svg: d3.Selection<SVGElement, unknown, null, undefined>) {
    return $svg.append("g").attr("class", "graph");
  }
}
