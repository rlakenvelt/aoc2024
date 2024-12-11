import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 11A: Plutonian Pebbles'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getRawInput().split(' ').map(Number);
console.log(inputValues);

logger.start();

let stones = inputValues;
const blinks = 25;
for (let i = 0; i < blinks; i++) {
    stones = transformStones(stones);
}
let answer = stones.length;

logger.end(answer);


function transformStones(stones: number[]): number[] {
    const newStones: number[] = [];
    stones.forEach(stone => {
        if (stone === 0) {
            newStones.push(1);
        } else if (stone.toString().length % 2 === 0) {
            const str = stone.toString();
            const mid = str.length / 2;
            newStones.push(parseInt(str.slice(0, mid)), parseInt(str.slice(mid)));
        } else {
            newStones.push(stone * 2024);
        }
    });
    return newStones;
}