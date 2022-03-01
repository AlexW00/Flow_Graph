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

const inputString = `"Hello"--(-1)-->[[World]] "Hello"--(/2)-->[[World2]] [[World]]---->"Hello2" "Hello2"--(*2)-->[[World2]]  "Hello2"---->"Hello"`;
const compiler = new TinyComp(attributeGrammar, compilerOptions);

const graph = compiler.compile(inputString) as Graph;

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1 class="input-text">${inputString}</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
  <svg width=${D3_CONFIG.svg.width} height=${D3_CONFIG.svg.height}></svg>
`;

const d3graph = new D3Graph(graph, document);
