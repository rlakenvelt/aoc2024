
export class Computer {
    program: number[] = [];
    A: number = 0;
    B: number = 0;
    C: number = 0;
    pointer: number = 0;
    output: number[] = [];

    constructor (A: number, B: number, C: number, program: number[]) {
        this.A = A;
        this.B = B;
        this.C = C;
        this.program = program;
    }

    run () {
        let m = 0
        while (this.pointer < this.program.length) {
            const instruction = this.program[this.pointer];
            const operand = this.program[this.pointer + 1];
            switch (instruction) {
                case 0:
                    this.adv(operand);
                    break;
                case 1:
                    this.bxl(operand);
                    break;
                case 2:
                    this.bst(operand);
                    break;
                case 3:
                    this.jnz(operand);
                    break;
                case 4:
                    this.bxc(operand);
                    break;
                case 5:
                    this.out(operand);
                    break;
                case 6:
                    this.bdv(operand);
                    break;
                case 7:
                    this.cdv(operand);
                    break;
                default:
                    throw new Error('Invalid instruction');
            }
            if (instruction !== 3 || this.A === 0) {
                this.pointer += 2;
            }
        }
    }

    adv (operand: number) {
        this.A = Math.floor(this.A / (2 ** this.combo(operand)))
    }

    bxl (operand: number) {
        this.B = this.B ^ operand
    }

    bst (operand: number) {
        this.B = this.combo(operand) % 8 & 7
    }

    jnz (operand: number) {
        if (this.A !== 0) {
            this.pointer = operand;
        }
    }

    bxc (operand: number) {
        this.B = this.B ^ this.C;
    }

    out (operand: number) {
        this.output.push(this.combo(operand) % 8);
    }

    bdv (operand: number) {
        this.B = Math.floor(this.A / (2 ** this.combo(operand)))
    }

    cdv (operand: number) {
        this.C = Math.floor(this.A / (2 ** this.combo(operand)))
    }

    combo (operand: number) {
        switch (operand) {
            case 4:
                return this.A
            case 5:
                return this.B
            case 6:
                return this.C
            default:
                return operand
        }
    }
}

