import D3_CONFIG from "../d3/D3_CONFIG";
import { LiveData } from "./Observable";

// ====================================================== //
// ==================== SettingsModel =================== //
// ====================================================== //

//  helper function to retrieve settings from url  //

const _getSettingsFromUrl = (): {
	nodeColor: string | undefined;
	linkColor: string | undefined;
} => {
	const url = new URL(window.location.href),
		urlSettings = url.searchParams.get("settings"),
		retrunSettings = { nodeColor: undefined, linkColor: undefined };
	if (!urlSettings) return retrunSettings;
	try {
		// ugly but works for now
		const parsedData = JSON.parse(urlSettings);
		retrunSettings.nodeColor = parsedData.nodeColor;
		retrunSettings.linkColor = parsedData.linkColor;
	} catch (e) {
		console.error(e);
	}
	return retrunSettings;
};

// ~~~~~~~~~~~~~~ the model ~~~~~~~~~~~~~~ //

export default class SettingsModel {
	static nodeColor: LiveData = new LiveData(
		_getSettingsFromUrl().nodeColor ?? D3_CONFIG.node.fillColor
	);
	static linkColor: LiveData = new LiveData(
		_getSettingsFromUrl().linkColor ?? D3_CONFIG.link.strokeColor
	);

	static exportString(): string {
		const data = {
			nodeColor: SettingsModel.nodeColor.value,
			linkColor: SettingsModel.linkColor.value,
		};
		return JSON.stringify(data);
	}
}
