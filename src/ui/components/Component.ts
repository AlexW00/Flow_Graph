// ====================================================== //
// ====================== Component ===================== //
// ====================================================== //

export default abstract class Component {
	protected $root: HTMLElement | SVGElement | undefined;

	protected abstract _render(): HTMLElement | SVGElement;

	html(): HTMLElement | SVGElement {
		return this.$root ?? this._render();
	}

	static cloneTemplate(id: string): HTMLElement | SVGElement {
		const template = document.querySelector<HTMLElement | SVGElement>(
			`#${id}`
		)!;
		template.classList.remove("hidden");
		return template;
	}
}
