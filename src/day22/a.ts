import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 22A: Monkey Market'
const input = new InputHelper();
const logger = new Logger(puzzle);

const buyers = input.getInput().map(BigInt);

logger.start();
let answer = 0n;

buyers.forEach((secret) => {
    for (let i = 0; i < 2000; i++) {
        secret = nextSecretNumber(secret);
    }
    answer += secret;
});

logger.end(answer.toString());

function nextSecretNumber(secret: bigint): bigint {
    secret = mixAndPrune(secret, secret * 64n);
    secret = mixAndPrune(secret, secret / 32n);
    secret = mixAndPrune(secret, secret * 2048n);
    return secret;
}

function mixAndPrune(secret: bigint, value: bigint): bigint {
    secret = (secret ^ value) & 0xFFFFFFFFFFFFFFFFn; // Ensure the result is positive
    secret = secret % 16777216n;
    return secret;
}