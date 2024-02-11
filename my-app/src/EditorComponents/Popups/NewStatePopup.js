import React from 'react';
import { useState } from 'react';
import {
  Button,StyleSheet, TextInput,View, Pressable,Text
  
} from 'react-native';
import Popup from '../../GeneralComponents/Popup';
import MyButton from '../../GeneralComponents/MyButton';


function NewStatePopup({viewAddStatePopup, changeViewAddStatePopup, isNewNameValid, createNewState} ) {

    const [newName, changeNewName] = useState("");
    const [allowCreate, changeAllowCreate] = useState(false);
    const [curErrorMsg, changeCurErrorMsg] = useState("");

    return (
    <Popup open={viewAddStatePopup} setTrigger={(v) => {
        if(v == false) {
            changeNewName("");
            changeAllowCreate(false);
            changeCurErrorMsg("");
        }
        changeViewAddStatePopup(v)
        }}>
        <Text>Create New State</Text>
            <br></br>
            <TextInput
            onChangeText={(newText) => {
                changeNewName(newText);
                const [nameGood, errorMsg] =  isNewNameValid(newText);
                if(nameGood) {
                    changeCurErrorMsg("");
                    changeAllowCreate(true);
                } else {
                    changeCurErrorMsg(errorMsg);
                    changeAllowCreate(false);
                }
            }}
             value={newName}
             placeholder="Enter ID of new State"
            />
            <Text>{curErrorMsg}</Text>
            <MyButton text = "Create" disabled = {!allowCreate} onPressCallback = {() => {
                createNewState(newName);
                changeNewName("");
                changeAllowCreate(false);
                changeCurErrorMsg("");
                changeViewAddStatePopup(false);

            
            }}/>
        </Popup>
    );
}

export default NewStatePopup;