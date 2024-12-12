import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Point } from '../utils/point';

const puzzle = 'Day 12B: Garden Groups'
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
    const sides = calculateSides(region);
    return acc+= sides * region.length
}, 0);

logger.end(answer);

function calculateSides(region: Point[]): number {
    const sortX = region.sort((a, b) => sortPointsOnLine(a, b));
    let lastY = -1
    const lines: any[] = [];
    sortX.forEach(p => {
        if (p.y !== lastY) {
            lastY = p.y;
            lines.unshift({line: p.y, x: [p.x]});
        } else {
            lines[0].x.unshift(p.x);
        }      
    });
    lines.forEach(l => {
        l.edges = splitIntoRanges(l.x);
    });
    let xSides = lines[0].edges.length * 2;
    for (let i = 1; i < lines.length; i++) {
        lines[i].edges.forEach((e: { start: number, end: number }) => {
            if (!lines[i-1].edges.some((l: { start: number, end: number }) => l.start === e.start))
            {
                xSides++;
            }
            if (!lines[i-1].edges.some((l: { start: number, end: number }) => l.end === e.end)) {
                xSides++;
            }
        });
    }

    const sortY = region.sort((a, b) => sortPointsOnColumn(a, b));
    let lastX = -1
    const columns: any[] = [];
    sortY.forEach(p => {
        if (p.x !== lastX) {
            lastX = p.x;
            columns.unshift({column: p.x, y: [p.y]});
        } else {
            columns[0].y.unshift(p.y);
        }      
    });
    columns.forEach(l => {
        l.edges = splitIntoRanges(l.y);
    });
    let ySides = columns[0].edges.length * 2;
    for (let i = 1; i < columns.length; i++) {
        columns[i].edges.forEach((e: { start: number, end: number }) => {
            if (!columns[i-1].edges.some((l: { start: number, end: number }) => l.start === e.start))
                ySides++;
            if (!columns[i-1].edges.some((l: { start: number, end: number }) => l.end === e.end)) 
                ySides++;
        });
    }
    return xSides + ySides;
}

function sortPointsOnLine(a: Point, b: Point): number {
    if (a.y == b.y) return b.x - a.x;
    return b.y - a.y;
}
function sortPointsOnColumn(a: Point, b: Point): number {
    if (a.x == b.x) return b.y - a.y;
    return b.x - a.x;
}

function splitIntoRanges(arr: number[]): { start: number, end: number }[] {
    if (arr.length === 0) return [];

    arr.sort((a, b) => a - b); // Sort the array
    const ranges: { start: number, end: number }[] = [];
    let start = arr[0];
    let end = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === end + 1) {
            end = arr[i];
        } else {
            ranges.push({ start, end });
            start = arr[i];
            end = arr[i];
        }
    }
    ranges.push({ start, end }); 

    return ranges;
}