import Component from "../Component";
import ContentComponent from "./ContentComponent";
import NavbarComponent from "./NavbarComponent";

export default class WebappComponent extends Component {
	navbarComponent: NavbarComponent;
	contentComponent: ContentComponent;

	constructor() {
		super();
		this.navbarComponent = new NavbarComponent();
		this.contentComponent = new ContentComponent();
	}

	protected _render(): HTMLElement | SVGElement {
		this.$root = document.createElement("div");
		this.$root.appendChild(this.navbarComponent.html());
		this.$root.appendChild(this.contentComponent.html());
		return this.$root;
	}
}
