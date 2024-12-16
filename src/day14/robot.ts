import { Point } from '../utils/point';

export class Velocity {
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Robot {
    location: Point = new Point(0, 0)
    velocity: Velocity = new Velocity(0, 0);

    constructor(x: number = 0, y: number = 0, velocityX: number, velocityY: number) {
        this.location = new Point(x, y);
        this.velocity = new Velocity(velocityX, velocityY);
    }
}