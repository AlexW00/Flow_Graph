import D3_CONFIG from "../../../d3/D3_CONFIG";
import Graph from "../../../graph/Graph";
import CompilerModel from "../../../utils/CompilerModel";
import InputModel from "../../../utils/InputModel";
import SettingsModel from "../../../utils/SettingsModel";
import Component from "../Component";
import ShareButtonComponent from "./ShareButtonComponent";
import SharePopupComponent from "./SharePopupComponent";

export default class InputSidebarComponent extends Component {
	$renderButton: HTMLInputElement | undefined;

	$errorBox: HTMLDivElement | undefined;
	$errorMessage: HTMLDivElement | undefined;
	shareButtonComponent: ShareButtonComponent;
	$shareButton: HTMLElement | undefined;

	constructor() {
		super();
		this.shareButtonComponent = new ShareButtonComponent();
	}

	protected _render(): HTMLElement {
		this.$root = Component.cloneTemplate(
			"inputSidebar-template"
		) as HTMLElement;

		this.$renderButton =
			this.$root.querySelector<HTMLInputElement>("#submit_button")!;
		this.$errorBox = this.$root.querySelector<HTMLDivElement>("#error_box")!;
		this.$errorMessage =
			this.$root.querySelector<HTMLDivElement>("#error_message")!;
		this.helpButtonController(
			this.$root.querySelector<HTMLButtonElement>("#help_button")!
		);
		this.inputController(this.$root.querySelector<HTMLInputElement>("#input")!);
		this.$renderButton.addEventListener("click", () => {
			console.log("click");
			const newInput = InputModel.inputString.value;
			CompilerModel.graph.value = CompilerModel.compiler.compile(newInput);
			console.log(CompilerModel.graph);
		});

		this.$shareButton = this.shareButtonComponent.html();
		this.$root
			.querySelector("#input-button-bar")
			?.appendChild(this.$shareButton!);

		return this.$root;
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
				CompilerModel.compiler.compile(InputModel.inputString.value) as Graph;
				this.toggleErrorBox(false, null);
				this.toggleBlueButton(true, this.$renderButton!);
				this.toggleBlueButton(true, this.$shareButton!); // TODO: replace with function
			} catch (e: any) {
				this.toggleErrorBox(true, e.message);
				this.toggleBlueButton(false, this.$renderButton!);
				this.toggleBlueButton(false, this.$shareButton!);
			}
		});

		input.value = InputModel.inputString.value;
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
}
