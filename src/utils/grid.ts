import { Direction } from "./direction";
import { Point } from "./point";

export class Grid<T> {
    grid: T[][] = [][0];
    width: number = 0;
    height: number = 0;

    constructor(width: number = 0, height: number = 0, initial?: T) {
        if (width > 0 && height > 0 && initial!==undefined) {
            this.initGrid(width, height, initial);
        }
    }
    
    initGrid (width: number, height: number, initial: T) {
        this.setGrid(new Array(height).fill([]).map(row => new Array(width).fill(initial)));
    }
    
    setGrid(grid: T[][]) {
        this.grid = grid;
        this.height = grid.length;
        this.width  = grid[0].length;
    }
    expand(margin: number, initial: T) {
        for (let i=0; i<margin; i++) {
            this.grid.unshift(new Array(this.width).fill(initial));
            this.grid.push(new Array(this.width).fill(initial));
        }
        this.grid.forEach(l=> {
            for (let i=0; i<margin; i++) {
                l.unshift(initial);
                l.push(initial);
            }
        })
        this.height = this.grid.length;
        this.width  = this.grid[0].length;
    }
    crop(margin: number) {
        for (let i=0; i<margin; i++) {
            this.grid.shift();
            this.grid.pop();
        }
        this.grid.forEach(l=> {
            for (let i=0; i<margin; i++) {
                l.shift();
                l.pop();
            }
        })   
        this.height = this.grid.length;
        this.width  = this.grid[0].length;             
    }
    private highlight(t: string):string {
        return `\x1b[1m\x1b[31m${t}\x1b[0m`;
    }  
    display(hightlight?: string) {
        this.grid.forEach(row => {
            let temp = row.join('');
            if (hightlight) {
                const regex = new RegExp(hightlight, 'g');
                temp = temp.replace(regex, this.highlight(hightlight));
            }
            console.log(temp);
        })
    } 
    node(x: number, y: number) {
        if (this.isInsideGrid(x, y))
            return this.grid[y][x];
        return undefined
    }    
    getPoints(values: T[]): Point[] {
        const points: Point[] = [];
        const newArray = new Array(values.length);

        this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
                const pos = values.indexOf(value);
                if (pos >= 0) {
                    points[pos] = new Point(x, y);
                }
            })
        })
        return points;

    }
    setNode(x: number, y: number, value: T) {
        this.grid[y][x] = value;
    }     
    isOutsideGrid(x: number, y: number) {
        if (x<0) return true;
        if (x>this.width-1) return true;
        if (y<0) return true;
        if (y>this.height-1) return true;
        return false;
    }    
    isInsideGrid(x: number, y: number) {
        if (x<0) return false;
        if (x>this.width-1) return false;
        if (y<0) return false;
        if (y>this.height-1) return false;
        return true;
    }  

    floodFill (x: number, y: number, color: T): Point[] {
        const current = this.grid[y][x]; 
        const points = new Set<string>();
        const queue = [new Point(x, y)];
        while (queue.length > 0) {
            const n = queue.pop();
            if (!n) break
            this.grid[n.y][n.x] = color
            if (points.has(n.toString())) continue;
            points.add(n.toString());
            Direction.directionsWithoutDiagonals().forEach(d=>{
                if (this.isInsideGrid(n.x+d.x , n.y+d.y) && this.grid[n.y+d.y][n.x+d.x] === current) {
                    queue.push(new Point(n.x+d.x, n.y+d.y))
                }
            })
        }
        return Array.from(points).map(p=>new Point(parseInt(p.split(',')[0]), parseInt(p.split(',')[1])));
    };
}