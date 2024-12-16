import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Point } from '../utils/point';
import { Robot } from './robot';
import Common from '../utils/common';

const puzzle = 'Day 14B: Restroom Redoubt'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput();
const robots: Robot[] = [];
inputValues.forEach(r => {
    const parts = r.split(' ');
    const position = parts[0].substring(2).split(',');
    const velocity = parts[1].substring(2).split(',');
    robots.push(new Robot(parseInt(position[0]), parseInt(position[1]), parseInt(velocity[0]), parseInt(velocity[1])));
});
const map: Grid<string> = new Grid(input.testmode ? 11 : 101, input.testmode ? 7 : 103, '.')
const midX = Math.floor(map.width / 2);

logger.start();

let answer = 0;

for (let i = 1; i < 5; i++) {
    robots.forEach(r => {
        r.location.x += r.velocity.x;
        r.location.y += r.velocity.y;
        if (map.isOutsideGrid(r.location.x, r.location.y)) {
            if (r.location.x < 0) {
                r.location.x = map.width + r.location.x;
            } else if (r.location.x > map.width - 1) {
                r.location.x = r.location.x - map.width;
            }
            if (r.location.y < 0) {
                r.location.y = map.height + r.location.y;
            } else if (r.location.y > map.height - 1) {
                r.location.y = r.location.y - map.height;
            }
        }
    });
    if (i % 1000000 === 0) {
        console.log('Step', i);
    }
    if (checkForChristmasTree(robots)) {
        answer = i;
        break
    }
}
robots.forEach(r => {
    map.grid[r.location.y][r.location.x] = "#";
});

map.display();

logger.end(answer);

function checkForChristmasTree(robots: Robot[]): boolean {
    const grid: boolean[][] = Array.from({ length: 103 }, () => Array(101).fill(false));
    robots.forEach(robot => {
        grid[robot.location.y][robot.location.x] = true;
    });

    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < midX; x++) {
            if (grid[y][x] !== grid[y][map.width - 1 - x]) {
                return false;
            }
        }
    }
    return true;
}

