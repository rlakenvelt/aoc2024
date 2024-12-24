import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 23B: LAN Party'
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

const allSets: string[][] = [];
computers.forEach(computer => {
    const computerSet: string[] = [computer.computer];
    computer.to.forEach(to => {
        let connectsToAll = true;
        computerSet.forEach(c => {
            const checkComputer = computers.find(computer => computer.computer === c);
            if (!checkComputer || !checkComputer.to.includes(to)) {
                connectsToAll = false;
            }
        })
        if (connectsToAll) {
            computerSet.push(to)
        }

    })
    allSets.push(computerSet);
})
allSets.sort((a, b) => b.length - a.length);
let answer = allSets[0].sort().join(',');
logger.end(answer);



