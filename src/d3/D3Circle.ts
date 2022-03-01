import D3Appendable from "./D3Appendable";
import D3Node from "./D3Node";
import D3_CONFIG from "./D3_CONFIG";

export default class D3Circle implements D3Appendable {
  $selection: d3.Selection<SVGCircleElement, D3Node, SVGGElement, unknown>;
  radius: number;

  constructor(
    $svg: d3.Selection<SVGGElement, D3Node, any, unknown>,
    nodeWeigth: number
  ) {
    this.radius = this.getRadiusFromNodeWeigth(nodeWeigth);
    this.$selection = this._append($svg);
  }

  updateRadius(nodeWeigth: number) {
    this.radius = this.getRadiusFromNodeWeigth(nodeWeigth);
    this.$selection.attr("r", this.radius);
  }

  getRadiusFromNodeWeigth(nodeWeigth: number) {
    return nodeWeigth;
  }

  _append($svg: d3.Selection<SVGGElement, D3Node, SVGGElement, unknown>) {
    return $svg
      .append("circle")
      .attr("r", this.radius)
      .attr("fill", () => {
        return D3_CONFIG.color("1");
      });
  }
}
