import { Selection } from "d3";
import { NodeConnection } from "../graph/Graph";

import Relationship from "../graph/Relationship";
import D3Appendable from "./D3Appendable";
import D3Link from "./D3Link";
import D3Node from "./D3Node";
import D3Particle from "./D3Particle";

export default class D3Relationship
  extends Relationship
  implements D3Appendable
{
  $selection: d3.Selection<SVGGElement, D3Relationship, SVGGElement, unknown>;

  d3Source: D3Node;
  d3Target: D3Node;
  d3Link: D3Link;
  d3Particles: D3Particle[] = [];

  constructor(
    relationship: Relationship,
    $svg: d3.Selection<SVGElement, unknown, null, undefined>
  ) {
    super(relationship.link, relationship.source, relationship.target);

    this.$selection = this._append($svg);
    this.d3Source = new D3Node(this.source, this.$selection);
    this.d3Target = new D3Node(this.target, this.$selection);
    this.d3Link = new D3Link(
      this.$selection,
      this.link,
      this.getD3NodeConnection()
    );

    this.d3Source.$selection.on("click", () => this._emitParticle());
  }

  _emitParticle() {
    const particle = new D3Particle(this);
    particle.addEventListener(
      D3Particle.PARTICLE_DESTROYED_EVENT,
      (p: D3Particle) => this._onParticleDestroyed(p)
    );
    this.d3Particles.push(particle);
  }

  _onParticleDestroyed(particle: D3Particle) {
    this._removeOldestParticle();
    //TODO : update node
  }

  _removeOldestParticle() {
    this.d3Particles.shift();
  }
  _append($svg: Selection<SVGElement, unknown, null, undefined>) {
    return $svg
      .append("g")
      .attr("class", "relationship")
      .selectAll("g")
      .data([this as D3Relationship])
      .enter()
      .append("g");
  }

  getD3Nodes(): D3Node[] {
    return [this.d3Source, this.d3Target];
  }

  getD3NodeConnection(): NodeConnection {
    return {
      source: this.d3Source,
      target: this.d3Target,
    };
  }
}
