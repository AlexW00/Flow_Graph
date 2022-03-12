import D3_CONFIG from "../d3/D3_CONFIG";
import { LiveData } from "./Observable";

const _getInputFromUrl = (): string | null => {
	const url = new URL(window.location.href);
	return url.searchParams.get("input");
};

export default class InputModel {
	static inputString: LiveData = new LiveData(
		_getInputFromUrl() ?? D3_CONFIG.website.startInput
	);
}
