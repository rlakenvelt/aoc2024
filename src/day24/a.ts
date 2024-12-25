import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 24A: Crossed Wires'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput('\n\n');

type WireMap = Map<string, number>;
type Gate = { wireIn1: string, type: string, wireIn2: string, wireOut: string, waiting: boolean };

logger.start();

const wires: WireMap = inputValues[0].split('\n').reduce((acc: WireMap, wire) => {
    const [key, value] = wire.split(': ');
    acc.set(key, parseInt(value));
    return acc;
}, new Map());

const gates: Gate[] = inputValues[1].split('\n').map((gate) => {
    const [wireIn1, type, wireIn2, , wireOut] = gate.split(' ');
    return { wireIn1, type, wireIn2, wireOut, waiting: true };
});

simulateGates(wires, gates);

const zWires = Array.from(wires.entries())
    .filter(([key, _]) => key.startsWith('z'))
    .sort(([key1, _1], [key2, _2]) => { if (key1 < key2) return -1; if (key1 > key2) return 1; return 0; })
    .map(([_, value]) => value);

const binaryNumber = zWires.reverse().join('');
let answer = parseInt(binaryNumber, 2);

logger.end(answer);

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