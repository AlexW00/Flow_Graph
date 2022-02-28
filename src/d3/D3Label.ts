import D3Appendable from "./D3Appendable";
import D3Node from "./D3Node";

export default class D3Label implements D3Appendable {
  $selection: d3.Selection<any, any, any, undefined>;

  constructor($svg: d3.Selection<SVGGElement, D3Node, any, unknown>) {
    this.$selection = this._appendToSvg($svg);
  }

  _appendToSvg($svg: d3.Selection<any, any, any, undefined>) {
    return $svg
      .append("text")
      .text(function (d) {
        return d.name;
      })
      .attr("x", 0)
      .attr("y", 0);
  }
}
