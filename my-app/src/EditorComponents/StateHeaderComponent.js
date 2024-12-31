import React from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  View, Text,
  StyleSheet, TextInput, Pressable,

} from 'react-native';

import Button from '@mui/material/Button';


//props.iniitState
export function StateHeaderComponent({ stateName, isInitialState, isFinalState,
  showTransitions, changeShowTransitionsfunc, setInitState, setIsFinalState, deleteState, allowEditing }) {

  return (
    <div className='state-header-component'>

      <Button className='state-name-button' disabled={!allowEditing}>{stateName}</Button>




      <Button className={isInitialState ? 'initial-state-btn-true' : 'initial-state-btn-false'} type='button' disabled={isInitialState || !allowEditing} onClick={() => { setInitState(stateName); }}>{isInitialState ? "Initial State" : "Set Initial"}</Button>



      <FormGroup>
        <FormControlLabel control={<Switch
          id={stateName}
          checked={isFinalState}
          onChange={(event, isChecked) => setIsFinalState(event.target.checked)}

        />} label="Final State" labelPlacement="top" />

      </FormGroup>

      <Button onClick={() => { changeShowTransitionsfunc(!showTransitions) }}>{showTransitions ? "hide transitions" : "show transitions"} </Button>

      <IconButton color="error" variant="outlined"  disabled={!allowEditing} onClick={() => { deleteState(); }}> <DeleteIcon /></IconButton>
       
      
      

    </div>
  );
}



