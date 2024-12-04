import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 04B: Ceres Search'
const input = new InputHelper();
const logger = new Logger(puzzle);

const grid: string[][] = input.getInput().map(line => line.split(''));

logger.start();
let answer = 0;

for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[y].length - 1; x++) {
        if (isXMAS(x, y)) {
            answer++;
        }
    }
}

logger.end(answer);


function isXMAS(x: number, y: number): boolean {
    if (grid[y][x] !== 'A') return false;
    let axis = 0
    const directions = [{x: 1, y: -1}, {x: -1, y: -1}]
    directions.forEach(direction => {
        if (grid[y + direction.y][x + direction.x] === 'M' && grid[y - direction.y][x - direction.x] === 'S') axis++
        if (grid[y + direction.y][x + direction.x] === 'S' && grid[y - direction.y][x - direction.x] === 'M') axis++
    })
    return axis === 2;    
}