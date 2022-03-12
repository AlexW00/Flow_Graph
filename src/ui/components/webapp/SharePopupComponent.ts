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

	protected _render(): HTMLElement | SVGElement {
		this.$root = Component.cloneTemplate("share-popup-template");
		console.log("root");
		console.log(this.$root);
		this.$sharePopupUrlInput =
			document.querySelector<HTMLInputElement>("#export_url_field")!;
		this.$sharePopupIframeInput = document.querySelector<HTMLInputElement>(
			"#export_iframe_field"
		)!;

		this.sharePopupCopyUrlButtonController(
			document.querySelector<HTMLButtonElement>("#export_url_copy_button")!
		);
		this.sharePopupCopyIframeController(
			document.querySelector<HTMLButtonElement>("#export_iframe_copy_button")!
		);

		return this.$root;
	}

	toggle = () => {
		console.log(this);
		this.positionSharePopup();
		const isInvisibile = this.$root!.classList.toggle("invisible");
		if (!isInvisibile) {
			this.setExportTexts();
		}
	};

	setExportTexts() {
		this.setExportUrl();
		this.setExportIframe();
	}

	setExportUrl() {
		const url = `${window.location.href}?input=${encodeURIComponent(
			InputModel.inputString.value
		)}&settings=${encodeURIComponent(SettingsModel.exportString())}`;
		console.log(url);
		this.$sharePopupUrlInput!.value = url;
	}

	setExportIframe() {
		console.log(SettingsModel.exportString());
		const url = `${window.location.href}?input=${encodeURIComponent(
			InputModel.inputString.value
		)}&settings=${encodeURIComponent(
			SettingsModel.exportString()
		)}&iframe=true`;
		this.$sharePopupIframeInput!.value = `<iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>`;
	}

	positionSharePopup() {
		const { left, top } = this.$shareButton!.getBoundingClientRect(),
			shareButtonWidth = this.$shareButton!.offsetWidth,
			popupHeight = this.$root!.offsetHeight,
			popupWidth = this.$root!.offsetWidth;

		console.log(left, top, shareButtonWidth, popupHeight, popupWidth);
		this.$root!.style.left = `${
			left - popupWidth / 2 + shareButtonWidth / 2
		}px`;
		this.$root!.style.top = `${top - popupHeight - 10}px`;
	}

	sharePopupCopyIframeController(
		sharePopupCopyIframeButton: HTMLButtonElement
	) {
		sharePopupCopyIframeButton.addEventListener("click", () => {
			console.log("copy");
			const url = this.$sharePopupIframeInput!.value;
			navigator.clipboard.writeText(url);
			this.closeSharePopup();
		});
	}

	sharePopupCopyUrlButtonController(
		sharePopupCopyUrlButton: HTMLButtonElement
	) {
		sharePopupCopyUrlButton.addEventListener("click", () => {
			console.log("copy");
			const url = this.$sharePopupUrlInput!.value;
			navigator.clipboard.writeText(url);
			this.closeSharePopup();
		});
	}

	closeSharePopup() {
		this.$root!.classList.add("invisible");
	}
}
