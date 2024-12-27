import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 19B: Linen Layout'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput(input.dblEol);
const towels = inputValues[0].split(',').map(towel => towel.trim()); 
const patterns = inputValues[1].split(input.eol);

logger.start();
let answer = 0;

patterns.forEach(pattern => {
    answer+=numberOfConstructs(pattern, towels)
});

logger.end(answer);

function numberOfConstructs(pattern: string, towels: string[]): number {
    const canConstruct = Array(pattern.length + 1).fill(0);
    canConstruct[0] = 1;

    for (let i = 1; i <= pattern.length; i++) {
        for (let towel of towels) {
            if (i >= towel.length && pattern.slice(i - towel.length, i) === towel) {
                if (canConstruct[i - towel.length] > 0) {
                    canConstruct[i] = canConstruct[i] + canConstruct[i - towel.length];
                }
            }
        }
    }

    return canConstruct[pattern.length];
}