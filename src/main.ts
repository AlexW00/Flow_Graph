import "./style.css";
import TinyComp, { TinyCompOptions } from "tiny-comp";
import attributeGrammar from "./grammar/attributeGrammar";
import Graph from "./graph/Graph";
import D3Graph from "./d3/D3Graph";
import D3_CONFIG from "./d3/D3_CONFIG";
import SettingsModel from "./utils/WebModel";

const compilerOptions: TinyCompOptions = {
  startSymbol: "GRAPH",
  ignoreTokensNamed: ["whitespace"],
};

let inputString = D3_CONFIG.website.startInput;
const compiler = new TinyComp(attributeGrammar, compilerOptions);

let graph = compiler.compile(inputString) as Graph;

const app = document.querySelector<HTMLDivElement>("#app")!;
const svg = document.querySelector<SVGSVGElement>("#svg")!;

const settingsButton =
    document.querySelector<HTMLButtonElement>("#settings_button")!,
  settingsContainer = document.querySelector<HTMLDivElement>(
    "#settings_container"
  )!;

function toggleSettings() {
  settingsContainer.classList.toggle("invisible");
}

settingsButton.addEventListener("click", () => toggleSettings());

const nodeColorPicker =
    document.querySelector<HTMLInputElement>("#node_color")!,
  linkColorPicker = document.querySelector<HTMLInputElement>("#link_color")!;

nodeColorPicker.value = D3_CONFIG.node.fillColor;
linkColorPicker.value = D3_CONFIG.link.strokeColor;

nodeColorPicker?.addEventListener("change", (e) => {
  const newColor = (e.target as HTMLInputElement).value;
  SettingsModel.nodeColor.value = newColor;
});
linkColorPicker?.addEventListener("change", (e) => {
  const newColor = (e.target as HTMLInputElement).value;
  SettingsModel.linkColor.value = newColor;
});

app.appendChild(svg);

let d3graph = new D3Graph(graph, document);

const input = document.querySelector<HTMLInputElement>("#input")!;
input.value = inputString;

const button = document.querySelector("#submit")!;
button.addEventListener("click", () => {
  d3graph.delete();
  const newInput = (input as HTMLInputElement).value;
  graph = compiler.compile(newInput) as Graph;
  d3graph = new D3Graph(graph, document);
});
