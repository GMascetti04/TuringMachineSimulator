import React from 'react';
import { useState } from 'react';

import { StateHeaderComponent } from './StateHeaderComponent';
import StateTransitionsComponent from './StateTransitionsComponent';

function StateComponent({stateName, isInitialState, isFinalState, setInitState, 
    setIsFinalState, transitionMap, isTransitionVald, addTransition, deleteTransition, deleteState, allowEditing} : any) {
    const [showTransitions, setShowTransitions] = useState(false);


    

    //how to know which state is current being rendered
    return (
        <div className={!isFinalState?'state-component':'state-component-final'}>
       

        <StateHeaderComponent stateName={stateName}
            isInitialState={isInitialState}
            isFinalState={isFinalState}
            showTransitions={showTransitions}
            changeShowTransitionsfunc={setShowTransitions}
            setInitState={setInitState}
            setIsFinalState={setIsFinalState}
            deleteState={() => { deleteState(); } } 
            allowEditing={allowEditing} />

        {showTransitions && <StateTransitionsComponent  curStateName={stateName} transitionsMap={transitionMap}
            isTransitionVald={isTransitionVald} addTransition={addTransition}
            deleteTransition={deleteTransition}
             allowEditing={allowEditing}/>}
        </div>
    );
  
  }
  
  export default StateComponent;