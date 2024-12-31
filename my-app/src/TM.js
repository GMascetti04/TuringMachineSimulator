export class TM {
    InitialState;
    States;
    Blank;
    InputAlphabet;
    TapeAlphabet;

    constructor() {
        this.InitialState = null;
        this.States = new Map();
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




export const ComputationResult = {
	ACCEPT : 0,
    REJECT : 1,
    TRANSITIONS_EXCEEDED : 2,
    LEFT_TAPE_EXCEEDED : 3,
    RIGHT_TAPE_EXCEEDED : 4,
    INVALID_MACHINE_DEFINITION : 5,
    NULL : 6
}

export const MachineSpeed = {
    STEP_BY_STEP:  0,
    SLOW: 1,
    MEDIUM: 2,
    FAST: 3,
    INSTANT: 4
}

export class MachineSettings {
    machineSpeed;
    maximumTransitions;

    constructor() {
        this.machineSpeed = MachineSpeed.MEDIUM;
        this.maximumTransitions = 0;
        
    }


}


export class TapeWriter {
    leftTape;
    center;
    rightTape;
    headPos;

    constructor() {
        this.leftTape = [];
        this.rightTape = [];
        this.center = '';
        this.headPos = 0;
    }
}

export class StateProperties {
    isFinalState;
    Transitions;

    constructor() {
        this.isFinalState = null;
        this.Transitions = new Map();
    }
}

export class TransitionImage {
    newState;
    writeChar;
    tapeMove;

    constructor() {
        this.newState = null;
        this.writeChar = null;
        this.tapeMove = null;
    }
}





