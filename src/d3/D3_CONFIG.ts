import * as d3 from "d3";

const D3_CONFIG = {
  color: d3.scaleOrdinal(d3.schemeCategory10),
  particle: {
    travelTime: 1000,
    radius: 5,
    fill: "#000",
  },
};

export default D3_CONFIG;
