import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 23A: LAN Party'
const input = new InputHelper();
const logger = new Logger(puzzle);

const connections = input.getInput().map(line => line.split('-'));

logger.start();

const c = connections.reduce((acc, connection) => {
    connection.forEach(c => {
        if (!acc.includes(c)) {
            acc.push(c);
        }
    })
    return acc;
}, []);

const computers = c.map(computer => {
    const c = connections.filter(connection => connection.includes(computer));
    const to = c.map(connection => connection.filter(c => c !== computer)[0]);
    return { computer, to };
});

const setsOfThree: Set<string>[] = [];

for (let i = 0; i < computers.length; i++) {
    for (let j = i + 1; j < computers.length; j++) {
        for (let k = j + 1; k < computers.length; k++) {
            const a = computers[i];
            const b = computers[j];
            const c = computers[k];
            if (a.to.includes(b.computer) && a.to.includes(c.computer) && b.to.includes(c.computer)) {
                setsOfThree.push(new Set([a.computer, b.computer, c.computer]));
            }
        }
    }
}
const filteredSets = setsOfThree.filter(set => {
    return Array.from(set).some(computer => computer.startsWith('t'));
});

let answer = filteredSets.length;

logger.end(answer);

