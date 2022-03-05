import D3Graph from "./D3Graph";
import D3Node from "./D3Node";

class D3Simulation {
  static simulation: d3.Simulation<d3.SimulationNodeDatum, undefined> | null =
    null;
  static TICK_EVENT = "d3_tick";
  static isActive = false;

  // ignore ts lint

  static updateChargeForceStrength() {
    D3Simulation.simulation
      ?.force("charge")
      // @ts-ignore
      ?.strength(D3Simulation.chargeForceStrength);
  }

  static chargeForceStrength(d3Node: D3Node): number {
    return -Math.pow(d3Node.weightToRadius(), 2.0) * 0.2;
  }

  static create(d3: any): d3.Simulation<d3.SimulationNodeDatum, undefined> {
    if (D3Simulation.simulation) return D3Simulation.simulation;
    D3Simulation.simulation = d3
      .forceSimulation()
      .force(
        "x",
        d3.forceX().x(function () {
          return D3Graph.width / 2;
        })
      )
      .force(
        "y",
        d3.forceY().y(function () {
          return D3Graph.height / 2;
        })
      )
      .force("charge", d3.forceManyBody().strength(this.chargeForceStrength));
    return D3Simulation.simulation!;
  }
}

export default D3Simulation;
