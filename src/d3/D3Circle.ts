import { Event, LiveData } from "../utils/Observable";
import WebModel from "../web/WebModel";
import D3Appendable from "./D3Appendable";
import D3Node from "./D3Node";

export default class D3Circle implements D3Appendable {
  $selection: d3.Selection<SVGCircleElement, D3Node, SVGGElement, unknown>;
  radius: number;

  constructor(
    $svg: d3.Selection<SVGGElement, D3Node, any, unknown>,
    radius: number
  ) {
    this.radius = radius;

    this.$selection = this._append($svg);
    WebModel.nodeColor.addEventListener(
      LiveData.EVENT_DATA_CHANGED,
      (e: Event) => this._changeColor(e.data)
    );
  }

  _changeColor(color: string) {
    this.$selection.attr("fill", color);
  }

  updateRadius(radius: number) {
    this.radius = radius;
    this.$selection.attr("r", this.radius);
  }

  _append($svg: d3.Selection<SVGGElement, D3Node, SVGGElement, unknown>) {
    return $svg
      .append("circle")
      .attr("r", this.radius)
      .attr("fill", WebModel.nodeColor.data);
  }
}
