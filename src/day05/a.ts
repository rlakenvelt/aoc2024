import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 05A: Print Queue'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput(input.dblEol);
const rules = inputValues[0].split(input.eol);
const pages = inputValues[1].split(input.eol);

logger.start();
let answer = 0;

for (let page of pages) {
    const sorted = page.split(',').map(Number).sort((a, b) => {
        const find = `${b}|${a}`;
        const order = rules.findIndex(rule => rule.includes(find));
        return order;
    })
    if (sorted.join(',') === page) answer+= sorted[(sorted.length - 1) / 2];
}

logger.end(answer);

