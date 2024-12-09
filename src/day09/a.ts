import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 09A: Disk Fragmenter'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput()[0].split('');
const blocks: string[] = [];
let file = true;
let ID = 0;
let firstFree = -1;


logger.start();
inputValues.forEach((value) => {
    const count = parseInt(value);
    if (file) {
        for (let i = 0; i < count; i++) {
            blocks.push(ID.toString());
        }
        ID++;
    } else {
        for (let i = 0; i < count; i++) {
            blocks.push('.');
        }
    }
    file = !file;
});
for (let i = blocks.length - 1; i > 0; i--) {
    if (blocks[i] !== '.') {
        firstFree = blocks.indexOf('.');
        if (firstFree > i) break
        blocks[firstFree] = blocks[i];
        blocks[i] = '.';
    }
}

let answer = blocks.reduce((acc, block, index) => {
    if (block !== '.') {
        acc += parseInt(block) * index;
    }
    return acc;
}, 0);

logger.end(answer);

