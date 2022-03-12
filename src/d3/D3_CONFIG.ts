import * as d3 from "d3";

const D3_CONFIG = {
	colorScale: d3.scaleOrdinal(d3.schemeCategory10),
	particle: {
		travelTime: 1000,
		radius: 7,
		fill: "#000",
		textColor: "white",
		colors: {
			plus: "#009900",
			minus: "#ff3300",
			divide: "#cc0000",
			multiply: "#336600",
		},
	},
	link: {
		strokeWidth: 1,
		strokeColor: "#808080",
		arrow: {
			width: 10,
			height: 10,
		},
	},
	node: {
		weightToRadiusCoefficient: 0.5,
		fillColor: "#0284C7",
	},

	website: {
		startInput: `"Photosynthesis"--(+10)-->"Energy"
"Photosynthesis"--(-3)-->"CO2"
"Photosynthesis"--(+3)-->"O2"
"Energy"---->"Growth"
"Growth"---->"Size"
"Size"---->"Photosynthesis"
        `,
		helpLink: "https://github.com/AlexW00/Flow_Graph#-documentation",
	},
};

export default D3_CONFIG;
