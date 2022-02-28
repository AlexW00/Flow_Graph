import { SimulationNodeDatum } from "d3";
import Node from "../graph/Node";
import D3Appendable from "./D3Appendable";
import D3Circle from "./D3Circle";
import D3Label from "./D3Label";
import D3Relationship from "./D3Relationship";
import D3Tickable from "./D3Tickable";
import { EventBus } from "../utils/Observable";
import D3Simulation from "./D3Simulation";
import D3DragHandler from "./D3DragHandler";

export default class D3Node
  extends Node
  implements D3Appendable, SimulationNodeDatum, D3Tickable
{
  $selection: d3.Selection<SVGGElement, D3Node, any, unknown>;
  d3_Circle: D3Circle;
  d3_Label: D3Label;

  // ~~~~~~~~~ SimulationNodeDatum ~~~~~~~~~ //
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;

  constructor(
    node: Node,
    $svg: d3.Selection<SVGGElement, D3Relationship, SVGGElement, unknown>
  ) {
    super(node.name, node.nodeType);
    this.$selection = this._append($svg);

    this.d3_Circle = new D3Circle(this.$selection);
    this.d3_Label = new D3Label(this.$selection);

    EventBus.addEventListener(D3Simulation.TICK_EVENT, this.onTicked);
    D3DragHandler.applyDragHandler(this.$selection as any);
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

  onTicked = (): void => {
    this.$selection.attr("transform", function (d: any) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  };
}
