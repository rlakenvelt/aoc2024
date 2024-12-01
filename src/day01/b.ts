import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 1B: Historian Hysteria'
const input = new InputHelper();
const logger = new Logger(puzzle);
const lines = input.getInput();

logger.start();

const list1 = lines.map(line=>parseInt(line.split(' ')[0]))
const list2 = lines.map(line=>parseInt(line.split('   ')[1]));

let answer = list1.reduce((acc, curr) => {
    const apearances = list2.filter(num => num === curr).length;
    return acc + curr * apearances;
}, 0);

logger.end(answer);

