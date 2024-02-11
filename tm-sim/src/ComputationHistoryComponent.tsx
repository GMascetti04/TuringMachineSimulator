import React from 'react';
import { useState } from 'react';
import {View, Text,
    Button,StyleSheet, TextInput, Pressable,
    
  } from 'react-native';
import MyButton from './GeneralComponents/MyButton';

function ComputationHistoryComponent({computationRecord, selectedIndex, selectCallback} : {computationRecord: any, selectedIndex: number, selectCallback: (arg0: number) => void}) {
    if(computationRecord == undefined)
        return "";
    return (
        <View>
            <ul>
                {(computationRecord ).map(function(value : any, index : number) { return (
                <li key={index}>
                    <MyButton text = {`${index+1}: (curState: ${value.curState} ,  readChar:  ${value.readChar} ) -> (newState: ${value.newState}, writeChar: ${value.writeChar}, tapeMove: ${value.tapeMove})`}
                        disabled = {index == selectedIndex}
                        onPressCallback = {() => {selectCallback(index)}}
                        width = {500}
                    />
                    </li>
                ); })}
            </ul>
        </View>
    );   
}


export default ComputationHistoryComponent;