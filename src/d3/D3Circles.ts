import D3Appendable from "./D3Appendable";
import Node from "../graph/Node";

export default class D3Circles implements D3Appendable {
  $selection: d3.Selection<SVGCircleElement, Node, SVGGElement, unknown>;
  private _d3_color: d3.ScaleOrdinal<string, string>;

  constructor(
    d3_NodesSelection: d3.Selection<SVGGElement, Node, SVGGElement, unknown>,
    d3_color: d3.ScaleOrdinal<string, string>
  ) {
    this._d3_color = d3_color;
    this.$selection = this._appendToSvg(d3_NodesSelection);
  }

  _appendToSvg($svg: d3.Selection<SVGGElement, Node, SVGGElement, unknown>) {
    return $svg
      .append("circle")
      .attr("r", 75)
      .attr("fill", () => {
        return this._d3_color("1");
      });
  }
}
