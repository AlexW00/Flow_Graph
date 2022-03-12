import Component from "../Component";
import SharePopupComponent from "./SharePopupComponent";

// ====================================================== //
// ================ ShareButtonComponent ================ //
// ====================================================== //

export default class ShareButtonComponent extends Component {
	sharePopupComponent: SharePopupComponent | undefined;

	protected _render(): HTMLInputElement {
		this.$root = Component.cloneTemplate(
			"share-button-template"
		) as HTMLInputElement;
		this.sharePopupComponent = new SharePopupComponent(
			this.$root as HTMLInputElement
		);
		this.$root.parentElement?.appendChild(this.sharePopupComponent.html());
		this.shareButtonController(this.$root as HTMLInputElement);
		return this.$root as HTMLInputElement;
	}

	shareButtonController(shareButton: HTMLInputElement) {
		shareButton.addEventListener("click", () => {
			this.sharePopupComponent?.toggle();
		});
	}
}
