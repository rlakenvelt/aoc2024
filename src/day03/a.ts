import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 03A: Mull It Over'
const input = new InputHelper();
const logger = new Logger(puzzle);

const memory = input.getInput().join(' ');

logger.start();

const regex = /mul\((\d+),(\d+)\)/g;
let match;
let sum = 0;

while ((match = regex.exec(memory)) !== null) {
    const x = parseInt(match[1]);
    const y = parseInt(match[2]);
    sum += x * y;
}

logger.end(sum);