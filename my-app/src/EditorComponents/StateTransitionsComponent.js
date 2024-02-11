import React from 'react';
import { useState } from 'react';

import MyButton from '../GeneralComponents/MyButton';

import {TransitionImage } from '../TM';

import TransitionComponent from './TransitionComponent';
import NewTransitionPopup from './Popups/NewTransitionPopup';

//props.transitionsMap
//props.curStateName
function StateTransitionsComponent({curStateName,transitionsMap, isTransitionVald, addTransition, deleteTransition, allowEditing} ) {

    const [viewAddTransitionPopup, changeViewAddTransitionPopup] = useState(false);


    //keep track of a list of TM transitions
    let transitionsArray  = [];
    transitionsMap.forEach((value ,key ,map ) => {
        transitionsArray.push({transInput: key, transImage : value});
    });



    return (
        <div className = "transition-editor-component">

        <ul>
          {transitionsArray.map((item, index) => (
            <li key={index}> 
                <TransitionComponent readChar={item.transInput} newState={item.transImage.newState}
              writeChar={item.transImage.writeChar} curState={curStateName} tapeMove={item.transImage.tapeMove}
              onDelete={() => { deleteTransition(curStateName, item.transInput); } } allowEditing={allowEditing}/>
            </li>
          ))}
        </ul>


        <MyButton disabled = {!allowEditing} text = {"Add Transition"} onPressCallback = {()=> {changeViewAddTransitionPopup(true)}} />

        {viewAddTransitionPopup && <NewTransitionPopup curState={curStateName} 
        triggerClose={() => { changeViewAddTransitionPopup(false); } } 
        isTransitionValid={isTransitionVald}
         createTransition={addTransition}/>}

        

        </div>
    );
}


export default StateTransitionsComponent;