import D3_CONFIG from "../d3/D3_CONFIG";
import { LiveData } from "./Observable";

// ====================================================== //
// ===================== InputModel ===================== //
// ====================================================== //

//  helper function to retrieve input from url  //

const _getInputFromUrl = (): string | null => {
	const url = new URL(window.location.href);
	return url.searchParams.get("input");
};

// ~~~~~~~~~~~~~~ the model ~~~~~~~~~~~~~~ //

export default class InputModel {
	static inputString: LiveData = new LiveData(
		_getInputFromUrl() ?? D3_CONFIG.website.startInput
	);
}
