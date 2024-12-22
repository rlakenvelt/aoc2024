import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Direction } from '../utils/direction'
import { Point } from '../utils/point'
import { Grid } from '../utils/grid'
import Common from '../utils/common';

interface Road {
    from: Point,
    to: Point,
    length: number
}
const puzzle = 'Day 20B: Race Condition'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput().map(l=>l.split(''));
const map: Grid<string> = new Grid(inputValues[0].length, inputValues.length)

let minimumSaves = 100;
if (Common.testMode()) {
    minimumSaves = 38;
} 

map.setGrid(inputValues)
logger.start();

let {start, end} = findStartAndEnd(map)
let basePath = findPath(map, start, end)
const cheats = findCheats(map, basePath, 100, 20);

let answer = cheats.length
logger.end(answer);

function findCheats(map: Grid<string>, basePath: Set<number>,  minimumSaves: number, maximumCheats: number): { cheat: Point, picoseconds: number }[] {
    let cheats: { cheat: Point, picoseconds: number }[] = [];
    const path = Array.from(basePath).map(key => point(key))
    for (let i = 0; i<path.length; i++) {
        const current = path[i]
        const reachablePoints = findReachablePoints(current, maximumCheats, map, basePath);
        for (let j = 0; j<reachablePoints.length; j++) {
            const reachable = reachablePoints[j]
            const picoseconds = getPicoSeconds(i, reachable, path);
            if (picoseconds >= minimumSaves) {
                cheats.push({cheat: reachable, picoseconds})
            };
        }
    }
    return cheats
}

function getPicoSeconds(index: number, cheat: Point, basePath: Point[]): number{
    let current = basePath[index];
    let findPoint = basePath.findIndex(p => p.x === cheat.x && p.y === cheat.y);
    if (findPoint === -1) return 0
    const manhattan = Math.abs(current.x - cheat.x) + Math.abs(current.y - cheat.y);
    const save = findPoint - index - manhattan;
    if (save > 0) return save;
    return 0;
}


function findReachablePoints(current: Point, maximumCheats: number, map: Grid<string>, basePath: Set<number>) {
    const reachablePoints: Point[] = []
    for (let x = Math.max(1, current.x - maximumCheats); x <= Math.min(map.width - 2, current.x + maximumCheats); x++) {
        for (let y = Math.max(1, current.y - maximumCheats); y <= Math.min(map.height - 2, current.y + maximumCheats); y++) {
            const manhattan = Math.abs(current.x - x) + Math.abs(current.y - y);
            if (manhattan < 2 || manhattan > maximumCheats) continue;
            if (basePath.has(key(x, y))) {
                reachablePoints.push(new Point(x, y));
            }
        }
    }
    return reachablePoints;
}

function findPath(map: Grid<string>, start: Point, end: Point): Set<number> {
    const points: Set<number> = new Set()
    points.add(key(start.x, start.y));
    let current = start
    while (current.x !== end.x || current.y !== end.y) {
        Direction.directionsWithoutDiagonals().forEach(direction => {
            const next = new Point(current.x + direction.x, current.y + direction.y);
            if (map.isInsideGrid(next.x, next.y) && map.grid[next.y][next.x] !== '#' && !points.has(key(next.x, next.y))) {
                points.add(key(next.x, next.y));
                current = next
            }
        })
    }
    return points;
}

function key (x:number, y: number) {
    return x*1000+y
}
function point (key:number) {
    const y = key % 1000
    const x = (key - y) / 1000
    return new Point(x, y)
}

function findStartAndEnd(map: Grid<string>){
    let start = new Point(0, 0);
    let end = new Point(0, 0);
    for (let y = 0; y < map.grid.length; y++) {
        for (let x = 0; x < map.grid[y].length; x++) {
            if (map.grid[y][x] === 'S') {
                start = new Point(x, y);
            }
            if (map.grid[y][x] === 'E') {
                end = new Point(x, y);
            }
        }
    }    
    return {start, end};
}
