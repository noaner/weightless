import Vector from './vector';
import Node from './node';
import circle from './circle';

const SHOW_VECTORS = false;

export default class Thing extends Node {
  constructor(x, y, mass) {
    super();

    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.forces = new Vector(0, 0);
    this.mass = mass;
  }

  applyForce(force) {
    this.forces.add(force.mult(1 / this.mass));
  }

  update(step) {
    this.vel.add(Vector.mult(this.forces, step));
    this.pos.add(Vector.mult(this.vel, step));
  }

  radius() {
    return Math.sqrt(this.mass * 900 / Math.PI);
  }

  addMass(amount) {
    this.mass += amount;
  }

  onCollide(other) {
    if (other.constructor.name === 'Player') {
      this.remove();
    }
  }

  draw(ctx) {
    circle(ctx, this.pos.x, this.pos.y, this.radius(), '#fff');

    if (SHOW_VECTORS) {
      ctx.strokeStyle = '#0f0';
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(this.pos.x + this.vel.x * 10, this.pos.y + this.vel.y * 10);
      ctx.stroke();

      ctx.strokeStyle = '#f00';
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(
        this.pos.x + this.forces.x * 100,
        this.pos.y + this.forces.y * 100
      );
      ctx.stroke();
    }

    this.forces.x = 0;
    this.forces.y = 0;
  }
}
