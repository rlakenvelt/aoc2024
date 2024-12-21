
export class Computer {
    program: number[] = [];
    A: bigint = 0n;
    B: bigint = 0n;
    C: bigint = 0n;
    pointer: number = 0;
    output: number[] = [];

    constructor (A: bigint, B: bigint, C: bigint, program: number[]) {
        this.A = A;
        this.B = B;
        this.C = C;
        this.program = program;
    }

    reset (A: bigint, B: bigint, C: bigint) {
        this.A = A;
        this.B = B;
        this.C = C;
        this.pointer = 0;
        this.output = [];
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
            if (instruction !== 3 || this.A === 0n) {
                this.pointer += 2;
            }
        }
    }

    // 0
    adv (operand: number) {
        this.A = this.A / (2n ** BigInt(this.combo(operand))) 
    }
    // 1
    bxl (operand: number) {
        this.B = this.B ^ BigInt(operand)
    }
    // 2
    bst (operand: number) {
        this.B = this.combo(operand) % 8n 
    }
    // 3
    jnz (operand: number) {
        if (this.A !== 0n) {
            this.pointer = operand;
        }
    }
    // 4
    bxc (operand: number) {
        this.B = this.B ^ this.C;
    }
    // 5
    out (operand: number) {
        // console.log('OUT', operand, this.B, this.combo(operand) % 8);
        const value = this.combo(operand) % 8n;
        this.output.push(parseInt(value.toString()));
    }
    // 6
    bdv (operand: number) {
        this.B = this.A / (2n ** BigInt(this.combo(operand))) 
    }
    // 7
    cdv (operand: number) {
        this.C = this.A / (2n ** BigInt(this.combo(operand))) 
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
                return BigInt(operand)
        }
    }
}

