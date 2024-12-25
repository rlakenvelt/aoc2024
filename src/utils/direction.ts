export class Direction {
    x: number = 0;
    y: number = 0;
    symbol: string = '';

    constructor(x: number, y: number, symbol?: string) {
        this.x = x;
        this.y = y;
        if (!symbol) {
            if (this.x === 0 && this.y === -1) this.symbol = 'N';
            if (this.x === 1 && this.y === 0) this.symbol = 'E';
            if (this.x === 0 && this.y === 1) this.symbol = 'S';
            if (this.x === -1 && this.y === 0) this.symbol = 'W';
        }
    }

    turnRight() {
        if (this.x === 0 && this.y === -1) {
            this.x = 1;
            this.y = 0;
            this.symbol = 'E';
        } else if (this.x === 1 && this.y === 0) {
            this.x = 0;
            this.y = 1;
            this.symbol = 'S';
        } else if (this.x === 0 && this.y === 1) {
            this.x = -1;
            this.y = 0;
            this.symbol = 'W';
        }  else if (this.x === -1 && this.y === 0) {
            this.x = 0;
            this.y = -1;
            this.symbol = 'N';
        }
    }
    turnLeft() {
        if (this.x === 0 && this.y === -1) {
            this.x = -1;
            this.y = 0;
            this.symbol = 'W';
        } else if (this.x === 1 && this.y === 0) {
            this.x = 0;
            this.y = -1;
            this.symbol = 'N';
        } else if (this.x === 0 && this.y === 1) {
            this.x = 1;
            this.y = 0;
            this.symbol = 'E';
        }  else if (this.x === -1 && this.y === 0) {
            this.x = 0;
            this.y = 1;
            this.symbol = 'S';
        }
    }

    reverse() {
        this.x = -this.x;
        this.y = -this.y;
        if (this.symbol === 'N') this.symbol = 'S';
        if (this.symbol === 'E') this.symbol = 'W';
        if (this.symbol === 'S') this.symbol = 'N';
        if (this.symbol === 'W') this.symbol = 'E';
    }

    static opposite(direction: string): string {
        if (direction === 'N') return 'S';
        if (direction === 'E') return 'W';
        if (direction === 'S') return 'N';
        if (direction === 'W') return 'E';
        return '';
    }
    static directionsWithDiagonals(): Direction[] {
        return [
            new Direction(1, 0),
            new Direction(1, -1),
            new Direction(0, -1),
            new Direction(-1, -1),
            new Direction(-1, 0),
            new Direction(-1, 1),
            new Direction(0, 1),
            new Direction(1, 1)
        ]        
    }
    static directionsWithoutDiagonals(): Direction[] {
        return [
            new Direction(1, 0),
            new Direction(0, -1),
            new Direction(-1, 0),
            new Direction(0, 1)
        ]        
    }
    static directionsDiagonals(): Direction[] {
        return [
            new Direction(1, -1),
            new Direction(1, 1),
            new Direction(-1, -1),
            new Direction(-1, 1)
        ]        
    }    
}