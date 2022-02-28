import D3Appendable from "./D3Appendable";

export default class D3Labels implements D3Appendable {
  $selection: d3.Selection<any, any, any, undefined>;

  constructor(d3_NodesSelection: d3.Selection<any, any, any, undefined>) {
    this.$selection = this._appendToSvg(d3_NodesSelection);
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
