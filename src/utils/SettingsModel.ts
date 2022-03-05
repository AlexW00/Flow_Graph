import D3_CONFIG from "../d3/D3_CONFIG";
import { LiveData } from "./Observable";

export default class SettingsModel {
  static nodeColor: LiveData = new LiveData(D3_CONFIG.node.fillColor);
  static linkColor: LiveData = new LiveData(D3_CONFIG.link.strokeColor);

  static init(data: string) {
    try {
      // ugly but works for now
      const parsedData = JSON.parse(data);
      if (parsedData.nodeColor) {
        SettingsModel.nodeColor.value = parsedData.nodeColor;
      }
      if (parsedData.linkColor) {
        SettingsModel.linkColor.value = parsedData.linkColor;
      }
    } catch (e) {
      console.error(e);
    }
  }

  static exportString(): string {
    const data = {
      nodeColor: SettingsModel.nodeColor.value,
      linkColor: SettingsModel.linkColor.value,
    };
    return JSON.stringify(data);
  }
}
