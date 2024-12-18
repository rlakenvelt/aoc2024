import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import Common from '../utils/common';
import { Direction } from '../utils/direction';

const puzzle = 'Day 18B: RAM Run'
const input = new InputHelper();
const logger = new Logger(puzzle);

const bytes = input.getInput().map(l => l.split(',').map(i => parseInt(i)));
let map: Grid<string>;
let numberOfBtes = 0;
if (Common.testMode()) {
    map = new Grid(7, 7, '.')
} else {
    map = new Grid(71, 71, '.')
}
logger.start();

let answer = '';
for (let i = 0; i < bytes.length; i++) {
    map.setNode(bytes[i][0], bytes[i][1], '#');
    const path = findShortestPath(map);
    if (path === -1) {
        answer = bytes[i].join(',');
        break;
    }

}
bytes.forEach((byte, index) => {
})



logger.end(answer);

function findShortestPath(map: Grid<string>): number {
    const queue: { x: number, y: number, steps: number }[] = [{ x: 0, y: 0, steps: 0 }];
    const visited = new Set<string>();
    visited.add('0,0');

    while (queue.length > 0) {
        const { x, y, steps } = queue.shift()!;
        if (x === map.width - 1 && y === map.height - 1) {
            return steps;
        }

        Direction.directionsWithoutDiagonals().forEach(dir => {
            const newX = x + dir.x;
            const newY = y + dir.y;   
            if (map.isInsideGrid(newX, newY) && map.node(newX, newY) !== '#' && !visited.has(`${newX},${newY}`)) {
                queue.push({ x: newX, y: newY, steps: steps + 1 });
                visited.add(`${newX},${newY}`);
            }
        })
    }

    return -1; 
}

