import React from 'react';
import { useState } from 'react';
import {
  Button, StyleSheet, TextInput, View, Pressable, Text

} from 'react-native';
import { InlineMath  }  from 'react-katex' ;
import 'katex/dist/katex.min.css'; // Import Katex CSS

import StateComponent from './StateComponent';

import MyButton from '../GeneralComponents/MyButton';

import { StateProperties, TM } from '../TM';
import NewStatePopup from './Popups/NewStatePopup';
import NewAlphabetCharacterPopup from './Popups/NewInputCharacterPopup';



function isNewStateNameValid(turingMachine, newStateName) {

  //Name Rules
  if (newStateName.length === 0)
    return [false, "Cannot be empty string"];

  if (newStateName.indexOf(' ') != -1) {
    return [false, "Cannot contain spaces"];
  }


  for (let key of turingMachine.States.keys()) {
    if (newStateName == key)
      return [false, `Cannot reuse state name '${newStateName}'`];
  }
  return [true, ""];
}

function isTransitionValid(turingMachine, curState, readChar,
  newState, writeChar, tapeMove)  {

   let errs = [];
   let good = true;

  if (turingMachine.States.get(curState)?.Transitions.has(readChar)) {
    good = false;
    errs.push(`Transition from (${curState},${readChar}) already exists`);
  }

  if (!(turingMachine.Blank == readChar || turingMachine.InputAlphabet?.includes(readChar) || turingMachine.TapeAlphabet?.includes(readChar))) {
    good = false;
    errs.push(`${readChar} is not in the Tape Alphabet`);
  }

  if (!turingMachine.States.has(newState)) {
    good = false;
    errs.push(`State ${newState} does not exist`);
  }

  if (!(turingMachine.Blank == writeChar || turingMachine.InputAlphabet?.includes(writeChar) || turingMachine.TapeAlphabet?.includes(writeChar))) {
    good = false;
    errs.push(`${writeChar} is not in the Tape Alphabet`);
  }

  if (!(tapeMove === 'L' || tapeMove === 'R')) {
    good = false;
    errs.push(`Tape Move must be "L" or "R"`);
  }

  return [good, errs];
}


function TMEditorComponent({ curTM, createState, setInitialState, setFinalState, addTransition,
  deleteTransition, deleteState, addInputAlphabetChar, deleteInputAlphabetChar, addTapeAlphabetChar, deleteTapeAlphabetChar, allowEditing} ) {

  const [viewAddStatePopup, changeViewAddStatePopup] = React.useState(false);

  const [viewAddInputAlphabetPopup, changeViewAddInputAlphabetPopup] = React.useState(false);
  const [viewAddTapeAlphabetPopup, changeViewAddTapeAlphabetPopup] = React.useState(false);


  const [selectedInputCharIndex, changeSelectedInputCharIndex] = React.useState(-1);
  const [selectedTapeAlphabetCharIndex, changeSelectedTapeAlphabetCharIndex] = React.useState(-1);

  if (curTM === null || curTM === undefined)
    return "";


  let stateArray = [];
  curTM.States.forEach((value , key , map ) => {
    stateArray.push({ stateName: key, stateProp: value });
  });



  return (
    <View style = {{}}>

      <div className='editor-input-alph'>
        Input Alphabet:
        <InlineMath math="\{" />
        {(curTM.InputAlphabet).map((char, index) => {
          return <button key={char}disabled = {!allowEditing} className={index == selectedInputCharIndex ? 'editor-input-char-selected' : ''} onClick={() => {

            changeSelectedInputCharIndex(index == selectedInputCharIndex ? -1 : index)
          }}>{char}</button>
        })}
        <InlineMath math="\}" />
        <button disabled = {!allowEditing} onClick={() => changeViewAddInputAlphabetPopup(true)}>add</button>

        {selectedInputCharIndex != -1 && <button disabled = {!allowEditing} onClick={() => {
          deleteInputAlphabetChar(selectedInputCharIndex);
          changeSelectedInputCharIndex(-1);
        }}>delete</button>}


        <NewAlphabetCharacterPopup show={viewAddInputAlphabetPopup} changeViewAddStatePopup={changeViewAddInputAlphabetPopup}
          createNewChar={(char) => { addInputAlphabetChar(char); }} />
      </div>



      <div className='machine-blank-char'>
        Blank Character: {curTM.Blank} <button disabled = {!allowEditing}> edit</button>
      </div>




      <div className='editor-tape-alph'>
        Additional Tape Symbols:
        <InlineMath math="\{" />
        {(curTM.TapeAlphabet).map((char, index) => {
          return <button key={char} disabled = {!allowEditing}
            className={index == selectedTapeAlphabetCharIndex ? 'editor-input-char-selected' : ''} onClick={() => {
              changeSelectedTapeAlphabetCharIndex(index == selectedTapeAlphabetCharIndex ? -1 : index);
            }}>{char}</button>
        })}

        <InlineMath math="\}" />
        <button disabled = {!allowEditing} onClick={() => changeViewAddTapeAlphabetPopup(true)}>add</button>

        {selectedTapeAlphabetCharIndex != -1 && <button disabled = {!allowEditing} onClick={() => {
          deleteTapeAlphabetChar(selectedTapeAlphabetCharIndex);
          changeSelectedTapeAlphabetCharIndex(-1);
        }}>delete</button>}


        <NewAlphabetCharacterPopup show={viewAddTapeAlphabetPopup} changeViewAddStatePopup={changeViewAddTapeAlphabetPopup}
          createNewChar={(char) => { addTapeAlphabetChar(char); }} />
      </div>


      <ul>
        {
          stateArray.map((item, index) => (
            <li key={index}>

              <StateComponent stateName={item.stateName}
              isInitialState={curTM.InitialState === item.stateName}
              isFinalState={item.stateProp.isFinalState}
              setInitState={(s) => { setInitialState(s); } }
              setIsFinalState={(v) => { setFinalState(item.stateName, v); } }
              transitionMap={item.stateProp.Transitions}
              isTransitionVald={(curState, readChar,
                newState, writeChar, tapeMove) => { return isTransitionValid(curTM, curState, readChar, newState, writeChar, tapeMove); } }
              addTransition={addTransition}
              deleteTransition={deleteTransition}
              deleteState={() => { deleteState(item.stateName); } } allowEditing={allowEditing} />

            </li>
          ))
        }
      </ul>


      <MyButton disabled = {!allowEditing} text="Add State" onPressCallback={() => {changeViewAddStatePopup(true);}} />

      <NewStatePopup viewAddStatePopup={viewAddStatePopup}
        changeViewAddStatePopup={changeViewAddStatePopup}
        isNewNameValid={(name ) => { return isNewStateNameValid(curTM, name) }}
        createNewState={(s ) => { createState(s) }}></NewStatePopup>


    </View>
  );
}

export default TMEditorComponent;