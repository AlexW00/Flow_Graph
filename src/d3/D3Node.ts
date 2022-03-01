import { SimulationNodeDatum } from "d3";
import Node from "../graph/Node";
import D3Appendable from "./D3Appendable";
import D3Circle from "./D3Circle";
import D3Label from "./D3Label";
import D3Relationship from "./D3Relationship";
import D3Tickable from "./D3Tickable";
import { Event, EventBus } from "../utils/Observable";
import D3Simulation from "./D3Simulation";
import D3DragHandler from "./D3DragHandler";
import { LinkStrength, performOperation } from "../graph/Link";

export default class D3Node
  extends Node
  implements D3Appendable, SimulationNodeDatum, D3Tickable
{
  static d3Nodes: D3Node[] = [];

  $selection!: d3.Selection<SVGGElement, D3Node, any, unknown>;
  d3_Circle!: D3Circle;
  d3_Label!: D3Label;

  // ~~~~~~~~~ SimulationNodeDatum ~~~~~~~~~ //
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
  static CLICKED_EVENT: string = "nodeClicked";

  constructor(
    node: Node,
    $svg: d3.Selection<SVGGElement, D3Relationship, SVGGElement, unknown>
  ) {
    const existingNode = D3Node.findNodeById(node.id());
    if (existingNode) return existingNode;
    super(node.name, node.nodeType);
    this.$selection = this._append($svg);

    this.d3_Circle = new D3Circle(this.$selection, this.weight);
    this.d3_Label = new D3Label(this.$selection);

    EventBus.addEventListener(D3Simulation.TICK_EVENT, this.onTicked);
    D3DragHandler.applyDragHandler(this.$selection as any);

    D3Node.d3Nodes.push(this);

    this.$selection.on("click", () =>
      this.notifyAll(new Event(D3Node.CLICKED_EVENT, this))
    );
  }

  updateWeight(linkStrength: LinkStrength) {
    this.weight = performOperation(
      this.weight,
      linkStrength.strength,
      linkStrength.type
    );
    this.d3_Circle.updateRadius(this.weight);
  }

  _append = (
    $svg: d3.Selection<SVGGElement, D3Relationship, SVGGElement, unknown>
  ) => {
    return $svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data([this as D3Node])
      .enter()
      .append("g");
  };

  static findNodeById(id: string): D3Node | undefined {
    return D3Node.d3Nodes.find((d3Node) => d3Node.id() === id);
  }

  onTicked = (): void => {
    this.$selection.attr("transform", function (d: any) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  };
}
