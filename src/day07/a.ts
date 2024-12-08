import InputHelper from '../utils/input';
import Logger from '../utils/logger';

const puzzle = 'Day 07A: Bridge Repair'
const input = new InputHelper();
const logger = new Logger(puzzle);

const inputValues = input.getInput();
const equations = inputValues.map((line: string) => {
    const parts = line.split(':');
    return {testvalue: parseInt(parts[0]), values: parts[1].trim().split(' ').map((value: string) => parseInt(value))};
});

logger.start();

let answer = equations.reduce((acc: number, equation: any) => {
    return acc + equantionSolver(equation);
}, 0);

logger.end(answer);

function equantionSolver(equation: any): number {
    const operatorCombinations = generateOperatorCombinations(equation.values.length - 1);
    for (let i = 0; i < operatorCombinations.length; i++) {
        let result = equation.values[0];
        operatorCombinations[i].forEach((operator: string, index: number) => {
            const expression = `${result} ${operator} ${equation.values[index + 1]}`;
            result = eval(expression);
        })
        if (result === equation.testvalue) {
            return result;
        }
    };
    return 0;
}

function generateOperatorCombinations(length: number): string[][] {
    const operators = ['+', '*'];
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
