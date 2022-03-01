import { Selection, SimulationNodeDatum } from "d3";
import {
  calcClosestPointsOfCircles,
  calcJointVector,
  makeCircleFromD3Node,
  Vector,
} from "../utils/LinearAlgebra";
import { Event, EventBus, Observable } from "../utils/Observable";
import D3Appendable from "./D3Appendable";
import D3Node from "./D3Node";
import D3Relationship from "./D3Relationship";
import D3Simulation from "./D3Simulation";
import D3_CONFIG from "./D3_CONFIG";

// ====================================================== //
// ===================== D3Particle ===================== //
// ====================================================== //

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

  travelVector!: { x: number; y: number };
  sourceClosestPoint!: Vector; // closest point on from the source node to the target node
  targetClosestPoint!: Vector; // closest point from the target node to the source node

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
    this.travelTime = this._calcTravelTime();
    this._setInitialPosition();

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
      .attr("fill", function () {
        return D3_CONFIG.particle.fill;
      });
  }

  _update = () => {
    const progress = this._calcProgress();
    if (progress >= 1) this._destroy();

    const newPos = this._calcPosition(
      progress,
      this.d3Relationship.d3Target,
      this.d3Relationship.d3Source
    );
    this._updatePosition(newPos.x, newPos.y);
  };

  _calcTravelTime(): number {
    return (
      this.d3Relationship.link.linkOptions.linkSpeed *
      D3_CONFIG.particle.travelTime
    );
  }

  _setInitialPosition() {
    const pos = this._calcPosition(
      0,
      this.d3Relationship.d3Target,
      this.d3Relationship.d3Source
    );
    this.x = pos.x;
    this.y = pos.y;
  }

  _calcProgress(): number {
    const currentTime = new Date().getTime(),
      elapsedTime = currentTime - this.creationTime;
    return elapsedTime / this.travelTime;
  }

  _updatePosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.$selection
      .transition()
      .duration(0)
      .attr("cx", this.x)
      .attr("cy", this.y);
  }

  _calcPosition(progress: number, d3Target: D3Node, d3Source: D3Node) {
    this.travelVector = this._calcTravelVector(d3Target, d3Source);
    return {
      x: this.sourceClosestPoint.x + this.travelVector.x!! * progress,
      y: this.sourceClosestPoint.y + this.travelVector.y!! * progress,
    };
  }

  _calcTravelVector(d3Target: D3Node, d3Source: D3Node) {
    const closestPoints = calcClosestPointsOfCircles(
      makeCircleFromD3Node(d3Source),
      makeCircleFromD3Node(d3Target)
    );
    this.sourceClosestPoint = closestPoints[0];
    this.targetClosestPoint = closestPoints[1];
    return calcJointVector(this.sourceClosestPoint, this.targetClosestPoint);
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
