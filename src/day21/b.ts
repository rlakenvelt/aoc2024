import InputHelper from '../utils/input';
import Logger from '../utils/logger';
import { Keypad } from './keypad';

const puzzle = 'Day 21B: Keypad Conundrum'
const input = new InputHelper();
const logger = new Logger(puzzle);
const codes = input.getInput();

type Cache = Map<string, number>;
logger.start();


const numericKeypad     = new Keypad('numeric');
const directionalKeypad = new Keypad();


const cache: Cache = new Map(); 

let answer = codes.reduce((sum, code) => {
    return sum + parseInt(code.substring(0, 3)) * getKeyPresses(numericKeypad, code, 25);
}, 0);

logger.end(answer);

function getKeyPresses (keypad: Keypad, code: string, robot: number): number {
    const key = `${code},${robot}`;
    if (cache.get(key) !== undefined) return cache.get(key) || 0;

    code = 'A' + code;
    let length = 0;
    for (let i = 0; i < code.length - 1; i++) {
        const moves = keypad.buttonSequences(code[i], code[i + 1]);
        if (robot === 0) {
            length += moves[0].length;
        } else {
            length += moves.reduce((l, move) => {
                return Math.min(l, getKeyPresses(directionalKeypad, move, robot - 1));
            }, Infinity);
        }
    }
    cache.set(key, length);
    return length;
}


