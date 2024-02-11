import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    View, Text,
    Button, StyleSheet, TextInput, Pressable,

} from 'react-native';

import MyButton from '../GeneralComponents/MyButton';

import TapeViewComponent from './TapeViewComponent';
import ComputationHistoryComponent from '../ComputationHistoryComponent';
import { TM, TapeWriter, ComputationResult } from '../TM';
import './Simulator.css';
import TapeAttribsComponent from './TapeAttribsComponent';
import InputParameterComponent, { MachineSpeed } from './InputParameterComponent';
import {ComputationDisplayComponent, Transition}  from './ComputationDisplayComponent';

class TransitionRecord {
    curState;
    readChar;

    newState;
    writeChar;
    tapeMove;

    constructor(curState, readChar, newState, writeChar , tapeMove) {
        this.curState = curState;
        this.readChar = readChar;
        this.newState = newState;
        this.writeChar = writeChar;
        this.tapeMove = tapeMove;
    }

}







function UpdateTapeFromInput(input, changeCenter, changeRightTape, rightTapeSize , blank ) {
    if (input.length == 0) {
        changeCenter(blank);
    } else {
        changeCenter(input[0]);
    }

    let a = [];
    for (let i = 1; i < Math.min(input.length, rightTapeSize + 1); i++)
        a.push(input[i]);
    while (a.length < rightTapeSize)
        a.push(blank);
    changeRightTape(a);

}


function changeArrayAtPos(array , pos, value, changeArray) {
    let a= [];
    for (let i = 0; i < array.length; i++)
        a.push(array[i]);
    a[pos] = value;
    console.log(a);
    changeArray(a);
}

function readChar(pos, leftTape, centerSpot, rightTape) {
    if (pos == 0)
        return centerSpot;
    if (pos < 0)
        return leftTape[Math.abs(pos) - 1];
    return rightTape[pos - 1];
}



function compute(machine, maxTransitions, leftTape, centerSpot, rightTape) {

    let curLeftTape = [...leftTape];
    let curCenterSpot = centerSpot;
    let curRightTape = [...rightTape];


    let curState = machine.InitialState;
    let computationRecord= [];
    let curTransitions = 0;

    let curHeadPos = 0;

    while (true) {

        let curStateProperties = machine.States.get(curState );
        if (curStateProperties === undefined) {
            return [computationRecord, ComputationResult.INVALID_MACHINE_DEFINITION];
        }

        let curChar = readChar(curHeadPos, leftTape, centerSpot, rightTape);
        let curImage = curStateProperties.Transitions.get(curChar);
        if (curImage === undefined) {
            if (curStateProperties.isFinalState)
                return [computationRecord, ComputationResult.ACCEPT];

            return [computationRecord, ComputationResult.REJECT];

        }

        if (curTransitions >= maxTransitions) {
            return [computationRecord, ComputationResult.TRANSITIONS_EXCEEDED];
        }

        computationRecord.push({
            curState: curState ,
            readChar: curChar,
            newState: curImage.newState ,
            writeChar: curImage.writeChar ,
            tapeMove: curImage.tapeMove 
        });

        curTransitions++;

        if (curHeadPos == 0) {
            curCenterSpot = curImage.writeChar ;
        } else if (curHeadPos < 0) {
            curLeftTape[Math.abs(curHeadPos) - 1] = curImage.writeChar ;
            //changeArrayAtPos(leftTape, Math.abs(pos)-1, char, changeLeftTape);
        } else {
            //changeArrayAtPos(rightTape, pos-1, char, changeRightTape);
            curRightTape[curHeadPos - 1] = curImage.writeChar ;
        }

        //writeChar(curHeadPos, curImage.writeChar as string, leftTape, centerSpot, rightTape);
        curState = curImage.newState;
        if (curImage.tapeMove === "R") {
            curHeadPos++;
            if (curHeadPos - 1 >= rightTape.length) {
                return [computationRecord, ComputationResult.RIGHT_TAPE_EXCEEDED];
            }
        } else if (curImage.tapeMove === "L") {
            curHeadPos--;
            if (Math.abs(curHeadPos) - 1 >= leftTape.length) {
                return [computationRecord, ComputationResult.LEFT_TAPE_EXCEEDED];
            }
        }
    }


}



