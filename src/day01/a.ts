import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 1A: Historian Hysteria'
const input = new InputHelper();
const logger = new Logger(puzzle);
const lines = input.getInput();

logger.start();

const list1 = lines.map(line=>parseInt(line.split(' ')[0])).sort((a,b)=>a-b);
const list2 = lines.map(line=>parseInt(line.split('   ')[1])).sort((a,b)=>a-b);

let answer = list1.reduce((acc, curr, index) => {
    return acc + Math.abs(curr - list2[index]);
}, 0);

logger.end(answer);

