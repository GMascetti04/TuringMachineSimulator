import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput } from 'react-native';

function validTapeLength(s) {
    if (s.length == 0) {
        return [false, "Enter new tape length", NaN];
    }
    let a = Number(s);
    if (Number.isNaN(a)) {
        return [false, "Length must be a number", NaN];
    }
    if (a < 0) {
        return [false, "Length cannot be negative", NaN]
    }
    return [true, '', a];
}





function TapeDirectionEditor({ tapeDir, tapeSize, changeTapeSize, allowEditing }) {



    const textInput = useRef();
    function handleClick() {
        if (textInput.current != undefined)
            textInput.current.focus();
    }

    const [curEditText, changeCurEditText] = React.useState(undefined);
    const [curEditRes, changeCurEditRes] = React.useState([true, '', tapeSize]);


    if (curEditText === undefined) {
        return (

            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '40px' }}>
                    <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>{tapeDir}: </Text>
                </View>
                <button style={{ width: '100%' }} disabled={!allowEditing} onClick={() => {
                    changeCurEditText('');
                    handleClick();
                }}> {tapeSize}</button>
            </View>
        );
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold' }}>{tapeDir}: </Text>

            <TextInput autoFocus={true} ref={textInput} style={{ width: 20 }}
                placeholder={`Enter ${tapeDir} Tape Size`}
                value={curEditText}
                onChangeText={(s) => { changeCurEditText(s); changeCurEditRes(validTapeLength(s)); }} />
            <button disabled={!curEditRes[0]}
                onClick={() => { changeCurEditText(undefined); changeTapeSize(curEditRes[2]); }}
            > set</button>
            <button onClick={() => { changeCurEditText(undefined); }}>cancel</button>
        </View>
    );

}


function TapeAttribsComponent({ leftTapeSize, rightTapeSize, changeLeftTapeSize, changeRightTapeSize, allowEditing }) {

    return (
        <View
            style={{
                //flexDirection: 'row',
                height: '100%',
                width: 200,
                padding: 20,
            }}>
            <Text>Change Tape Length:</Text>
            <View>
                <TapeDirectionEditor tapeSize={leftTapeSize} changeTapeSize={function (v){
                    changeLeftTapeSize(v);
                }} tapeDir={'Left'} allowEditing={allowEditing} />
                <TapeDirectionEditor tapeSize={rightTapeSize} changeTapeSize={function (v) {
                    changeRightTapeSize(v);
                }} tapeDir={'Right'} allowEditing={allowEditing} />
            </View>
        </View>
    );
}



export default TapeAttribsComponent;