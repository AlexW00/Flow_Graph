import D3_CONFIG from "../../../d3/D3_CONFIG";
import Graph from "../../../graph/Graph";
import CompilerModel from "../../../utils/CompilerModel";
import InputModel from "../../../utils/InputModel";
import SettingsModel from "../../../utils/SettingsModel";
import Component from "../Component";

export default class InputSidebarComponent extends Component {
	$renderButton: HTMLInputElement | undefined;
	$shareButton: HTMLInputElement | undefined;
	$errorBox: HTMLDivElement | undefined;
	$errorMessage: HTMLDivElement | undefined;
	$sharePopup: HTMLDivElement | undefined;
	$sharePopupUrlInput: HTMLInputElement | undefined;
	$sharePopupIframeInput: HTMLInputElement | undefined;

	protected _render(): HTMLElement {
		this.$root = Component.cloneTemplate(
			"inputSidebar-template"
		) as HTMLElement;

		this.$renderButton =
			this.$root.querySelector<HTMLInputElement>("#submit_button")!;
		this.$shareButton =
			this.$root.querySelector<HTMLInputElement>("#share_button")!;
		this.$sharePopup =
			this.$root.querySelector<HTMLDivElement>("#share_popup")!;
		this.$sharePopupUrlInput =
			this.$root.querySelector<HTMLInputElement>("#export_url_field")!;
		this.$sharePopupIframeInput = this.$root.querySelector<HTMLInputElement>(
			"#export_iframe_field"
		)!;

		console.log(this.$root);

		this.sharePopupCopyUrlButtonController(
			this.$root.querySelector<HTMLButtonElement>("#export_url_copy_button")!
		);
		this.sharePopupCopyIframeController(
			this.$root.querySelector<HTMLButtonElement>("#export_iframe_copy_button")!
		);

		this.$errorBox = this.$root.querySelector<HTMLDivElement>("#error_box")!;
		this.$errorMessage =
			this.$root.querySelector<HTMLDivElement>("#error_message")!;
		this.helpButtonController(
			this.$root.querySelector<HTMLButtonElement>("#help_button")!
		);

		return this.$root;
	}

	shareButtonController(shareButton: HTMLInputElement) {
		shareButton.addEventListener("click", () => {
			this.positionSharePopup();
			const isInvisibile = this.$sharePopup!.classList.toggle("invisible");
			if (!isInvisibile) {
				this.setExportTexts();
			}
		});
	}

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
			popupHeight = this.$shareButton!.offsetHeight,
			popupWidth = this.$shareButton!.offsetWidth;

		this.$shareButton!.style.left = `${
			left - popupWidth / 2 + shareButtonWidth / 2
		}px`;
		this.$shareButton!.style.top = `${top - popupHeight - 10}px`;
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

	helpButtonController = (helpButton: HTMLButtonElement) => {
		helpButton.addEventListener("click", () => {
			window.open("https://github.com/" + D3_CONFIG.website.githubRepo);
		});
	};

	inputController = (input: HTMLInputElement) => {
		input.addEventListener("input", (e) => {
			InputModel.inputString.value = (e.target as HTMLInputElement).value;
			try {
				const graph = CompilerModel.compiler.compile(
					InputModel.inputString.value
				) as Graph;
				CompilerModel.graph.value = graph;
				this.toggleErrorBox(false, null);
				this.toggleBlueButton(true, this.$renderButton!);
				this.toggleBlueButton(true, this.$shareButton!);
			} catch (e: any) {
				this.toggleErrorBox(true, e.message);
				this.toggleBlueButton(false, this.$renderButton!);
				this.toggleBlueButton(false, this.$shareButton!!);
			}
		});
	};

	toggleErrorBox(doShow: boolean, message: string | null) {
		if (message) this.$errorMessage!.innerText = message;
		this.$errorBox!.classList.toggle("hidden", !doShow);
	}

	toggleBlueButton(
		doActivate: boolean,
		button: HTMLButtonElement | HTMLInputElement
	) {
		const disabledButtonClasses = [
				"bg-gray-500",
				"hover:bg-gray-400",
				"border-gray-700",
				"hover:border-gray-500",
			],
			enabledButtonClasses = [
				"bg-blue-500",
				"hover:bg-blue-400",
				"border-blue-700",
				"hover:border-blue-500",
			];
		button.disabled = !doActivate;
		if (!doActivate) {
			button.classList.remove(...enabledButtonClasses);
			button.classList.add(...disabledButtonClasses);
		} else {
			button.classList.remove(...disabledButtonClasses);
			button.classList.add(...enabledButtonClasses);
		}
	}

	closeSharePopup() {
		this.$sharePopup!.classList.add("invisible");
	}
}
