import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Point } from '../utils/point';
import { Guard } from './guard';

const puzzle = 'Day 06B: Guard Gallivant'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput().map(l => l.split(''));
const map: Grid<string> = new Grid(inputValues[0].length, inputValues.length)
map.setGrid(inputValues)

logger.start();
let answer = 0;


for (let x = 0; x < map.width; x++) {
    for (let y = 0; y < map.height; y++) {
        if (map.node(x, y) === '.') {
            map.grid[y][x] = '#';
            if (guardLoopsWithMap(map)) {
                answer++;
            }
            map.grid[y][x] = '.';
        }
    }
}

logger.end(answer);

function guardLoopsWithMap(trymap: Grid<string>): boolean {
    let guard = findGuard(trymap); 
    let visitedTurnPoints: {x: number, y: number, direction: string}[] = [];
    while (trymap.isInsideGrid(guard.position.x, guard.position.y)) {
        let newPosition = { x: guard.position.x + guard.direction.x, y: guard.position.y + guard.direction.y };
        if (trymap.node(newPosition.x, newPosition.y) === '#') {
            if (visitedTurnPoints.some(p => p.x === guard.position.x && p.y === guard.position.y && p.direction === guard.direction.symbol)) return true;
            visitedTurnPoints.push({x: guard.position.x, y: guard.position.y, direction: guard.direction.symbol});
            while (trymap.isInsideGrid(newPosition.x, newPosition.y) && trymap.node(newPosition.x, newPosition.y) === '#') {
                guard.turnRight();
                newPosition = { x: guard.position.x + guard.direction.x, y: guard.position.y + guard.direction.y };
            }
        }
        guard.position = newPosition;
    }
    return false;
}
function findGuard(inmap: Grid<string>): Guard {
    let guard = new Guard();
    for (let x = 0; x < inmap.width; x++) {
        for (let y = 0; y < inmap.height; y++) {
            if (inmap.node(x, y) === '^' || inmap.node(x, y) === 'v' || inmap.node(x, y) === '<' || inmap.node(x, y) === '>') {
                guard.position = new Point(x, y);
                guard.setDirection(inmap.node(x, y) || '^');
            }
        }
    }
    return guard;
}

