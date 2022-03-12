import TinyComp, { TinyCompOptions } from "tiny-comp";
import attributeGrammar from "../grammar/attributeGrammar";
import { LiveData } from "./Observable";

const compilerOptions: TinyCompOptions = {
	startSymbol: "GRAPH",
	ignoreTokensNamed: ["whitespace"],
};

export default class CompilerModel {
	static compiler = new TinyComp(attributeGrammar, compilerOptions);
	static graph: LiveData = new LiveData(null);
}
