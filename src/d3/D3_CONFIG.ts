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
    startInput: `"Hello"--(-1)-->[[World]]
"Hello"--(-2)-->[[World2]]
[[World]]---->"Hello2"
"Hello2"--(+2)-->[[World2]]
"Hello2"---->"Hello"`,
    githubRepo: "AlexW00/Flow_Graph",
  },
};

export default D3_CONFIG;
