import D3Appendable from "./D3Appendable";
import D3Node from "./D3Node";
import D3_CONFIG from "./D3_CONFIG";

export default class D3Circle implements D3Appendable {
  $selection: d3.Selection<SVGCircleElement, D3Node, SVGGElement, unknown>;

  constructor($svg: d3.Selection<SVGGElement, D3Node, any, unknown>) {
    this.$selection = this._appendToSvg($svg);
  }

  _appendToSvg($svg: d3.Selection<SVGGElement, D3Node, SVGGElement, unknown>) {
    return $svg
      .append("circle")
      .attr("r", 75)
      .attr("fill", () => {
        return D3_CONFIG.color("1");
      });
  }
}
