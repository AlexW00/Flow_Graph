import Component from "../Component";
import SettingsComponent from "./SettingsComponent";
import SvgComponent from "./SvgComponent";

// ====================================================== //
// ================== PreviewComponent ================== //
// ====================================================== //

export default class PreviewComponent extends Component {
	settingsComponent: SettingsComponent;
	svgComponent: SvgComponent;
	isIframe: boolean;

	constructor(isIframe: boolean) {
		super();
		this.isIframe = isIframe;
		this.settingsComponent = new SettingsComponent();
		this.svgComponent = new SvgComponent();
	}

	protected _render(): HTMLElement {
		this.$root = Component.cloneTemplate("preview-template") as HTMLElement;
		this.$root.classList.add(...this._getSizeClasses(this.isIframe));
		this.$root.appendChild(this.settingsComponent.html());
		this.$root.appendChild(this.svgComponent.html());
		return this.$root;
	}

	private _getSizeClasses(isIframe: boolean) {
		if (!isIframe) return ["w-3/4", "right-0", "m-1"];
		else return ["w-full", "h-full"];
	}
}
