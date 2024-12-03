import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 03B: Mull It Over'
const input = new InputHelper();
const logger = new Logger(puzzle);

const memory = input.getInput().join(' ');

logger.start();

const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
let match;
let answer = 0;
let enabled = true;

while ((match = regex.exec(memory)) !== null) {
    if (match[0] === 'do()') {
        enabled = true;
    } else if (match[0] === "don't()") {
        enabled = false;
    } else if (enabled ) {
        const x = parseInt(match[1]);
        const y = parseInt(match[2]);
        answer += x * y;
    }
}

logger.end(answer);
