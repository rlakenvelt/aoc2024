import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Point } from '../utils/point';
import { Direction } from '../utils/direction';
import { PriorityQueue } from '../utils/graph';

type QueueItem = { point: Point, direction: string, cost: number, path: Point[]};

const puzzle = 'Day 16A: Reindeer Maze'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput().map(l => l.split(''));
const map: Grid<string> = new Grid(inputValues[0].length, inputValues.length)
map.setGrid(inputValues)

logger.start();

const [ start, end ] = map.getPoints(['S', 'E']);
let paths = findCheapestPath(map, start, end).sort((a,b) => a.cost - b.cost);
const tiles: Set<string> = new Set();
paths.forEach(p => p.path.forEach(point => tiles.add(`${point.x},${point.y}`)));
let answer = tiles.size;
logger.end(answer);


function findCheapestPath(map: Grid<string>, start: Point, end: Point): {cost: number, path: Point[]}[]  {
    const queue = new PriorityQueue<QueueItem>((a, b) => a.cost - b.cost);
    const visited = new Map<string, number>();
    queue.enqueue({ point: start, direction: 'E', cost: 0, path: [start] });
    visited.set(key(start,'E'), 0);
    let paths: {cost: number, path: Point[]}[] = [];
    let minCost = Infinity;
    while (!queue.isEmpty()) {
        const { point: p, direction, cost, path } = queue.dequeue()!;
        
        if (p.x === end.x && p.y === end.y) {
            if (cost <= minCost) {
                minCost = cost;
                paths.push({ cost, path });
            }
            continue;
        }
        Direction.directionsWithoutDiagonals().forEach(dir => {
            if (dir.symbol !== Direction.opposite(direction)) {
                const newPoint = new Point(p.x+dir.x, p.y+dir.y);
                const newDirection = dir.symbol;
                const rotationCost = direction === newDirection ? 0 : 1000;
                const newCost = cost + 1 + rotationCost;

                if (newCost <= minCost && 
                    map.isInsideGrid(newPoint.x, newPoint.y) && 
                    map.node(newPoint.x, newPoint.y) !== '#' 
                ) {
                    const v = visited.get(key(newPoint,newDirection));
                    if (v === undefined || v >= newCost) {
                        visited.set(key(newPoint,newDirection), newCost);
                        queue.enqueue({ point: newPoint, direction: newDirection, cost: newCost, path: [...path, newPoint] });
                    };
                }
            }
            
        });
    }
    return paths; 
}

function key(point: Point, direction: string) {
    return `${point.x},${point.y},${direction}`;
}