function getTimeMili(s)  {
    switch (s) {
        case MachineSpeed.FAST:
            return 250;
        case MachineSpeed.SLOW:
            return 1000;
        case MachineSpeed.NORMAL:
            return 500;
        default:
            return -1;
    }
}

function isTimedSetting(s) {
    if (s == MachineSpeed.SLOW)
        return true;
    if (s == MachineSpeed.NORMAL)
        return true;
    if (s == MachineSpeed.FAST)
        return true;
    return false;
}


class ComputationStep {
    currentStep ;
    totalStepCount;
    previousChar;
    writtenChar;
    currentEditIndex ;
}




function MachineSimulatorComponent({ turingMachine, setEdit, allowEdit }) {

    const curTapeWriter = React.useRef<TapeWriter>(new TapeWriter);
    const [curDisplayTape, changeCurDisplayTape] = React.useState([new TapeWriter(), 
        {currentStep: -1, totalStepCount: -1, previousChar : undefined, writtenChar : undefined, currentEditIndex : undefined}]);

    //curComputation[1] = curIndex
    //curComputation[2] = gaol index
    const curComputation = React.useRef();
    const curComputationStep = React.useRef(-1);
    const curTimeCallback = React.useRef(null);

    if (curComputation.current != undefined) {
        if (curComputationStep.current >= curComputation.current[0].length) {
            if (curTimeCallback.current != null) {
                console.log("STOP");

                clearInterval(curTimeCallback.current);
                curTimeCallback.current = null;
                setEdit(true);
            }
        }
    }

    

    let a= <div></div>;
    if(curDisplayTape[1].currentStep != -1) {
        a = <ComputationDisplayComponent curComputationStep={curDisplayTape[1].currentStep} totalComputationSteps={curDisplayTape[1].totalStepCount} computationResult={ComputationResult.ACCEPT} 
        
        curTransition={ (curComputationStep.current < curComputation.current[0].length) ? new Transition(curComputation.current[0][curComputationStep.current].curState,
            curComputation.current[0][curComputationStep.current].readChar,
            curComputation.current[0][curComputationStep.current].newState,
            curComputation.current[0][curComputationStep.current].writeChar,
            curComputation.current[0][curComputationStep.current].tapeMove) : undefined } />
    } else {
        a = <InputParameterComponent
        setMachineInput={function (s) {
            let newCenter = (s.length == 0) ? turingMachine.Blank : s[0];


            let a = [];
            for (let i = 1; i < Math.min(s.length, curTapeWriter.current.rightTape.length + 1); i++)
                a.push(s[i]);
            while (a.length < curTapeWriter.current.rightTape.length)
                a.push(turingMachine.Blank);

            for (let i = 0; i < curTapeWriter.current.leftTape.length; i++)
                curTapeWriter.current.leftTape[i] = turingMachine.Blank;
            // changeCurTapeWriter({...curTapeWriter, center: newCenter, rightTape: a});
            curTapeWriter.current = { ...curTapeWriter.current, center: newCenter, rightTape: a };
            changeCurDisplayTape([curTapeWriter.current, curDisplayTape[1]]);
        }}
        inputAlphabet={(turingMachine != undefined) ? turingMachine.InputAlphabet : []}
        allowEditing={allowEdit}
        compute={function (input, maxTrans, speed) {
            console.log("Start Computation");
            setEdit(false);
            const [record, res] = compute(turingMachine, maxTrans, curTapeWriter.current.leftTape, curTapeWriter.current.center, curTapeWriter.current.rightTape);
            curComputation.current = [record, -1, record.length - 1, res];
            curComputationStep.current = 0;
            curTapeWriter.current.headPos = 0;
           
            changeCurDisplayTape([curTapeWriter.current, {currentStep : 0, totalStepCount : record.length, previousChar : undefined, writtenChar : undefined, currentEditIndex : undefined}]);
            if (isTimedSetting(speed)) {

                curTimeCallback.current = setInterval(() => {

                    if (curComputation.current != null) {

                        let charToWrite = curComputation.current[0][curComputationStep.current].writeChar;
                        let moveDir = curComputation.current[0][curComputationStep.current].tapeMove;


                        if (curTapeWriter.current.headPos == 0) {
                            curTapeWriter.current.center = charToWrite;
                        } else if (curTapeWriter.current.headPos < 0) {

                            curTapeWriter.current.leftTape[Math.abs(curTapeWriter.current.headPos) - 1] = charToWrite;
                        } else {
                            curTapeWriter.current.rightTape[Math.abs(curTapeWriter.current.headPos) - 1] = charToWrite;
                        }
                        let pres = curTapeWriter.current.headPos;
                        curTapeWriter.current.headPos += ((moveDir == 'R') ? 1 : -1);
                        /*
                        changeCurDisplayTape([{
                            center: curTapeWriter.current.center, leftTape: curTapeWriter.current.leftTape,
                            rightTape: curTapeWriter.current.rightTape, headPos: curTapeWriter.current.headPos
                        }, pres, curComputation.current[0][curComputationStep.current].readChar]);
                        */

                        changeCurDisplayTape([{
                            center: curTapeWriter.current.center, leftTape: curTapeWriter.current.leftTape,
                            rightTape: curTapeWriter.current.rightTape, headPos: curTapeWriter.current.headPos
                        }, {...(curDisplayTape[1]), currentEditIndex: pres, previousChar: curComputation.current[0][curComputationStep.current].readChar, currentStep: curComputationStep.current + 1, totalStepCount : curComputation.current[0].length}] );
                        console.log(curDisplayTape[1].totalStepCount)
                        curComputationStep.current = curComputationStep.current + 1;
                    }
                }, getTimeMili(speed));

            } else if (speed == MachineSpeed.INSTANT) {
                let pres = curTapeWriter.current.headPos;
                for (let i = 0; i < curComputation.current[0].length; i++) {
                    let curTransition = curComputation.current[0][i];

                    if (curTapeWriter.current.headPos == 0) {
                        curTapeWriter.current.center = curTransition.writeChar;
                    } else if (curTapeWriter.current.headPos < 0) {

                        curTapeWriter.current.leftTape[Math.abs(curTapeWriter.current.headPos) - 1] = curTransition.writeChar;
                    } else {
                        curTapeWriter.current.rightTape[Math.abs(curTapeWriter.current.headPos) - 1] = curTransition.writeChar;
                    }
                    pres = curTapeWriter.current.headPos;
                    curTapeWriter.current.headPos += ((curTransition.tapeMove == 'R') ? 1 : -1);

                }
                /*
                changeCurDisplayTape([{
                    center: curTapeWriter.current.center, leftTape: curTapeWriter.current.leftTape,
                    rightTape: curTapeWriter.current.rightTape, headPos: curTapeWriter.current.headPos
                }, pres, curComputation.current[0][curComputation.current[0].length - 1].readChar]);
                */

                changeCurDisplayTape([{
                    center: curTapeWriter.current.center, leftTape: curTapeWriter.current.leftTape,
                    rightTape: curTapeWriter.current.rightTape, headPos: curTapeWriter.current.headPos
                }, {...curDisplayTape[1], currentEditIndex: pres, previousChar:curComputation.current[0][curComputation.current[0].length - 1].readChar , currentStep: curComputationStep.current + 1}] );

                setEdit(true);

            } else if (speed == MachineSpeed.STEP_BY_STEP) {


            }
        }} />;
    }

    

    return (
        <div className='machine-simulator'>
            <View className='tape-view' style={{ flexDirection: 'row' }}>
                <TapeAttribsComponent
                    leftTapeSize={curTapeWriter.current.leftTape.length}
                    rightTapeSize={curTapeWriter.current.rightTape.length}
                    changeLeftTapeSize={function (s) {
                        curTapeWriter.current.leftTape = Array(s);
                        changeCurDisplayTape([curTapeWriter.current, curDisplayTape[1]]);
                    }}
                    changeRightTapeSize={function (s) {
                        curTapeWriter.current.rightTape = Array(s);
                        changeCurDisplayTape([curTapeWriter.current, curDisplayTape[1]]);

                    }}
                    allowEditing={allowEdit} />

                <TapeViewComponent leftTape={curDisplayTape[0].leftTape} rightTape={curDisplayTape[0].rightTape} centerSpot={curDisplayTape[0].center} headLocation={curDisplayTape[0].headPos}
                    editIndex={curDisplayTape[1].currentEditIndex}
                    previousChar={curDisplayTape[1].previousChar} />
            </View>
            <View style = {{display: 'flex',
alignItems: 'center',
justifyContent: 'center'}}>
                {a}
            </View>





        </div>
    );
}


export default MachineSimulatorComponent;

