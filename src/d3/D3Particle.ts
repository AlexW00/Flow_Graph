import { Selection, SimulationNodeDatum } from "d3";
import { Event, EventBus, Observable } from "../utils/Observable";
import D3Appendable from "./D3Appendable";
import D3Node from "./D3Node";
import D3Relationship from "./D3Relationship";
import D3Simulation from "./D3Simulation";
import D3_CONFIG from "./D3_CONFIG";

export default class D3Particle
  extends Observable
  implements D3Appendable, SimulationNodeDatum
{
  static PARTICLE_DESTROYED_EVENT: string = "particleDestroyed";

  d3Relationship: D3Relationship;
  $selection: d3.Selection<SVGCircleElement, any, any, undefined>;

  // ~~~~~~~~~~~~~~~ Particle ~~~~~~~~~~~~~~ //
  id: string;
  radius: number = D3_CONFIG.particle.radius;
  creationTime = new Date().getTime(); // the creation time of the particle
  travelTime: number; // how long this particle will be alive
  travelVector: { x: number; y: number };

  // ~~~~~~~~~ SimulationNodeDatum ~~~~~~~~~ //
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;

  constructor(d3Relationship: D3Relationship) {
    super();
    this.d3Relationship = d3Relationship;
    this.id = d3Relationship.id() + "-" + this.creationTime;
    this.travelTime =
      this.d3Relationship.link.linkOptions.linkSpeed *
      D3_CONFIG.particle.travelTime;
    this.x = d3Relationship.d3Source.x;
    this.y = d3Relationship.d3Source.y;

    this.travelVector = this._calcTravelVector(
      d3Relationship.d3Target,
      d3Relationship.d3Source
    );

    this.$selection = this._append(d3Relationship.$selection);

    EventBus.addEventListener(D3Simulation.TICK_EVENT, this._update);
  }

  _append($svg: Selection<any, any, any, undefined>) {
    return $svg
      .append("g")
      .attr("class", "particles")
      .selectAll(".particles")
      .data([this], (d: any) => d.d3Relationship.id())
      .enter()
      .append("circle")
      .attr("cx", (d: any) => d.x)
      .attr("cy", (d: any) => d.y)
      .attr("r", (d: any) => d.radius)
      .attr("fill", function (d) {
        return "#000";
      });
  }

  _update = () => {
    const currentTime = new Date().getTime(),
      elapsedTime = currentTime - this.creationTime,
      progress = elapsedTime / this.travelTime;

    if (progress >= 1) this._destroy();

    this.travelVector = this._calcTravelVector(
      this.d3Relationship.d3Target,
      this.d3Relationship.d3Source
    );

    const newPos = this._calcPosition(progress);
    this.x = newPos.x;
    this.y = newPos.y;

    this.$selection
      .transition()
      .duration(0)
      .attr("cx", this.x)
      .attr("cy", this.y);
  };

  _calcPosition(progress: number) {
    return {
      x: this.d3Relationship.d3Source.x!! + this.travelVector.x!! * progress,
      y: this.d3Relationship.d3Source.y!! + this.travelVector.y!! * progress,
    };
  }

  _calcTravelVector(d3Target: D3Node, d3Source: D3Node) {
    return {
      x: d3Target.x!! - d3Source.x!!,
      y: d3Target.y!! - d3Source.y!!,
    };
  }

  _destroy() {
    EventBus.removeEventListener(D3Simulation.TICK_EVENT, this._update);
    this._remove();
    this.notifyAll(new Event(D3Particle.PARTICLE_DESTROYED_EVENT, this));
  }

  _remove() {
    this.$selection.remove();
  }
}
