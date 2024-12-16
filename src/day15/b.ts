import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 15B: Warehouse Woes'
const input = new InputHelper();
const logger = new Logger(puzzle);

let inputValues = input.getInput('\n\n');
const map = inputValues[0].split('\n')
                          .map(l => {
                                let t = l.replace(/#/g, '##')
                                t = t.replace(/O/g, '[]')
                                t = t.replace(/\./g, '..')
                                t = t.replace(/@/g, '@.')
                                return t;
                          })
                          .map(l => l.split(''));

// const map = inputValues[0].split('\n').map(l => l.split(''));
const moves = inputValues[1].split('\n').join('').split('');

logger.start();

type Direction = { dx: number, dy: number };
const directions: { [key: string]: Direction } = {
    '^': { dx: 0, dy: -1 },
    'v': { dx: 0, dy: 1 },
    '<': { dx: -1, dy: 0 },
    '>': { dx: 1, dy: 0 }
};

let robotPosition = findRobot(map);

display(map);

let answer = 0;

moves.forEach((move) => {
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

function moveRobot(map: string[][], robotPosition: { x: number, y: number }, move: string): { x: number, y: number } {
    const direction = directions[move];
    const newX = robotPosition.x + direction.dx;
    const newY = robotPosition.y + direction.dy;

    if (map[newY][newX] === '#') {
        return robotPosition; 
    }

    if (isBox(map[newY][newX])) {
        if (!pushBox(map, newX, newY, direction)) {
            return robotPosition; 
        }
    }

    map[robotPosition.y][robotPosition.x] = '.';
    map[newY][newX] = '@';
    return { x: newX, y: newY };
}


function pushBox(map: string[][], x: number, y: number, direction: Direction): boolean {
    const newX = x + direction.dx;
    const newY = y + direction.dy;

    if (map[newY][newX] === '#' || (isBox(map[newY][newX]) && !pushBox(map, newX, newY, direction))) {
        return false; 
    }
    if (direction.dx !== 0) { 
        map[newY + direction.dy][newX + direction.dx] = map[newY][newX];
        map[newY][newX ] = map[y][x];
        map[y][x] = '.';
    } else { 
        map[newY][newX] = '[';
        map[newY + 1][newX] = ']';
        map[y][x] = '.';
        map[y + 1][x] = '.';
    }
    return true;
}

function isBox(value: string): boolean {
    return value === '[' || value === ']';
}

function findRobot(map: string[][]): { x: number, y: number } {
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

