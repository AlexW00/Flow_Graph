import TinyComp, { TinyCompOptions } from "tiny-comp";
import attributeGrammar from "./grammar/attributeGrammar";

const compilerOptions: TinyCompOptions = {
  startSymbol: "GRAPH",
  ignoreTokensNamed: ["whitespace"],
};

const compiler = new TinyComp(attributeGrammar, compilerOptions);
const compileResult = compiler.compile(`"hello"-(+10,2)->"world"`);
console.log(JSON.stringify(compileResult, null, 2));
