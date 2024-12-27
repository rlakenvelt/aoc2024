import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 19A: Linen Layout'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput(input.dblEol);
const towels = inputValues[0].split(',').map(towel => towel.trim()); 
const patterns = inputValues[1].split(input.eol).map(pattern => pattern.trim());

logger.start();
let answer = 0;

patterns.forEach(pattern => {
    if (canConstructPattern(pattern, towels)) {
        answer++;
    }
});

logger.end(answer);

function canConstructPattern(pattern: string, towels: string[]): boolean {
    const canConstruct = Array(pattern.length + 1).fill(false);
    canConstruct[0] = true;

    for (let i = 1; i <= pattern.length; i++) {
        for (let towel of towels) {
            if (i >= towel.length && pattern.slice(i - towel.length, i) === towel) {
                canConstruct[i] = canConstruct[i] || canConstruct[i - towel.length];
            }
        }
    }

    return canConstruct[pattern.length];
}