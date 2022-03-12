import Component from "../Component";
import SharePopupComponent from "./SharePopupComponent";

export default class ShareButtonComponent extends Component {
	sharePopupComponent: SharePopupComponent;

	protected _render(): HTMLElement {
		this.$root = Component.cloneTemplate("share_button");
		this.sharePopupComponent = new SharePopupComponent(this.$root);
		this.$root.appendChild(this.sharePopupComponent.html());
		this.shareButtonController(this.$root as HTMLInputElement);
		return this.$root;
	}

	shareButtonController(shareButton: HTMLInputElement) {
		shareButton.addEventListener("click", () => {
			this.sharePopupComponent.toggle();
		});
	}
}
