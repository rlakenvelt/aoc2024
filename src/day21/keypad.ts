
import { Graph } from '../utils/graph'

export class Keypad {
    type: string;
    private keypad: Graph<string>;
    private symbols: Map<string, string>
    private paths: Map<string, string>
    private buttons: string[] = [];

    constructor (type: string = 'directional') {
        this.type = type;
        this.symbols = new Map()
        this.paths = new Map()
        this.keypad = new Graph<string>(true);
        if (type === 'numeric') {
            this.connectButtons('7', '8', '>');
            this.connectButtons('8', '9', '>');
            this.connectButtons('7', '4', 'v');
            this.connectButtons('8', '5', 'v');
            this.connectButtons('9', '6', 'v');
            this.connectButtons('4', '5', '>');
            this.connectButtons('5', '6', '>');
            this.connectButtons('4', '1', 'v');
            this.connectButtons('5', '2', 'v');
            this.connectButtons('6', '3', 'v');
            this.connectButtons('1', '2', '>');
            this.connectButtons('2', '3', '>');
            this.connectButtons('2', '0', 'v');
            this.connectButtons('3', 'A', 'v');
            this.connectButtons('0', 'A', '>');
        } else {
            this.connectButtons('^', 'A', '>');
            this.connectButtons('^', 'v', 'v');
            this.connectButtons('A', '>', 'v');
            this.connectButtons('<', 'v', '>');
            this.connectButtons('v', '>', '>');
        }
        this.calculateAllPaths();
    }

    private connectButtons (start: string, end: string, symbol: string) {
        const reverseSymbol = symbol === '>' ? '<' : '^';
        this.keypad.addEdge(start, end);    
        this.symbols.set(`${start}${end}`, symbol);
        this.keypad.addEdge(end, start);    
        this.symbols.set(`${end}${start}`, reverseSymbol);
        this.buttons.push(start);
        this.buttons.push(end);
    }
    private calculateAllPaths () {
        for (let i = 0; i < this.buttons.length; i++) {
            for (let j = 0; j < this.buttons.length; j++) {
                if (i !== j) {
                    const paths = this.buttonSequences(this.buttons[i], this.buttons[j]);
                    this.paths.set(`${this.buttons[i]}${this.buttons[j]}`, paths[0]);
                }
            }
        }
    }

    buttonSequences (start: string, end: string) {
        if (start === end) return ['A'];

        const paths = this.keypad.dfs(start, end).sort((a, b) => a.costs - b.costs);
        const minCosts = paths[0].costs;
        let minTurns = Infinity;
        let shortestPaths = paths.filter(path => path.costs === minCosts)
                                   .map(path => {
                                        const p: string[] = []
                                        for (let i = 0; i < path.path.length - 1; i++) {
                                            const symbol = this.symbols.get(`${path.path[i]}${path.path[i+1]}`) || ''
                                            p.push(symbol)
                                        }
                                        let turns = 0;
                                        for (let i = 0; i < p.length - 1; i++) {
                                            if (p[i] !== p[i+1]) {
                                                turns++;
                                            }
                                        }
                                        minTurns = Math.min(minTurns, turns);
                                        return {path: p.join('') + 'A', turns: turns};
                                   });
        let filteredPaths = shortestPaths.filter(path => path.turns === minTurns).map(path => path.path);
        return filteredPaths;
    }

}