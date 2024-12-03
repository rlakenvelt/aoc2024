import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 03B: Mull It Over'
const input = new InputHelper();
const logger = new Logger(puzzle);

const memory = input.getInput().join(' ');

logger.start();

const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
let match;
let sum = 0;
let enabled = true;

while ((match = regex.exec(memory)) !== null) {
    if (match[0] === 'do()') {
        enabled = true;
    } else if (match[0] === "don't()") {
        enabled = false;
    } else if (enabled && match[0].startsWith('mul(')) {
        const x = parseInt(match[1]);
        const y = parseInt(match[2]);
        sum += x * y;
    }
}

logger.end(sum);
