import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import Common from '../utils/common';

const puzzle = 'Day 11B: Plutonian Pebbles'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getRawInput().split(' ').map(Number);

logger.start();

let stoneCounts = new Map<number, number>();
inputValues.forEach(stone => {
    stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1);
});

const blinks = 75;
for (let i = 0; i < blinks; i++) {
    stoneCounts = transformStones(stoneCounts);
}

let answer = Array.from(stoneCounts.values()).reduce(Common.total);

logger.end(answer);

function transformStones(stoneCounts: Map<number, number>): Map<number, number> {
    const newStoneCounts = new Map<number, number>();

    stoneCounts.forEach((count, stone) => {
        if (stone === 0) {
            addStoneCounts(newStoneCounts, 1, count);
        } else if (stone.toString().length % 2 === 0) {
            const str = stone.toString();
            const mid = str.length / 2;
            const left = parseInt(str.slice(0, mid));
            const right = parseInt(str.slice(mid));
            addStoneCounts(newStoneCounts, left, count);
            addStoneCounts(newStoneCounts, right, count);
        } else {
            addStoneCounts(newStoneCounts, stone * 2024, count);
        }
    });

    return newStoneCounts;
}

function addStoneCounts(stoneCounts: Map<number, number>, type: number, add: number) {
    stoneCounts.set(type, (stoneCounts.get(type) || 0) + add);
}