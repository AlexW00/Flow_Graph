import TinyComp, { TinyCompOptions } from "tiny-comp";
import attributeGrammar from "./grammar/attributeGrammar.js";
import express from "express";
import jsdom from "jsdom";
import Graph from "./graph/Graph.js";
import D3Graph from "./d3/D3Graph.js";

const compilerOptions: TinyCompOptions = {
  startSymbol: "GRAPH",
  ignoreTokensNamed: ["whitespace"],
};

const inputString = `"hello"-(+10,2)->[[yooo]] "hello"-(+10,2)->[[yooo]]`;
const compiler = new TinyComp(attributeGrammar, compilerOptions);

const graph = compiler.compile(inputString) as Graph;
const dom = new jsdom.JSDOM(
  `<!DOCTYPE html><body><svg width=500 height=500></svg></body>`
);
const d3graph = new D3Graph(graph, dom.window.document);

console.log(dom.serialize());

const app = express();
app.get("/", function (req, res) {
  // return jsdom
  try {
    res.send(dom.serialize());
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000);
