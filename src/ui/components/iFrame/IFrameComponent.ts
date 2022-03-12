import Component from "../Component";
import PreviewComponent from "../preview/PreviewComponent";

export default class IFrameComponent extends Component {
	previewComponent: PreviewComponent;

	constructor() {
		super();
		this.previewComponent = new PreviewComponent(true);
	}

	protected _render(): HTMLElement | SVGElement {
		this.$root = document.createElement("div");
		this.$root.classList.add(...["w-screen", "h-screen"]);
		this.$root.appendChild(this.previewComponent.html());
		return this.$root;
	}
}
