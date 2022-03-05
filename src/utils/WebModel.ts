import D3_CONFIG from "../d3/D3_CONFIG";
import { LiveData } from "./Observable";

export default class SettingsModel {
  static nodeColor: LiveData = new LiveData(D3_CONFIG.node.fillColor);
  static linkColor: LiveData = new LiveData(D3_CONFIG.link.strokeColor);
}
