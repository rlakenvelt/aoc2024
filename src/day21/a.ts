import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Keypad } from './keypad';

const puzzle = 'Day 21A: Keypad Conundrum'
const input = new InputHelper();
const logger = new Logger(puzzle);

const codes = input.getInput();
const keypads: Keypad[] = [];

logger.start();

for (let i = 0; i < 3; i++) {
    if (i === 0) {
        keypads.push(new Keypad('numeric'));
    } else {
        keypads.push(new Keypad());
    }
}

let answer = 0;

for (let i = 0; i < codes.length; i++) {
    let directionalCodes = new Set<string>;
    directionalCodes.add(codes[i])
    keypads.forEach((keypad) => {
        const newDirectionalCodes = new Set<string>;
        directionalCodes.forEach((directionalCode) => {
            const sequences = keypad.pressCode(directionalCode);
            for (let j = 0; j < directionalCodes.size; j++) {
                for (let k = 0; k < sequences.length; k++) {
                    newDirectionalCodes.add(sequences[k]);
                }
            }
        });
        directionalCodes = newDirectionalCodes;
    });
    let codesArray = Array.from(directionalCodes)
    codesArray.sort((a, b) => a.length - b.length);
    answer += codesArray[0].length * parseInt(codes[i].substring(0, 3));
    console.log(codes[i], codesArray[0], codesArray[0].length);
}

logger.end(answer);

