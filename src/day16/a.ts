import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Point } from '../utils/point';
import { Direction } from '../utils/direction';

const puzzle = 'Day 16A: Reindeer Maze'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput().map(l => l.split(''));
const map: Grid<string> = new Grid(inputValues[0].length, inputValues.length)
map.setGrid(inputValues)
const {start, end} = findStartAndEnd(map.grid);

map.display()

logger.start();
let answer = 0;
findCheapestPath(map);



logger.end(answer);

function findCheapestPath(map: Grid<string>): number {
    const queue: { x: number, y: number, direction: string, steps: number }[] = [{ ...start, direction: 'E', steps: 0 }];
    const visited = new Set<string>();
    visited.add(`${start.x},${start.y},E`);

    while (queue.length > 0) {
        const { x, y, direction, steps } = queue.shift()!;
        if (x === map.width - 1 && y === map.height - 1) {
            return steps;
        }

        Direction.directionsWithoutDiagonals().forEach(dir => {
            const newX = x + dir.x;
            const newY = y + dir.y;   
            if (map.isInsideGrid(newX, newY) && map.node(newX, newY) !== '#' && !visited.has(`${newX},${newY}`)) {
                queue.push({ x: newX, y: newY, direction: dir.symbol, steps: steps + 1 });
                visited.add(`${newX},${newY},${dir.symbol}`);
            }
        })
    }

    return -1; 
}

function findStartAndEnd(map: string[][]){
    let start = new Point(0, 0);
    let end = new Point(0, 0);
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 'S') {
                start = new Point(x, y);
            }
            if (map[y][x] === 'E') {
                end = new Point(x, y);
            }
        }
    }    
    return {start, end};
}
