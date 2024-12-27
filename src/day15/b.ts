import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Point } from '../utils/point';

const puzzle = 'Day 15B: Warehouse Woes'
const input = new InputHelper();
const logger = new Logger(puzzle);

let inputValues = input.getInput(input.dblEol);
type Map = string[][];
type Box = Point[];
const map: Map = inputValues[0].split(input.eol)
                          .map(l => {
                                let t = l.replace(/#/g, '##')
                                t = t.replace(/O/g, '[]')
                                t = t.replace(/\./g, '..')
                                t = t.replace(/@/g, '@.')
                                return t;
                          })
                          .map(l => l.split(''));

const moves = inputValues[1].split(input.eol).join('').split('');

logger.start();

type Direction = { dx: number, dy: number };
const directions: { [key: string]: Direction } = {
    '^': { dx: 0, dy: -1 },
    'v': { dx: 0, dy: 1 },
    '<': { dx: -1, dy: 0 },
    '>': { dx: 1, dy: 0 }
};

let robotPosition = findRobot(map);


let answer = 0;

moves.forEach((move, index) => {
    robotPosition = moveRobot(map, robotPosition, move);
});

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === '[') {
            answer += y * 100 + x;
        }
    }
}

logger.end(answer);

function moveRobot(map: Map, robotPosition: { x: number, y: number }, move: string): { x: number, y: number } {
    const direction = directions[move];
    const newX = robotPosition.x + direction.dx;
    const newY = robotPosition.y + direction.dy;

    if (map[newY][newX] === '#') {
        return robotPosition; 
    }
    const box = checkBox(map, new Point(newX, newY));
    if (box) {
        if (!pushBox(map, box, direction, true)) {
            return robotPosition; 
        }
        pushBox(map, box, direction, false)
    }   
    map[robotPosition.y][robotPosition.x] = '.';
    map[newY][newX] = '@';
    return { x: newX, y: newY };
}


function pushBox(map: Map, box: Box, direction: Direction, simulate: boolean): boolean {
    for (let i = 0; i < box.length; i++) {
        const newX = box[i].x + direction.dx;
        const newY = box[i].y + direction.dy;
        if (map[newY][newX] === '#') {
            return false; 
        }
        const neighborBox = checkBox(map, new Point(newX, newY));
        if (neighborBox && 
            (neighborBox[0].x !== box[0].x || neighborBox[0].y !== box[0].y) &&
            !pushBox(map, neighborBox, direction, simulate)) {
            return false; 
        }
    };
    if (!simulate) {
        if (direction.dx !== 0) { 
            map[box[0].y][box[0].x + direction.dx] = '[';
            map[box[0].y][box[1].x + direction.dx] = ']';
        } else {
            map[box[0].y + direction.dy][box[0].x] = '[';
            map[box[0].y + direction.dy][box[1].x] = ']';
            map[box[0].y][box[0].x] = '.';
            map[box[0].y][box[1].x] = '.';

        }
 }

    return true;

}

function checkBox(map: Map, location: Point): Box | undefined {
    if (map[location.y][location.x] === '[') {
        return [location, new Point(location.x + 1, location.y)];
    }
    if (map[location.y][location.x] === ']') {
        return [new Point(location.x - 1, location.y), location];
    }
    return undefined;
}

function findRobot(map: Map): { x: number, y: number } {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === '@') {
                return { x, y };
            }
        }
    }    
    return { x: 0, y: 0 };
}

function display(map: string[][]) {
    map.forEach(row => {
        let temp = row.join('');
        console.log(temp);
    })
} 