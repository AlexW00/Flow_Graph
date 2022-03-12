import InputModel from "../../../utils/InputModel";
import SettingsModel from "../../../utils/SettingsModel";
import Component from "../Component";

export default class SharePopupComponent extends Component {
	$shareButton: HTMLInputElement | undefined;
	$sharePopupUrlInput: HTMLInputElement | undefined;
	$sharePopupIframeInput: HTMLInputElement | undefined;

	constructor($shareButton: HTMLInputElement) {
		super();
		this.$shareButton = $shareButton;
	}

	protected _render(): HTMLElement {
		this.$root = Component.cloneTemplate("share-popup-template");
		this.$sharePopupUrlInput =
			document.querySelector<HTMLInputElement>("#export_url_field")!;
		this.$sharePopupIframeInput = document.querySelector<HTMLInputElement>(
			"#export_iframe_field"
		)!;

		this._sharePopupCopyUrlButtonController(
			document.querySelector<HTMLButtonElement>("#export_url_copy_button")!
		);
		this._sharePopupCopyIframeController(
			document.querySelector<HTMLButtonElement>("#export_iframe_copy_button")!
		);

		return this.$root as HTMLElement;
	}

	toggle = () => {
		this._positionSharePopup();
		const isInvisibile = this.$root!.classList.toggle("invisible");
		if (!isInvisibile) {
			this._setExportTexts();
		}
	};

	private _setExportTexts() {
		this._setExportUrl();
		this._setExportIframe();
	}

	private _getWindowUrl(): string {
		return window.location.origin + window.location.pathname;
	}

	private _setExportUrl() {
		const url = `${this._getWindowUrl()}?input=${encodeURIComponent(
			InputModel.inputString.value
		)}&settings=${encodeURIComponent(SettingsModel.exportString())}`;
		this.$sharePopupUrlInput!.value = url;
	}

	private _setExportIframe() {
		const url = `${this._getWindowUrl()}?input=${encodeURIComponent(
			InputModel.inputString.value
		)}&settings=${encodeURIComponent(
			SettingsModel.exportString()
		)}&iframe=true`;
		this.$sharePopupIframeInput!.value = `<iframe src="${url}" width="500px" height="500px" frameborder="0"></iframe>`;
	}

	private _positionSharePopup() {
		const { left, top } = this.$shareButton!.getBoundingClientRect(),
			shareButtonWidth = this.$shareButton!.offsetWidth,
			popupHeight = (this.$root as HTMLElement).offsetHeight,
			popupWidth = (this.$root as HTMLElement).offsetWidth;

		this.$root!.style.left = `${
			left - popupWidth / 2 + shareButtonWidth / 2
		}px`;
		this.$root!.style.top = `${top - popupHeight - 10}px`;
	}

	private _sharePopupCopyIframeController(
		sharePopupCopyIframeButton: HTMLButtonElement
	) {
		sharePopupCopyIframeButton.addEventListener("click", () => {
			const url = this.$sharePopupIframeInput!.value;
			navigator.clipboard.writeText(url);
			this.closeSharePopup();
		});
	}

	private _sharePopupCopyUrlButtonController(
		sharePopupCopyUrlButton: HTMLButtonElement
	) {
		sharePopupCopyUrlButton.addEventListener("click", () => {
			const url = this.$sharePopupUrlInput!.value;
			navigator.clipboard.writeText(url);
			this.closeSharePopup();
		});
	}

	closeSharePopup() {
		this.$root!.classList.add("invisible");
	}
}
