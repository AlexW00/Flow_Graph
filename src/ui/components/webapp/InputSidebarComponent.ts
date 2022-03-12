import D3_CONFIG from "../../../d3/D3_CONFIG";
import Graph from "../../../graph/Graph";
import CompilerModel from "../../../utils/CompilerModel";
import InputModel from "../../../utils/InputModel";
import Component from "../Component";
import ShareButtonComponent from "./ShareButtonComponent";

// ====================================================== //
// ================ InputSidebarComponent =============== //
// ====================================================== //

export default class InputSidebarComponent extends Component {
	$renderButton: HTMLInputElement | undefined;
	$errorBox: HTMLDivElement | undefined;
	$errorMessage: HTMLDivElement | undefined;
	$shareButton: HTMLButtonElement | undefined;
	shareButtonComponent: ShareButtonComponent;

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
		this._helpButtonController(
			this.$root.querySelector<HTMLButtonElement>("#help_button")!
		);

		this.$renderButton.addEventListener("click", () => {
			const newInput = InputModel.inputString.value;
			CompilerModel.graph.value = CompilerModel.compiler.compile(newInput);
		});

		this.$shareButton = this.shareButtonComponent.html() as HTMLButtonElement;
		this.$root
			.querySelector("#input-button-bar")
			?.appendChild(this.$shareButton!);
		this._inputController(
			this.$root.querySelector<HTMLInputElement>("#input")!
		);
		return this.$root;
	}

	private _helpButtonController = (helpButton: HTMLButtonElement) => {
		helpButton.addEventListener("click", () => {
			window.open(D3_CONFIG.website.helpLink);
		});
	};

	private _inputController = (input: HTMLInputElement) => {
		input.addEventListener("input", (e) =>
			this._onInput((e.target as HTMLInputElement).value)
		);

		input.value = InputModel.inputString.value;
		this._onInput(input.value);
	};

	private _onInput(newInput: string): any {
		InputModel.inputString.value = newInput;
		try {
			CompilerModel.compiler.compile(InputModel.inputString.value) as Graph;
			this._toggleErrorBox(false, null);
			this._toggleBlueButton(true, this.$renderButton!);
			this._toggleBlueButton(true, this.$shareButton!);
		} catch (e: any) {
			this._toggleErrorBox(true, e.message);
			this._toggleBlueButton(false, this.$renderButton!);
			this._toggleBlueButton(false, this.$shareButton!);
		}
	}

	private _toggleErrorBox(doShow: boolean, message: string | null) {
		if (message) this.$errorMessage!.innerText = message;
		this.$errorBox!.classList.toggle("hidden", !doShow);
	}

	private _toggleBlueButton(
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
