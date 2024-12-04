import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Direction } from '../utils/direction';

const puzzle = 'Day 04A: Ceres Search'
const input = new InputHelper();
const logger = new Logger(puzzle);

const grid: string[][] = input.getInput().map(line => line.split(''));

logger.start();
let answer = 0;

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        Direction.directionsWithDiagonals().forEach(direction => {
            if (isXMAS(x, y, direction)) {
                answer++;
            }
        })
    }
}

logger.end(answer);

function isXMAS(x: number, y: number, direction: Direction): boolean {
    const XMAS = "XMAS".split('');
    if (x + XMAS.length * direction.x + 1 < 0 || x + XMAS.length * direction.x > grid.length)  return false;
    if (y + XMAS.length * direction.y + 1 < 0 || y + XMAS.length * direction.y  > grid.length) return false;
    for (let i = 0; i < XMAS.length; i++) {
        if(grid[y + i * direction.y][x + i * direction.x] !== XMAS[i]) {
            return false;
        }
    }
    return true;    
}