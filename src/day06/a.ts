import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Point } from '../utils/point';
import { Guard } from './guard';

const puzzle = 'Day 06A: Guard Gallivant'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput().map(l => l.split(''));
const map: Grid<string> = new Grid(inputValues[0].length, inputValues.length)

map.setGrid(inputValues)


logger.start();
let guard = findGuard(map); 

let visited: Point[] = [];
visited.push(guard.position);
while (map.isInsideGrid(guard.position.x, guard.position.y)) {
    if (!visited.some(p => p.x === guard.position.x && p.y === guard.position.y)) {
        visited.push(guard.position);
    }
    let newPosition = { x: guard.position.x + guard.direction.x, y: guard.position.y + guard.direction.y };
    if (map.node(newPosition.x, newPosition.y) === '#') {
        guard.turnRight();
        newPosition = { x: guard.position.x + guard.direction.x, y: guard.position.y + guard.direction.y };
    }
    guard.position = newPosition;
}
let answer = visited.length;

logger.end(answer);

function findGuard(map: Grid<string>): Guard {
    for (let x = 0; x < map.width; x++) {
        for (let y = 0; y < map.height; y++) {
            if (map.node(x, y) === '^' || map.node(x, y) === 'v' || map.node(x, y) === '<' || map.node(x, y) === '>') {
                return new Guard(x, y, map.node(x, y));
            }
        }
    }
    return new Guard();
}

