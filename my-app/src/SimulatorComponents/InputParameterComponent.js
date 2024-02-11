import React from 'react';
import { View, Text, TextInput } from 'react-native';



export const MachineSpeed = {
    STEP_BY_STEP : 0,
    SLOW : 1,
    NORMAL : 2,
    FAST : 3,
    INSTANT : 4
}

function toString(s) {
    switch (s) {
        case MachineSpeed.FAST:
            return "Fast";
        case MachineSpeed.SLOW:
            return "Slow";
        case MachineSpeed.NORMAL:
            return "Normal";
        case MachineSpeed.INSTANT:
            return "Instant";
        case MachineSpeed.STEP_BY_STEP:
            return "Step by Step";
    }
}

function isInputStringValid(inputAlphabet, input) {
    for (let i = 0; i < input.length; i++)
        if (!inputAlphabet.includes(input[i]))
            return `Symbol ${input[i]} not in Input Alphabet`;
    return undefined;
}


function InputParameterComponent({ setMachineInput, inputAlphabet, allowEditing, compute }) {

    const [curInput, changeCurInput] = React.useState('');
    const [curInputErrorMsg, changeCurInputErrorMsg] = React.useState(undefined);

    const [curMachineSpeed, changeCurMachineSpeed] = React.useState(MachineSpeed.STEP_BY_STEP);

    const [curMaxTransitionsText, changeCurMaxTransitionsText] = React.useState('100');

    return (
        <View style={{ flexDirection: 'row', borderRadius: 4, backgroundColor: '#d6d6d6', shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        width: 700}}>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold' }}>Input: </Text>
                    <TextInput style={{}}
                        editable={allowEditing}
                        onChangeText={(s) => {
                            changeCurInput(s);
                            setMachineInput(s);
                            changeCurInputErrorMsg(isInputStringValid(inputAlphabet, s));
                        }}
                        value={curInput}
                        placeholder="Enter Input" />
                </View>
                <Text style = {{color: 'red'}}>{curInputErrorMsg}</Text>
            </View>

            <div className='machine-speed'>
                <div>Machine Speed: {toString(curMachineSpeed)}</div>
                <input
                    type="range"
                    min="0"
                    max={MachineSpeed.INSTANT.toString()}
                    onChange={(e) => changeCurMachineSpeed(Number(e.target.value))}
                    style={{ backgroundSize: `${(curMachineSpeed * 100) / MachineSpeed.INSTANT}% 100%` }}
                    value={curMachineSpeed}
                    disabled={!allowEditing}
                />
            </div>

            <View style = {{}}>
                <Text>Maximum Transitions</Text>
                <TextInput 
                //disabled={!allowEditing}
                    value={curMaxTransitionsText}
                    onChangeText={(s) => { changeCurMaxTransitionsText(s); }}
                />
            </View>
            
                
           

            <button disabled={!allowEditing || (curInputErrorMsg != undefined)}
                onClick={() => {

                    compute(curInput, Number(curMaxTransitionsText), curMachineSpeed);

                }}>Compute</button>

        </View>
    );
}


export default InputParameterComponent;