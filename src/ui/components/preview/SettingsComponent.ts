import SettingsModel from "../../../utils/SettingsModel";
import Component from "../Component";

// ====================================================== //
// ================== SettingsComponent ================= //
// ====================================================== //

export default class SettingsComponent extends Component {
	protected _render(): HTMLElement {
		this.$root = Component.cloneTemplate("settings-template") as HTMLElement;

		this.$root.classList.remove("hidden");
		this._nodeColorPickerController(
			this.$root.querySelector<HTMLInputElement>("#node_color")!
		);
		this._linkColorPickerController(
			this.$root.querySelector<HTMLInputElement>("#link_color")!
		);
		this._settingsButtonController(
			this.$root.querySelector<HTMLButtonElement>("#settings_button")!,
			this.$root.querySelector<HTMLDivElement>("#settings_container")!
		);
		return this.$root;
	}

	private _nodeColorPickerController = (nodeColorPicker: HTMLInputElement) => {
		nodeColorPicker.value = SettingsModel.nodeColor.value;
		nodeColorPicker.addEventListener("change", (e) => {
			const newColor = (e.target as HTMLInputElement).value;
			SettingsModel.nodeColor.value = newColor;
		});
	};

	private _linkColorPickerController = (linkColorPicker: HTMLInputElement) => {
		linkColorPicker.value = SettingsModel.linkColor.value;
		linkColorPicker.addEventListener("change", (e) => {
			const newColor = (e.target as HTMLInputElement).value;
			SettingsModel.linkColor.value = newColor;
		});
	};

	private _settingsButtonController = (
		settingsButton: HTMLButtonElement,
		settingsContainer: HTMLDivElement
	): HTMLButtonElement => {
		settingsButton.addEventListener("click", () => toggleSettings());

		function toggleSettings() {
			settingsContainer.classList.toggle("invisible");
		}

		return settingsButton;
	};
}
