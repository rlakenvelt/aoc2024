import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Computer } from './computer';

const puzzle = 'Day 17A: Chronospatial Computer'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput();

const A = BigInt(inputValues[0].split(' ')[2]);
const B = BigInt(inputValues[1].split(' ')[2]);
const C = BigInt(inputValues[2].split(' ')[2]);
const p = inputValues[4].split(' ')[1].split(',').map(v=>parseInt(v));

const computer = new Computer(A, B, C, p);

logger.start();
computer.run();
let answer = computer.output.join(',');

logger.end(answer);

