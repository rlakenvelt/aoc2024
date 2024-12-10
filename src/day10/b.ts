import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Point } from '../utils/point';
import { Direction } from '../utils/direction';

const puzzle = 'Day 10B: Hoof It'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput().map(l => l.split('').map(c=>parseInt(c)));
const map: Grid<number> = new Grid(inputValues[0].length, inputValues.length)


map.setGrid(inputValues)


logger.start();
const trailheads = findTrailheads(map);
let answer = 0;
let visited = new Set<string>();
let rating = 0;

trailheads.forEach(trailhead => {
    answer += calculateTrailheadRating(map, trailhead);
});

logger.end(answer);

function calculateTrailheadRating(map: Grid<number>, trailhead: Point): number {
    visited = new Set<string>();
    rating = 0;
    visited.add(`${trailhead.x},${trailhead.y}`);
    scanTrail(map, trailhead, 0);

    return rating;
}

function scanTrail(map: Grid<number>, current: Point, height: number): void {
    if (height === 9) {
        rating++;
        return;
    }
    Direction.directionsWithoutDiagonals().forEach(direction => {
        const next = new Point(current.x + direction.x, current.y + direction.y);
        if (map.isInsideGrid(next.x, next.y) && !visited.has(`${next.x},${next.y}`) && map.grid[next.y][next.x] === height + 1) {
            visited.add(`${next.x},${next.y}`);
            scanTrail(map, next, height + 1);
            visited.delete(`${next.x},${next.y}`);
        }
    });
}

function findTrailheads(map: Grid<number>): Point[] {
    let trailheads: Point[] = [];
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < map.width; x++) {
            if (map.grid[y][x] === 0) {
                trailheads.push(new Point(x, y));
            }
        }
    }
    return trailheads;
}