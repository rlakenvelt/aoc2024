import { Point } from '../utils/point';
import { Direction } from '../utils/direction';

export class Guard {
    position: Point = new Point(0, 0)
    direction = { x: 0, y: -1, symbol: '^' }

    setDirection(direction: string) {
        this.direction.symbol = direction;
        switch (direction) {
            case '^':
                this.direction.x = 0;
                this.direction.y = -1;
                break;
            case '>':
                this.direction.x = 1;
                this.direction.y = 0;
                break;
            case 'v':
                this.direction.x = 0;
                this.direction.y = 1;
                break;
            case '<':
                this.direction.x = -1;
                this.direction.y = 0;
                break;
        }
    }    

    turnRight() {
        switch (this.direction.symbol) {
            case '^':
                this.direction.x = 1;
                this.direction.y = 0;
                this.direction.symbol = '>';
                break;
            case '>':
                this.direction.x = 0;
                this.direction.y = 1;
                this.direction.symbol = 'v';
                break;
            case 'v':
                this.direction.x = -1;
                this.direction.y = 0;
                this.direction.symbol = '<';
                break;
            case '<':
                this.direction.x = 0;
                this.direction.y = -1;
                this.direction.symbol = '^';
                break;
        }

    }


}