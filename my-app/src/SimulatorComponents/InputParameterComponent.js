import React from 'react';
import { View, Text, TextInput } from 'react-native';






function isInputStringValid(inputAlphabet, input) {
    for (let i = 0; i < input.length; i++)
        if (!inputAlphabet.includes(input[i]))
            return `Symbol ${input[i]} not in Input Alphabet`;
    return undefined;
}


function InputParameterComponent({ setMachineInput, inputAlphabet, allowEditing, compute, maxTransitions, speed }) {

    const [curInput, changeCurInput] = React.useState('');
    const [curInputErrorMsg, changeCurInputErrorMsg] = React.useState(undefined);



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

          
                
           

            <button disabled={!allowEditing || (curInputErrorMsg != undefined)}
                onClick={() => {

                    compute(curInput, maxTransitions, speed);

                }}>Compute</button>

        </View>
    );
}


export default InputParameterComponent;