import { Point } from '../utils/point';

export class Antinode {
    location: Point = new Point(0, 0)

    constructor(x: number = 0, y: number = 0) {
        this.location = new Point(x, y);
    }
}