import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 24A: Crossed Wires'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput('\n\n');

type WireMap = Map<string, number>;
type Gate = { wireIn1: string, type: string, wireIn2: string, wireOut: string, waiting: boolean, possiblyWrong: number };

logger.start();

const wires: WireMap = inputValues[0].split('\n').reduce((acc: WireMap, wire) => {
    const [key, value] = wire.split(': ');
    acc.set(key, parseInt(value));
    return acc;
}, new Map());

const gates: Gate[] = inputValues[1].split('\n').map((gate) => {
    const [wireIn1, type, wireIn2, , wireOut] = gate.split(' ');
    return { wireIn1, type, wireIn2, wireOut, waiting: true, possiblyWrong: 0 };
});

const xInput = getInput('x', wires);
const yInput = getInput('y', wires);
const zOutput = xInput + yInput;


let answer = 0;

simulateGates(wires, gates);

const zWires = Array.from(wires.entries())
    .filter(([key, _]) => key.startsWith('z'))
    .sort(([key1, _1], [key2, _2]) => { if (key1 < key2) return -1; if (key1 > key2) return 1; return 0; })
    .map(([_, value]) => value);

const binaryNumber = zWires.reverse().join('');
let zWrongOutput = parseInt(binaryNumber, 2);
// console.log(zOutput, zWrongOutput);

// console.log(zOutput.toString(2).split('').join(' '));
// console.log(zWrongOutput.toString(2).split('').join(' '));
const okBits: boolean[] = zOutput.toString(2).split('').map((bit, index) => bit === zWrongOutput.toString(2)[index]).reverse();
// console.log(okBits);
// Z011

okBits.forEach((ok, index) => {
    if (!ok) {
        console.log('z' + index.toString().padStart(2, "0"));
        markGates('z' + index.toString().padStart(2, "0"), gates, 0);
    }
});

// gates.filter(gate=>gate.possiblyWrong> 0)
//     //  .sort((gate1, gate2) => gate2.possiblyWrong - gate1.possiblyWrong)
//      .forEach(gate => console.log(`${gate.wireOut} -> ${gate.wireIn1} ${gate.type} ${gate.wireIn2} ${gate.possiblyWrong}`));

logger.end(answer);

function markGates(wire: string, gates: Gate[], level: number) {
    const gate = gates.find(gate => gate.wireOut === wire);
    if (gate === undefined) {
        return;
    }
    // if (level === 0) {
        console.log( ' '.repeat(level) +  `${gate.wireOut} -> ${gate.wireIn1} ${gate.type} ${gate.wireIn2}`);
    // }
    gate.possiblyWrong++;
    markGates(gate.wireIn1, gates, level + 1);
    markGates(gate.wireIn2, gates, level + 1);
    // return `(${value1} ${gate.type} ${value2})`;
}


function simulateGates(wires: WireMap, gates: Gate[]) {
    while (gates.some(gate => gate.waiting)) {
        gates.filter(gate => gate.waiting).forEach(gate => {
            const value1 = wires.get(gate.wireIn1);
            const value2 = wires.get(gate.wireIn2);

            if (value1 !== undefined && value2 !== undefined) {
                let result = 0;

                switch (gate.type) {
                    case 'AND':
                        result = value1 & value2;
                        break;
                    case 'OR':
                        result = value1 | value2;
                        break;
                    case 'XOR':
                        result = value1 ^ value2;
                        break;
                }

                wires.set(gate.wireOut, result);
                gate.waiting = false;
            }
        });
    }
}

function getInput(type: string, wires: WireMap) {
    const xbits = [...wires].filter(([key, _]) => key.startsWith(type)).sort(([key1, _1], [key2, _2]) => { if (key1 < key2) return -1; if (key1 > key2) return 1; return 0; }).map(([_, value]) => value);
    return parseInt(xbits.reverse().join(''), 2);

}
