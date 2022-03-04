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
    this.d3Source.addEventListener(D3Node.EMIT_PARTICLE_EVENT, () =>
      this._emitParticle()
    );
    this.d3Target = new D3Node(this.target, this.$selection);
    this.d3Link = new D3Link(
      this.$selection,
      this.link,
      this.getD3NodeConnection()
    );
  }

  _emitParticle() {
    const particle = new D3Particle(this);
    particle.addEventListener(
      D3Particle.PARTICLE_DESTROYED_EVENT,
      (p: D3Particle) => this._onParticleDestroyed()
    );
    this.d3Particles.push(particle);
  }

  _onParticleDestroyed() {
    this._removeOldestParticle();
    this.d3Target.updateWeight(this.link.linkOptions.linkStrength);
    this.d3Link.onTicked();
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

  getD3NodeConnection(): D3NodeConnection {
    return {
      source: this.d3Source,
      target: this.d3Target,
    };
  }
}

export interface D3NodeConnection {
  source: D3Node;
  target: D3Node;
}
