import Component from "../Component";
import SettingsComponent from "./SettingsComponent";
import SvgComponent from "./SvgComponent";

// ====================================================== //
// ================== PreviewComponent ================== //
// ====================================================== //

export default class PreviewComponent extends Component {
	settingsComponent: SettingsComponent;
	svgComponent: SvgComponent;

	constructor() {
		super();
		this.settingsComponent = new SettingsComponent();
		this.svgComponent = new SvgComponent();
	}

	protected _render(): HTMLElement {
		this.$root = Component.cloneTemplate("playground-template") as HTMLElement;
		this.$root.appendChild(this.settingsComponent.html());
		this.$root.appendChild(this.svgComponent.html());
		return this.$root;
	}
}
