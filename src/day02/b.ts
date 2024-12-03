import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 02B: Red-Nosed Reports'
const input = new InputHelper();
const logger = new Logger(puzzle);

const reports = input.getInput().map(report => report.split(' ').map(Number));

logger.start();
let answer = 0;

for (let report of reports) {
    for (let i = 0; i < report.length; i++) {
        if (isSafe(report.filter((_, index) => index !== i))) {
            answer++;
            break;
        }
    }   
}

function isSafe (levels: number[]): boolean {
    let increasing = false;
    let decreasing = false;
    for (let i = 0; i < levels.length -1; i++) {
        const diff = levels[i] - levels[i + 1];
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
        if (diff < 0) increasing = true;
        if (diff > 0) decreasing = true;
        if (increasing&&decreasing) return false;
    }
    return true;
};

logger.end(answer);

