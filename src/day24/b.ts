import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 24B: Crossed Wires'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput('\n\n');

type Gate = { wireIn1: string, type: string, wireIn2: string, wireOut: string};

logger.start();

const gates: Gate[] = inputValues[1].split('\n').map((gate) => {
    const [wireIn1, type, wireIn2, , wireOut] = gate.split(' ');
    return { wireIn1, type, wireIn2, wireOut};
});
const numberOfOutputBits = gates.filter(gate=>gate.wireOut.startsWith('z')).length

let answer = [...findWrongANDGates(), ...findWrongXORGates(), ...findWrongORGates()].sort().join(",");
logger.end(answer);

// AND gates deliver the carry bit and can only have OR as outcome beacuse it has to be added to the next higher significant bit
// XORs must end up with a XOR and AND, or it has a Z value
// ORs must end up with a XOR and AND or it leads to Z<highest significant bit> 

function findWrongXORGates () {
  const wrongGates:string[] = [];
  gates.filter(gate => gate.type === "XOR")
      .forEach(gate => {
        if (!gate.wireOut.startsWith('z')) {
          const foundXORGate = gates.find(g =>
            g.type === "XOR" && (g.wireIn1 === gate.wireOut || g.wireIn2 === gate.wireOut),
          );     
          const foundANDGate = gates.find(g =>
            g.type === "AND" && (g.wireIn1 === gate.wireOut || g.wireIn2 === gate.wireOut),
          );     
          if (!foundXORGate || !foundANDGate) {
            wrongGates.push(gate.wireOut);
          }   
        }
      })
  return wrongGates;
}

function findWrongANDGates () {
  const wrongGates:string[] = [];
  gates.filter(gate => gate.type === "AND")
      .forEach(gate => {
        const foundGate = gates.find(g =>
          g.type === 'OR' && (g.wireIn1 === gate.wireOut || g.wireIn2 === gate.wireOut),
        );     
        if (!foundGate) {
          wrongGates.push(gate.wireOut);
        }   
      })
  return wrongGates;
}

function findWrongORGates () {
  const wrongGates:string[] = [];
  const ignoreEdgeCase = `z${(numberOfOutputBits-1).toString().padStart(2, "0")}`;

  gates.filter(gate => gate.type === "OR")
      .forEach(gate => {
        const foundXORGate = gates.find(g =>
          g.type === "XOR" && (g.wireIn1 === gate.wireOut || g.wireIn2 === gate.wireOut),
        );     
        const foundANDGate = gates.find(g =>
          g.type === "AND" && (g.wireIn1 === gate.wireOut || g.wireIn2 === gate.wireOut),
        );     
        if (!foundXORGate || !foundANDGate) {
          wrongGates.push(gate.wireOut);
        }   
      })
  return wrongGates.filter(wire => wire !== ignoreEdgeCase);
}




