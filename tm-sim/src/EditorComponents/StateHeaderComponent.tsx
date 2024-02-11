import React from 'react';
import { useState } from 'react';
import MyButton from '../GeneralComponents/MyButton';
import { Switch } from '../GeneralComponents/Switch';
import {View, Text,
    Button,StyleSheet, TextInput, Pressable,
    
  } from 'react-native';

 


  //props.iniitState
export function StateHeaderComponent({stateName, isInitialState, isFinalState, 
  showTransitions, changeShowTransitionsfunc, setInitState, setIsFinalState, deleteState, allowEditing} : any) {

    return (
      <div className='state-header-component'>
        
        <button disabled = {!allowEditing} className='state-name-button' type = 'button'><b>{stateName}</b></button>

        <button className={isInitialState? 'initial-state-btn-true' :'initial-state-btn-false' } type='button' disabled = {isInitialState || !allowEditing} onClick={() => {setInitState(stateName);}}>{isInitialState ?"Initial State" :"Set Initial"}</button>
        

        <Text>Final</Text>
        <Switch
        allowEditing={allowEditing}
        isOn={isFinalState}
        handleToggle={() => setIsFinalState(!isFinalState)}
        idnum = {stateName}
      />
   
        <MyButton text = {showTransitions? "hide transitions" : "show transitions"} onPressCallback = {() => {changeShowTransitionsfunc(!showTransitions)}}/>

        <button disabled = {!allowEditing} onClick={() => {deleteState();}}>Delete</button>
     
      </div>
    );
  }
  


