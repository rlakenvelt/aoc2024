import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 1A: '
const input = new InputHelper();
const logger = new Logger(puzzle);
const lines = input.getInput();

logger.start();

let answer = 0;

logger.end(answer);

