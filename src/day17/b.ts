import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Computer } from './computer';

const puzzle = 'Day 17B: Chronospatial Computer'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput();

const A = BigInt(inputValues[0].split(' ')[2]);
const B = BigInt(inputValues[1].split(' ')[2]);
const C = BigInt(inputValues[2].split(' ')[2]);
const program = inputValues[4].split(' ')[1].split(',').map(v => parseInt(v));

const computer = new Computer(A, B, C, program);

logger.start();
let answer = 0n;

findValidCombination(program.length - 1, 0n);

logger.end(parseInt(answer.toString()));

// Program loops while A is not 0
// Last instructioh (0, 3) in the only instruction that modifies A. 
// This instruction divides A by 8 (2 ** 3). This means striping the last 3 bits of A
// Reverse enginieering by running the program backwards, 
// multiplying A by 8 and trying all value 1 - 8 to add the missing bits

function findValidCombination(index: number, currentAnswer: bigint): boolean {
    if (index < 0) {
        answer = currentAnswer;
        return true;
    }
    currentAnswer = currentAnswer * 8n;
    const p = [...program].slice(index).join(',');
    let validValues: number[] = [];
    for (let j = 0; j < 8; j++) {
        computer.reset(currentAnswer + BigInt(j), B, C);
        computer.run();
        if (computer.output.join(',') === p) {
            validValues.push(j);
        }
    }
    for (const value of validValues) {
        if (findValidCombination(index - 1, currentAnswer + BigInt(value))) {
            return true;
        }
    }

    return false;
}

