import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 05B: Print Queue'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput('\n\n');
const rules = inputValues[0].split('\n');
const pages = inputValues[1].split('\n');

logger.start();
let answer = 0;

for (let page of pages) {
    const sorted = page.split(',').map(Number).sort((a, b) => {
        const find = `${b}|${a}`;
        const order = rules.findIndex(rule => rule.includes(find));
        return order;
    })
    if (sorted.join(',') !== page) answer+= sorted[(sorted.length - 1) / 2];
}

logger.end(answer);

