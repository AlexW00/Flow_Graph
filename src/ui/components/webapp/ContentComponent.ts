import Component from "../Component";
import PreviewComponent from "../preview/PreviewComponent";
import InputSidebarComponent from "./InputSidebarComponent";

export default class ContentComponent extends Component {
	previewComponent: PreviewComponent;
	inputSidebarComponent: InputSidebarComponent;

	constructor() {
		super();
		this.inputSidebarComponent = new InputSidebarComponent();
		this.previewComponent = new PreviewComponent();
	}

	protected _render(): HTMLElement | SVGElement {
		this.$root = Component.cloneTemplate("content-template");

		this.$root.appendChild(this.inputSidebarComponent.html());
		this.$root.appendChild(this.previewComponent.html());

		return this.$root;
	}
}
