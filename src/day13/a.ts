import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 13A: Claw Contraption'
const input = new InputHelper();
const logger = new Logger(puzzle);

const machines = input.getInput('\n\n').map((machine) => {
    const [part1, part2, part3] = machine.split('\n');
    const buttonA = { x: trimNonNumericCharacters(part1.split(' ')[2]), y: trimNonNumericCharacters(part1.split(' ')[3])};
    const buttonB = { x: trimNonNumericCharacters(part2.split(' ')[2]), y: trimNonNumericCharacters(part2.split(' ')[3])};
    const prize = { x: trimNonNumericCharacters(part3.split(' ')[1]), y: trimNonNumericCharacters(part3.split(' ')[2]) };
    return {buttonA, buttonB, prize};
});


logger.start();
let answer = 0;
let prizesWon = 0;

machines.forEach(machine => {
    const { buttonA, buttonB, prize } = machine;

    /*
    A * aX + B * bX = pX   A + B * (bX/aX) = pX/aX  A = (pX - B * bX) / aX
    A * aY + B * bY = pY   A + B * (bY/aY) = pY/aY  A = (pY - B * bY) / aY

    (pX - B * bX) / aX = (pY - B * bY) / aY
    aY * (pX - B * bX) = aX * (pY - B * bY)
    aY * pX - aY * B * bX = aX * pY - aX * B * bY
    aY * B * bX - aX * B * bY = aX * pY - aY * pX
    B * (aY * bX - aX * bY) = aX * pY - aY * pX
    B = (aX * pY - aY * pX) / (aY * bX - aX * bY)
    */
    const b = - (buttonA.x * prize.y - buttonA.y * prize.x) / (buttonA.y * buttonB.x - buttonA.x * buttonB.y)
    const a = (prize.x - b * buttonB.x) / buttonA.x;
    if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0) {
        const cost = a * 3 + b * 1;
        answer += cost;
    }

});
logger.end(answer);

function trimNonNumericCharacters(str: string): number {
    return parseInt(str.replace(/[^0-9\+\-]/g, ''));
}

