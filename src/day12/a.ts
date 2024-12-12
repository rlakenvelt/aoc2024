import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Point } from '../utils/point';
import { Direction } from '../utils/direction';

const puzzle = 'Day 12A: Garden Groups'
const input = new InputHelper();
const logger = new Logger(puzzle);

let inputValues = input.getInput().map(l => l.split(''));
const garden: Grid<string> = new Grid(inputValues[0].length, inputValues.length)
garden.setGrid(inputValues)

logger.start();

const regions: Point[][] = [];

for (let y = 0; y < garden.height; y++) {
    for (let x = 0; x < garden.width; x++) {
        if (garden.node(x, y) !== '#') {
            const region = garden.floodFill(x, y, "#");
            regions.push(region);
        }
    }
}

inputValues = input.getInput().map(l => l.split(''));
garden.setGrid(inputValues)

const answer = regions.reduce((acc, region) => {
    return acc+= calculatePerimeter(garden, region) * region.length
}, 0);

logger.end(answer);

function calculatePerimeter(garden: Grid<string>, region: Point[]): number {
    let perimeter = 0;

    region.forEach(point => {
        Direction.directionsWithoutDiagonals().forEach(direction => {
            const neighbor = new Point(point.x + direction.x, point.y + direction.y);
            if (!garden.isInsideGrid(neighbor.x, neighbor.y) || garden.grid[neighbor.y][neighbor.x] !== garden.grid[point.y][point.x]) {
                perimeter++;
            }
        });
    });
    return perimeter;
}

