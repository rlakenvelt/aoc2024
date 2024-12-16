import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Point } from '../utils/point';
import { Robot } from './robot';
import Common from '../utils/common';

const puzzle = 'Day 14A: Restroom Redoubt'
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

logger.start();

for (let i = 1; i <= 100; i++) {
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
}
const midX = Math.floor(map.width / 2);
const midY = Math.floor(map.height / 2);
const quadrant: number[] = [0,0,0,0];
console.log('Mid', midX, midY);

robots.forEach(r => {
    if (r.location.x < midX) {
        if (r.location.y < midY) {
            quadrant[0]++;
        } else if (r.location.y > midY) {
            quadrant[2]++;
        }
    } else if (r.location.x > midX) {
        if (r.location.y < midY) {
            quadrant[1]++;
        } else if (r.location.y > midY) {
            quadrant[3]++;
    }
    }
    map.grid[r.location.y][r.location.x] = '#';
})
console.log('Quadrant', quadrant);
map.display();

let answer = quadrant.reduce(Common.multiply, 1);


logger.end(answer);

