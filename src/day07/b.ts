import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 07B: Bridge Repair'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput();
let maxValues = 0;
const equations = inputValues.map((line: string) => {
    const parts = line.split(':');
    const equation = {testvalue: parseInt(parts[0]), values: parts[1].trim().split(' ').map((value: string) => parseInt(value))};
    maxValues = Math.max(maxValues, equation.values.length);
    return equation;
});

logger.start();


let allOperatorCombinations: any[] = [];
for (let i = 1; i < maxValues; i++) {
    allOperatorCombinations.push(generateOperatorCombinations(i));
}

let answer = equations.reduce((acc: number, equation: any) => {
    return acc + equantionSolver(equation);
}, 0);

logger.end(answer);

function equantionSolver(equation: any): number {
    for (let i = 0; i < allOperatorCombinations[equation.values.length-2].length; i++) {
        let result = equation.values[0];
        allOperatorCombinations[equation.values.length-2][i].forEach((operator: string, index: number) => {
            if (operator === '||') {
                const expression = `${result}${equation.values[index + 1]}`;
                result = eval(expression);
            } else {
                const expression = `${result} ${operator} ${equation.values[index + 1]}`;
                result = eval(expression);
            }
        })
        if (result === equation.testvalue) {
            return result;
        }

    };

 
    return 0;
}

function generateOperatorCombinations(length: number): string[][] {
    const operators = ['+', '*', '||'];
    if (length === 1) return operators.map(op => [op]);
    const combinations: string[][] = [];
    const shorterCombinations = generateOperatorCombinations(length - 1);
    for (const op of operators) {
        for (const shorterCombination of shorterCombinations) {
            combinations.push([op, ...shorterCombination]);
        }
    }
    return combinations;
}
