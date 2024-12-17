import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Computer } from './computer';

const puzzle = 'Day 17B: Chronospatial Computer'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput();

let A = 0
const B = parseInt(inputValues[1].split(' ')[2]);
const C = parseInt(inputValues[2].split(' ')[2]);
const p = inputValues[4].split(' ')[1].split(',').map(v=>parseInt(v));

let answer = 0;
const program = p.join(',');
while (true) {
    const computer = new Computer(A, B, C, p);
    computer.run();
    // console.log(A, computer.output.join(','));
    if (computer.output.join(',') === program) {
        answer = A;
        break;
    }
    A++;
    if (A % 1000000 === 0) {
        console.log(A, computer.output.length );
    }
}

logger.start();

logger.end(answer);

