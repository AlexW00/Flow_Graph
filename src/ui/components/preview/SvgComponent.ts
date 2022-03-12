import Component from "../Component";
import D3Graph from "../../../d3/D3Graph";
import CompilerModel from "../../../utils/CompilerModel";
import { LiveData } from "../../../utils/Observable";
import InputModel from "../../../utils/InputModel";

// ====================================================== //
// ==================== SvgComponent ==================== //
// ====================================================== //

export default class SvgComponent extends Component {
	private d3Graph: D3Graph | undefined;

	constructor() {
		super();
		CompilerModel.graph.addEventListener(LiveData.EVENT_DATA_CHANGED, () =>
			this._renderGraph()
		);
		this._tryCompileGraph();
	}

	protected _render(): SVGElement {
		this.$root = Component.cloneTemplate("svg-template") as SVGElement;
		return this.$root;
	}

	private _tryCompileGraph() {
		try {
			const input = InputModel.inputString.value,
				graph = CompilerModel.compiler.compile(input);
			CompilerModel.graph.value = graph;
		} catch (e: any) {
			console.log(e);
		}
	}

	private _renderGraph() {
		if (this.d3Graph !== undefined) this.d3Graph.delete();
		if (CompilerModel.graph.value !== undefined)
			this.d3Graph = new D3Graph(
				CompilerModel.graph.value,
				this.$root as SVGElement
			);
	}
}
