import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Grid } from '../utils/grid';
import { Antenna } from './antenna';
import { Antinode } from './antinode';

const puzzle = 'Day 08B: Resonant Collinearity'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput().map(l => l.split(''));
const map: Grid<string> = new Grid(inputValues[0].length, inputValues.length)

map.setGrid(inputValues)

logger.start();

const antennas = getAntennas(map);
const frequencies = getUniqueFrequencies(antennas);
const antinodes: Antinode[] = [];

frequencies.forEach(f => {
    const sameAntennas = antennas.filter(a => a.frequency === f);
    for ( let i = 0; i < sameAntennas.length; i++) {
        for (let j = i + 1; j < sameAntennas.length; j++) {
            const xDistance = sameAntennas[i].location.x - sameAntennas[j].location.x;
            const yDistance = sameAntennas[i].location.y - sameAntennas[j].location.y;
            let x = sameAntennas[i].location.x + xDistance;
            let y = sameAntennas[i].location.y + yDistance;

            if (map.isInsideGrid(x, y)) {
                antinodes.push(new Antinode(x, y));
            }
            x = sameAntennas[j].location.x - xDistance;
            y = sameAntennas[j].location.y - yDistance;
            if (map.isInsideGrid(x, y)) {
                antinodes.push(new Antinode(x, y));
            }
        }
    }
});

const uniqueAntinodes = Array.from(new Set(antinodes.map(a => `${a.location.x},${a.location.y}`)))
    .map(str => {
        const [x, y] = str.split(',').map(Number);
        return new Antinode(x, y);
    });

let answer = uniqueAntinodes.length;

logger.end(answer);

function getAntennas(grid: Grid<string>): Antenna[] {
    const antennas: Antenna[] = [];
    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            if (grid.grid[y][x] !== '.' && grid.grid[y][x] !== '#') {
                antennas.push(new Antenna(grid.grid[y][x], x, y));
            }
        }
    }
    return antennas;
}

function getUniqueFrequencies(antennas: Antenna[]): string[] {
    const frequencies = antennas.map(a => a.frequency);
    return Array.from(new Set(frequencies));
}

