import Component from "../Component";

// ====================================================== //
// =================== NavbarComponent ================== //
// ====================================================== //

export default class NavbarComponent extends Component {
	protected _render(): HTMLElement {
		this.$root = Component.cloneTemplate("navbar-template") as HTMLElement;
		return this.$root;
	}
}
