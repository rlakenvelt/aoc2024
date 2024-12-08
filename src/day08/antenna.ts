import { Point } from '../utils/point';

export class Antenna {
    location: Point = new Point(0, 0)
    frequency: string;

    constructor(frequency: string, x: number = 0, y: number = 0) {
        this.location = new Point(x, y);
        this.frequency = frequency;
    }
}