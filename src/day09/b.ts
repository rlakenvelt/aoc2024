import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 09B: Disk Fragmenter'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput()[0].split('');
const blocks: string[] = [];
let file = true;
let ID = 0;
let freeSpace: {index:number, length: number}[] = [];
let files: {ID: number, index:number, length: number}[] = [];

logger.start();
inputValues.forEach((value) => {
    const count = parseInt(value);
    if (file) {
        files.push({ID: ID, index: blocks.length, length: count});
        for (let i = 0; i < count; i++) {
            blocks.push(ID.toString());
        }
        ID++;
    } else {
        freeSpace.push({index: blocks.length, length: count});
        for (let i = 0; i < count; i++) {
            blocks.push('.');
        }
    }
    file = !file;
});
ID--;

files.sort((a, b) => b.ID - a.ID).forEach((file) => {
    let firstSpace = freeSpace.find((space) => space.length >= file.length && space.index < file.index);
    if (firstSpace) {
        for (let i = 0; i < file.length; i++) {
            blocks[firstSpace.index + i] = file.ID.toString();
            blocks[file.index + i] = '.';
        }
        firstSpace.index += file.length;
        firstSpace.length -= file.length;
    }

});

let answer = blocks.reduce((acc, block, index) => {
    if (block !== '.') {
        acc += parseInt(block) * index;
    }
    return acc;
}, 0);

logger.end(answer);

