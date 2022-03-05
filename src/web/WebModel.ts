import D3_CONFIG from "../d3/D3_CONFIG";
import { LiveData } from "../utils/Observable";

export default class WebModel {
  static nodeColor: LiveData = new LiveData(D3_CONFIG.node.fillColor);
  static linkColor: LiveData = new LiveData(D3_CONFIG.link.strokeColor);
}
