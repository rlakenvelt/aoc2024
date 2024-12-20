import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Direction } from '../utils/direction'
import { Point } from '../utils/point'
import { Grid } from '../utils/grid'
import { Graph } from '../utils/graph'
import Common from '../utils/common';

interface Road {
    from: Point,
    to: Point,
    length: number
}
const puzzle = 'Day 20A: Race Condition'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput().map(l=>l.split(''));
const map: Grid<string> = new Grid(inputValues[0].length, inputValues.length)
let crossroads: Set<number> = new Set()
let roads: Road[] = []
const cheats: { cheat: Point, picoseconds: number }[] = [];
let minimumSaves = 100;
if (Common.testMode()) {
    minimumSaves = 38;
} 


map.setGrid(inputValues)
let {start, end} = findStartAndEnd(map)

logger.start();
const maxPicoseconds = getPicoSeconds(map);
for (let y = 1; y<map.height - 1; y++) {
    for (let x = 1; x<map.width - 1; x++) {
        if (map.node(x, y)!=='#') continue
        map.setNode(x, y, '.')
        const picoseconds = getPicoSeconds(map);
        map.setNode(x, y, '#');
        if (picoseconds<maxPicoseconds && maxPicoseconds - picoseconds >= minimumSaves) {
            cheats.push({cheat: new Point(x, y), picoseconds: maxPicoseconds - picoseconds})
        }
    }
}   

let answer = cheats.length
logger.end(answer);

function getPicoSeconds(map: Grid<string>): number{
    crossroads = new Set();
    roads = [];
    getCrossRoads();
    getRoads();
    const graph = new Graph<number>(true, true);
    roads.forEach(road => {
        graph.addEdge(key(road.from.x, road.from.y), key(road.to.x, road.to.y), road.length);
    });
    const path = graph.dijkstra(key(start.x, start.y), key(end.x, end.y));
    if (path?.costs) {
        return path.costs;
    }
    return Infinity
}

function key (x:number, y: number) {
    return x*1000+y
}
function point (key:number) {
    const y = key % 1000
    const x = (key - y) / 1000
    return {x, y}
}
function getCrossRoads() {
    crossroads.add(key(start.x,start.y))
    crossroads.add(key(end.x,end.y))
    for (let y = 0; y<map.height; y++) {
        for (let x = 0; x<map.width; x++) {
            if (map.node(x, y)==='#') continue
            const directions = Direction.directionsWithoutDiagonals()
                                        .filter(direction => {
                                            return map.isInsideGrid(x + direction.x, y + direction.y) && map.node(x + direction.x, y + direction.y)!=='#'
                                        })  
                                        .length  
            if (directions>2) {
                crossroads.add(key(x,y))
            }
        }    
    }    
}

function getRoads() {
    crossroads.forEach(c=> {
        const { x, y } = point(c)

        directionsForNode(x, y)
            .forEach(d=> {
                const newroad: Road = {from: point(c), to: {x: 0, y: 0}, length: 1}
                let tx = x + d.x
                let ty = y + d.y  
                let last = key(x, y)      
                let deadEnd = false
                while (!crossroads.has(key(tx, ty))) {
                    newroad.length++
                    const direction = directionsForNode(tx, ty).filter(td=> {
                        return key(tx + td.x, ty + td.y)!==last
                    })[0]
                    if (!direction) {
                        deadEnd = true
                        break
                    }
                    last = key(tx, ty)      
                    tx+=direction.x
                    ty+=direction.y
                } 
                if (!deadEnd) {
                    newroad.to = { x: tx, y: ty}
                    const road = roads.find(r=>r.from.x===newroad.from.x && r.from.y===newroad.from.y && r.to.x===newroad.to.x && r.to.y===newroad.to.y)
                    if (road) {
                        road.length = Math.min(road.length, newroad.length)
                    } else {
                        roads.push(newroad)
                    }
                }
        })
    })
}

function directionsForNode(x: number, y: number) {
    return Direction.directionsWithoutDiagonals()
                    .filter(direction => {
                        return map.isInsideGrid(x + direction.x, y + direction.y) && map.node(x + direction.x, y + direction.y)!=='#'
                    })      
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
