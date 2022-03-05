import { Selection, SimulationNodeDatum } from "d3";
import {
  getColorByType,
  getLinkStrengthOperatorByType,
  LinkStrengthType,
} from "../graph/Link";
import { calcJointVector } from "../utils/LinearAlgebra";
import { Event, D3EventBus, Observable } from "../utils/Observable";
import D3Appendable from "./D3Appendable";
import D3Link from "./D3Link";
import D3Relationship from "./D3Relationship";
import D3_CONFIG from "./D3_CONFIG";
import * as d3 from "d3";
import D3Simulation from "./D3Simulation";

// ====================================================== //
// ===================== D3Particle ===================== //
// ====================================================== //

export default class D3Particle
  extends Observable
  implements D3Appendable, SimulationNodeDatum
{
  static PARTICLE_DESTROYED_EVENT: string = "particleDestroyed";
  static PARTICLE_TICK_EVENT: string = "particleTick";

  d3Relationship: D3Relationship;
  $selection: d3.Selection<SVGGElement, this, SVGGElement, any>;
  $circle: d3.Selection<SVGCircleElement, any, any, undefined>;
  $text: d3.Selection<SVGTextElement, any, any, undefined>;

  // ~~~~~~~~~~~~~~~ Particle ~~~~~~~~~~~~~~ //
  id: string;
  radius: number = D3_CONFIG.particle.radius;
  creationTime = new Date().getTime(); // the creation time of the particle
  travelTime: number; // how long this particle will be alive

  travelVector!: { x: number; y: number };

  // ~~~~~~~~~ SimulationNodeDatum ~~~~~~~~~ //
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;

  static particles: D3Particle[] = [];

  constructor(d3Relationship: D3Relationship) {
    super();
    this.d3Relationship = d3Relationship;
    this.id = d3Relationship.id() + "-" + this.creationTime;
    this.travelTime = this._calcTravelTime();
    this._setInitialPosition(d3Relationship.d3Link);

    this.$selection = this._append(d3Relationship.$selection);
    this.$circle = this._appendCircle(
      this.$selection,
      d3Relationship.link.linkOptions.linkStrength.type
    );
    this.$text = this._appendText(
      this.$selection,
      d3Relationship.link.linkOptions.linkStrength.type
    );

    D3EventBus.addEventListener(D3Simulation.TICK_EVENT, this._update);
    D3Particle.particles.push(this);
  }

  _appendText(
    $selection: Selection<any, any, any, undefined>,
    linkStrengthType: LinkStrengthType
  ) {
    return $selection
      .append("text")
      .text(() => {
        return getLinkStrengthOperatorByType(linkStrengthType);
      })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", D3_CONFIG.particle.textColor)
      .attr("x", (d: any) => d.x)
      .attr("y", (d: any) => d.y);
  }

  _appendCircle(
    $selection: Selection<any, any, any, undefined>,
    linkStrengthType: LinkStrengthType
  ) {
    return $selection
      .append("circle")
      .attr("cx", (d: any) => d.x)
      .attr("cy", (d: any) => d.y)
      .attr("r", D3_CONFIG.particle.radius)
      .attr("fill", getColorByType(linkStrengthType));
  }

  _append($svg: Selection<any, any, any, undefined>) {
    return $svg
      .append("g")
      .attr("class", "particles")
      .selectAll(".particles")
      .data([this], (d: any) => d.d3Relationship.id())
      .enter()
      .append("g");
  }

  _update = () => {
    const progress = this._calcProgress();
    if (progress >= 1) this._destroy();

    const newPos = this._calcPosition(progress, this.d3Relationship.d3Link);
    this._updatePosition(newPos.x, newPos.y);
  };

  _calcTravelTime(): number {
    return (
      D3_CONFIG.particle.travelTime /
      this.d3Relationship.link.linkOptions.linkSpeed
    );
  }

  _setInitialPosition(d3Link: D3Link) {
    this.x = d3Link.path.source.x;
    this.y = d3Link.path.source.y;
  }

  _calcProgress(): number {
    const currentTime = new Date().getTime(),
      elapsedTime = currentTime - this.creationTime;
    return elapsedTime / this.travelTime;
  }

  _updatePosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.$circle.transition().duration(0).attr("cx", this.x).attr("cy", this.y);
    this.$text.transition().duration(0).attr("x", this.x).attr("y", this.y);
  }

  _calcPosition(progress: number, d3Link: D3Link) {
    this.travelVector = this._calcTravelVector(d3Link);
    return {
      x: d3Link.path.source.x + this.travelVector.x!! * progress,
      y: d3Link.path.source.y + this.travelVector.y!! * progress,
    };
  }

  _calcTravelVector(d3Link: D3Link) {
    return calcJointVector(d3Link.path.source, d3Link.path.target);
  }

  _destroy() {
    D3EventBus.removeEventListener(D3Simulation.TICK_EVENT, this._update);
    this._remove();
    this.notifyAll(new Event(D3Particle.PARTICLE_DESTROYED_EVENT, this));
    D3Particle.particles.splice(D3Particle.particles.indexOf(this), 1);
  }

  _remove() {
    this.$selection.remove();
  }
}
