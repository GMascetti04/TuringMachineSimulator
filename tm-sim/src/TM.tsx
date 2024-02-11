export class TM {
    InitialState: string | null;
    States: Map<string, StateProperties>;
    Blank: string | null;
    InputAlphabet: string[] | null;
    TapeAlphabet: string[] | null;

    constructor() {
        this.InitialState = null;
        this.States = new Map<string, StateProperties>();
        this.Blank = null;
        this.InputAlphabet = null;
        this.TapeAlphabet = null;
    }

    

}

/*
class TransitionRecord {
    curState: string;
    readChar: string;

    newState: string;
    writeChar: string;
    tapeMove: string

}*/

export enum ComputationResult {
    ACCEPT,
    REJECT,
    TRANSITIONS_EXCEEDED,
    LEFT_TAPE_EXCEEDED,
    RIGHT_TAPE_EXCEEDED,
    INVALID_MACHINE_DEFINITION,
    NULL
}


export class TapeWriter {
    leftTape: string[];
    center: string;
    rightTape: string[];
    headPos: number;

    constructor() {
        this.leftTape = [];
        this.rightTape = [];
        this.center = '';
        this.headPos = 0;
    }
}

export class StateProperties {
    isFinalState: boolean | null;
    Transitions: Map<string, TransitionImage>;

    constructor() {
        this.isFinalState = null;
        this.Transitions = new Map();
    }
}

export class TransitionImage {
    newState: string | null;
    writeChar: string | null;
    tapeMove: string | null;

    constructor() {
        this.newState = null;
        this.writeChar = null;
        this.tapeMove = null;
    }
}





