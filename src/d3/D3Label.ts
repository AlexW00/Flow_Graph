import D3Appendable from "./D3Appendable";
import D3Node from "./D3Node";

export default class D3Label implements D3Appendable {
	$selection: d3.Selection<any, any, any, undefined>;

	radius: number;

	constructor(
		$svg: d3.Selection<SVGGElement, D3Node, any, unknown>,
		radius: number
	) {
		this.radius = radius;
		this.$selection = this._append($svg);
	}

	updateTextSize(radius: number) {
		this.$selection.attr(
			"font-size",
			this._calculateFontSizeFromRadius(radius)
		);
	}

	_calculateFontSizeFromRadius(radius: number) {
		return radius / 4;
	}

	_append($svg: d3.Selection<any, any, any, undefined>) {
		return $svg
			.append("text")
			.text(function (d) {
				return d.name;
			})
			.attr("font-size", this._calculateFontSizeFromRadius(this.radius))
			.attr("text-anchor", "middle")
			.attr("dy", ".35em")
			.attr("x", 0)
			.attr("y", 0);
	}
}
