// ====================================================== //
// ======================== Node ======================== //
// ====================================================== //

import { Observable } from "../utils/Observable";

export default class Node extends Observable {
	// ~~~~~~~~~~~~~~~~~ Node ~~~~~~~~~~~~~~~~ //
	name!: string;
	nodeType!: NodeType;
	weight: number = 100;

	static nodes: Node[] = [];

	constructor(name: string, nodeType: NodeType) {
		const existingNode = Node.findNodeById(Node._generateId(name, nodeType));
		if (existingNode) return existingNode;
		super();
		// strip the quotes from the name
		this.name = name.replace(/['"]+/g, "");
		this.nodeType = nodeType;
	}

	id() {
		return Node._generateId(this.name, this.nodeType);
	}

	static _generateId(name: string, nodeType: NodeType) {
		return name + "-" + nodeType;
	}

	static findNodeById(id: string): Node | undefined {
		return Node.nodes.find((node) => node.id() === id);
	}
}

export enum NodeType {
	TEXT_NODE = "TEXT_NODE",
	REFERENCE_NODE = "REFERENCE_NODE",
}
