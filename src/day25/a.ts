import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 25A'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput(input.dblEol).map(i => i.split(input.eol));
let locks: number[][] = [];
let keys: number[][] = [];

logger.start();

inputValues.forEach(i => {
    const counts = [0,0,0,0,0]
    i.forEach(j => {
        j.split('').forEach((k, i) => {
            if (k === '#') counts[i]++;
        });
    })
    if(i[0] === '#####') {
        locks.push(counts);
    } else {
        keys.push(counts);
    }
});
let answer = 0;
locks.forEach((lock, i) => {
    keys.forEach((key, j) => {
        let valid = true;
        for(let k = 0; k < 5; k++) {
            if(lock[k] + key[k] > 7) {
                valid = false;
                break;
            }
        }
        if(valid) {
            answer++;
        }
    });
})

logger.end(answer);

