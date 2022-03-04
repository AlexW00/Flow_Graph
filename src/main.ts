import "./style.css";
import TinyComp, { TinyCompOptions } from "tiny-comp";
import attributeGrammar from "./grammar/attributeGrammar";
import Graph from "./graph/Graph";
import D3Graph from "./d3/D3Graph";
import D3_CONFIG from "./d3/D3_CONFIG";

const compilerOptions: TinyCompOptions = {
  startSymbol: "GRAPH",
  ignoreTokensNamed: ["whitespace"],
};
const resetSvg = (svg: SVGSVGElement) => {
  svg.innerHTML = "";
};

let inputString = `"Hello"--(-1)-->[[World]]
"Hello"--(/2)-->[[World2]]
[[World]]---->"Hello2"
"Hello2"--(*2)-->[[World2]]
"Hello2"---->"Hello"`;
const compiler = new TinyComp(attributeGrammar, compilerOptions);

let graph = compiler.compile(inputString) as Graph;

const app = document.querySelector<HTMLDivElement>("#app")!;
const svg = document.querySelector<SVGSVGElement>("#svg")!;
app.appendChild(svg);

let d3graph = new D3Graph(graph, document);

const input = document.querySelector("#input")!;
const button = document.querySelector("#submit")!;
button.addEventListener("click", () => {
  d3graph.delete();
  const newInput = input.value.replace(/\s/g, "");
  graph = compiler.compile(newInput) as Graph;
  d3graph = new D3Graph(graph, document);
});
input.value = inputString;
