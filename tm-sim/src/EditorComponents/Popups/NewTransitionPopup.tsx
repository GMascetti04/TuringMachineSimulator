import React from 'react';
import { useState } from 'react';
import {
  Button,StyleSheet, TextInput,View, Pressable,Text
  
} from 'react-native';



function NewTransitionPopup({curState, triggerClose, isTransitionValid, createTransition} : 
    {curState : any, triggerClose : any, isTransitionValid : any, createTransition : any}) {

    const [readChar, changeReadChar] = useState("");
    const [newState, changeNewState] = useState("");
    const [writeChar, changeWriteChar] = useState("");
    const [tapeMove, changeTapeMove] = useState("");

    const [curErrorMsgs, changeCurErrorMsgs] = useState<string[]>([]);
    const [allowCreate, changeAllowCreate] = useState<boolean>(false);

    function onClose() {
        changeReadChar('');
        changeNewState('');
        changeWriteChar('');
        changeTapeMove('');
        changeCurErrorMsgs([]);
        changeAllowCreate(false);
    }

    return (
        <div className = "transition-create-popup">
          
          <button onClick={() => {onClose(); triggerClose();}}> Close!</button>
          <br></br>

        <TextInput 
        onChangeText={(s) => {
            changeReadChar(s);
            const [good, errors] = isTransitionValid(curState, s, newState, writeChar, tapeMove);
            changeCurErrorMsgs(errors);
            changeAllowCreate(good);
        }}
        placeholder="Read Char"
        value={readChar}/> <br></br>

        <TextInput 
        onChangeText={(s) => {changeNewState(s);
            const [good, errors] = isTransitionValid(curState, readChar, s, writeChar, tapeMove);
            changeCurErrorMsgs(errors);
            changeAllowCreate(good);}}
        placeholder="New State"
        value={newState}/><br></br>

        <TextInput 
        onChangeText={(s) => {changeWriteChar(s);
            const [good, errors] = isTransitionValid(curState, readChar, newState, s, tapeMove);
            changeCurErrorMsgs(errors);
            changeAllowCreate(good);}}
        placeholder="Write Char"
        value={writeChar}/><br></br>

        <TextInput 
        onChangeText={(s) => {changeTapeMove(s);
            const [good, errors] = isTransitionValid(curState, readChar, newState, writeChar, s);
            changeCurErrorMsgs(errors);
            changeAllowCreate(good);}}
        placeholder="Tape Move (L/R)"
        value={tapeMove}/><br></br>

        <ul>
            {curErrorMsgs.map((item, index) => {return (
                <li key={item}>
                {item}
              </li>
            );})}
        </ul>
        
        <button type = "button" disabled={!allowCreate} onClick={ () => {
    
            createTransition(curState, readChar, newState, writeChar, tapeMove);
            onClose();
            triggerClose();
        }
            
        }>Create</button>

        </div>
    );
}

export default NewTransitionPopup;