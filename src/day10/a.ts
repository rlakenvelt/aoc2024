import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Point } from '../utils/point';
import { Direction } from '../utils/direction';

const puzzle = 'Day 10A: Hoof It'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput().map(l => l.split('').map(c=>parseInt(c)));
const map: Grid<number> = new Grid(inputValues[0].length, inputValues.length)


map.setGrid(inputValues)


logger.start();
const trailheads = findTrailheads(map);
let answer = 0;

trailheads.forEach(trailhead => {
    answer += calculateTrailheadScore(map, trailhead);
});

logger.end(answer);

function calculateTrailheadScore(map: Grid<number>, trailhead: Point): number {
    const directions = Direction.directionsWithoutDiagonals();
    const queue: Point[] = [trailhead];
    const visited = new Set<string>();
    visited.add(`${trailhead.x},${trailhead.y}`);
    let score = 0;

    while (queue.length > 0) {
        const current = queue.shift()!;
        if (map.grid[current.y][current.x] === 9) {
            score++;
        }
        directions.forEach(direction => {
            const next = new Point(current.x + direction.x, current.y + direction.y);
            if (map.isInsideGrid(next.x, next.y) && !visited.has(`${next.x},${next.y}`) && map.grid[next.y][next.x] === map.grid[current.y][current.x] + 1) {
                queue.push(next);
                visited.add(`${next.x},${next.y}`);
            }
        });
    }

    return score;
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