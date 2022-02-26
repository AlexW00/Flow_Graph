import TinyComp, { TinyCompOptions } from "tiny-comp";
import attributeGrammar from "./grammar/attributeGrammar";

const compilerOptions: TinyCompOptions = {
  startSymbol: "GRAPH",
  ignoreTokensNamed: ["whitespace"],
};

const inputString = `"hello"-(+10,2)->"world"`;

const compiler = new TinyComp(attributeGrammar, compilerOptions);
const compileResult = compiler.compile(inputString);

console.log("Input string: " + inputString);
console.log(JSON.stringify(compileResult, null, 2));
