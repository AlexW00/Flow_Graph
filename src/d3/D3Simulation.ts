import D3Tickable from "./D3Tickable";

class D3Simulation {
  static simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;
  static TICK_EVENT = "d3_tick";

  static create(
    d3: any,
    context: any
  ): d3.Simulation<d3.SimulationNodeDatum, undefined> {
    if (D3Simulation.simulation) return D3Simulation.simulation;
    D3Simulation.simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id((d: any) => d.name)
          .strength(0.1)
          .distance(250)
      )
      .force("charge", d3.forceManyBody())
      //.force("center", d3.forceCenter(context.width / 2, context.height / 2))
      .force("collisionForce", d3.forceCollide(75));
    return D3Simulation.simulation;
  }

  static startTickingOn(nodes: any, d3Tickables: D3Tickable[]) {
    if (!D3Simulation.simulation) throw new Error("Simulation not initialized");
    D3Simulation.simulation.nodes(nodes).on("tick", () => {
      d3Tickables.forEach((d3Tickable: D3Tickable) => {
        d3Tickable.onTicked();
      });
    });
  }
}

export default D3Simulation;
