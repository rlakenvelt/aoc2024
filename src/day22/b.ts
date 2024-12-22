import InputHelper from '../utils/input';
import Logger from '../utils/logger';

// 1973 too low

const puzzle = 'Day 22B: Monkey Market'
const input = new InputHelper();
const logger = new Logger(puzzle);

type Buyer = {secret: bigint, prices: number[], changes: number[]};

const buyers = input.getInput()
                    .map(BigInt)
                    .map(secret => {
                        const buyer: Buyer = {secret, prices: [], changes: []}
                        return buyer;
                    });

logger.start();
let answer = 0n;

const sequences: Set<string> = new Set();

buyers.forEach(buyer => {
    buyer.prices = generatePrices(buyer.secret, 2000);
    buyer.changes = calculatePriceChanges(buyer.prices);
    for (let i = 0; i <= buyer.changes.length - 4; i++) {
        const sequence = buyer.changes.slice(i, i + 4).join(',');
        sequences.add(sequence);
    }
});

let maxBananas = 0;
sequences.forEach(sequence => {
    const sequenceArray = sequence.split(',').map(Number);
    let bananas = 0;
    buyers.forEach(buyer => {
        const salePriceIndex = findSalePriceIndex(buyer.changes, sequenceArray);
        if (salePriceIndex !== null) {
            bananas += buyer.prices[salePriceIndex];
        }
    });
    maxBananas = Math.max(maxBananas, bananas);

})

answer = BigInt(maxBananas);
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

function generatePrices(secret: bigint, count: number): number[] {
    const prices: number[] = [Number(secret % 10n)];
    for (let i = 0; i < count; i++) {
        secret = nextSecretNumber(secret);
        prices.push(Number(secret % 10n));
    }
    return prices;
}

function calculatePriceChanges(prices: number[]): number[] {
    const changes: number[] = [];
    for (let i = 1; i < prices.length; i++) {
        changes.push(prices[i] - prices[i - 1]);
    }
    return changes;
}

function findSalePriceIndex(changes: number[], sequence: number[]): number | null {
    for (let i = 0; i <= changes.length - sequence.length; i++) {
        if (changes.slice(i, i + sequence.length).every((value, index) => value === sequence[index])) {
            return i + sequence.length;
        }
    }
    return null;
}
