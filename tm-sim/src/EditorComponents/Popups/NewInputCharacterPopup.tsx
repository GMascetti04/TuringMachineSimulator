import React from 'react';
import { useState } from 'react';
import {
  Button,StyleSheet, TextInput,View, Pressable,Text
  
} from 'react-native';
import Popup from '../../GeneralComponents/Popup';
import MyButton from '../../GeneralComponents/MyButton';


function NewAlphabetCharacterPopup({show, changeViewAddStatePopup, createNewChar} : {show: boolean, changeViewAddStatePopup: (arg0: boolean) => void, createNewChar: (arg0: string) => void}) {

    const [newName, changeNewName] = useState("");
    
    if (!show)
        return "";
    return (
        <div>
        <button onClick={() => {changeNewName(''); changeViewAddStatePopup(false);}}>close</button>
        <TextInput onChangeText={changeNewName}
        value={newName}
        placeholder="new character"></TextInput>
        <button onClick={() => {createNewChar(newName); changeNewName(''); changeViewAddStatePopup(false);}}>create</button>
        </div>
    );
}

export default NewAlphabetCharacterPopup;