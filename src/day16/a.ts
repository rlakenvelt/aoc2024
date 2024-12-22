import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Point } from '../utils/point';
import { Direction } from '../utils/direction';
import { PriorityQueue } from '../utils/graph';

type QueueItem = { point: Point, direction: string, cost: number };

const puzzle = 'Day 16A: Reindeer Maze'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput().map(l => l.split(''));
const map: Grid<string> = new Grid(inputValues[0].length, inputValues.length)
map.setGrid(inputValues)

const [ start, end ] = map.getPoints(['S', 'E']);

logger.start();
let answer = findCheapestPath(map, start, end);
logger.end(answer);

function findCheapestPath(map: Grid<string>, start: Point, end: Point): number {
    const queue = new PriorityQueue<QueueItem>((a, b) => a.cost - b.cost);
    const visited = new Set<string>();
    queue.enqueue({ point: start, direction: 'E', cost: 0 });
    visited.add(key(start,'E'));

    while (!queue.isEmpty()) {
        const { point: p, direction, cost } = queue.dequeue()!;
        if (p.x === end.x && p.y === end.y) {
            return cost;
        }

        Direction.directionsWithoutDiagonals().forEach(dir => {
            const newPoint = new Point(p.x+dir.x, p.y+dir.y);
            const newDirection = dir.symbol;
            const rotationCost = direction === newDirection ? 0 : 1000;
            const newCost = cost + 1 + rotationCost;

            if (map.isInsideGrid(newPoint.x, newPoint.y) && map.node(newPoint.x, newPoint.y) !== '#' && !visited.has(key(newPoint,newDirection))) {
                queue.enqueue({ point: newPoint, direction: newDirection, cost: newCost });
                visited.add(key(newPoint,newDirection));
            }
        });
    }

    return -1; 
}

function key(point: Point, direction: string) {
    return `${point.x},${point.y},${direction}`;
}
