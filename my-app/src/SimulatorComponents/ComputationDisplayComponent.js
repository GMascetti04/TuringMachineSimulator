import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { ComputationResult } from '../TM';


class ComputationResultView {
    textColor;
    backgroundColor;
    resultText;
    optionalInformation;

    constructor(textColor, backgroundColor, resultText, optionalInformation) {
        this.textColor = textColor;
        this.backgroundColor = backgroundColor;
        this.resultText = resultText;
        this.optionalInformation = optionalInformation;
    }
}

function ResultView(res) {
    switch (res) {
        case ComputationResult.ACCEPT:
            return new ComputationResultView('#045900', '#18FF0B', "Accept", '');
        case ComputationResult.REJECT:
            return new ComputationResultView('', '', "Reject", '');
        case ComputationResult.INVALID_MACHINE_DEFINITION:
            return new ComputationResultView('', '', "Error", 'Invalid Machine Definition');
        case ComputationResult.LEFT_TAPE_EXCEEDED:
            return new ComputationResultView('', '', "Tape Size Exceeded", 'Increase size of left tape');
        case ComputationResult.RIGHT_TAPE_EXCEEDED:
            return new ComputationResultView('', '', "Tape Size Exceeded", 'Increase size of right tape');
        case ComputationResult.TRANSITIONS_EXCEEDED:
            return new ComputationResultView('', '', "Maximum Transitions Exceeded", 'Increase maximum number of transitions allowed');
        default:
            return undefined;
    }
}



export class Transition {
    curState;
    readChar;
    newState;
    writeChar;
    tapeMove;

    constructor(curState, readChar, newState, writeChar, tapeMove) {
        this.curState = curState;
        this.readChar = readChar;
        this.newState = newState;
        this.writeChar = writeChar;
        this.tapeMove = tapeMove;
    }
}

const styles = StyleSheet.create({
    transitionElement: {
        display: 'flex',
        //flexFlow: 'row nowrap',
        //justifySelf: 'center',
        alignSelf: 'center',
    },
    computationDisplay: {
        flexDirection: 'row', borderRadius: 4, backgroundColor: '#d6d6d6', shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        width: 700,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center'
    }

});


export function ComputationDisplayComponent({ curComputationStep, totalComputationSteps, computationResult, curTransition }) {

    if (curTransition === undefined) {
        let resView = ResultView(computationResult);
        if (resView === undefined)
            return (<View></View>);
        return (
            <View style={styles.computationDisplay}>
                <button> Exit </button>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style = {styles.transitionElement}>
                            <Text>Result: </Text>
                        </View>
                        <View style={{
                            backgroundColor: resView.backgroundColor,
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            borderRadius: 5
                        }}>
                            <Text style={{ color: resView.textColor, fontWeight: 'bold' }}>{resView.resultText}</Text>
                        </View>
                    </View>

                </View>

            </View>
        );
    } else {

        return (
            <View style={styles.computationDisplay}>
                <button> Exit </button>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text> {'Cur \n State'}</Text> <Text style={styles.transitionElement}>: {curTransition.curState}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text> {'Read \n Char'}</Text> <Text style={styles.transitionElement}>: {curTransition.readChar}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text> {'New \n State'}</Text> <Text style={styles.transitionElement}>: {curTransition.newState}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text> {'Write \n Char'}</Text> <Text style={styles.transitionElement}>: {curTransition.writeChar}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text> {'Tape \n Move'}</Text> <Text style={styles.transitionElement}>: {curTransition.tapeMove}</Text>
                        </View>
                    </View>

                </View>
                <View>
                    <Text>{curComputationStep} / {totalComputationSteps}</Text>
                </View>
            </View>
        );
    }

}



